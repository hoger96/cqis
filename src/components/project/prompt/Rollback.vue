<script setup lang="ts">
import dayjs from 'dayjs';
import { IToastType } from '~/example/types/toast';

const props = defineProps<{
  modelValue: boolean
  rollBackList: any
  activeVersion: number
}>()
const projectStore = useProjectStore()
const rollBackVersionList = ref<any>()
const selectedVersion = ref(0);
const rollBackPromptApi = ref<any>('')
const titleName = ref<string>('Rollback')
const projectData = projectStore.projectDetail


const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
  (e: 'choice', value: any): void
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const isShow = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const deleteConfirm = {
  content: '정말 삭제 하시겠습니까?\n삭제 시 복구되지 않습니다',
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  center: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
}

rollBackVersionList.value = props.rollBackList

// 활성 버전을 검색하고 해당 버전을 현재 버전으로 설정합니다.
const searchPromptVersion = () => {
  rollBackVersionList.value.forEach((x: { version_no: number; is_active: boolean; now: boolean; }) => {
    if (x.is_active) {
      x.now = true;
      selectedVersion.value = x.version_no;
    } else {
      x.now = false;
    }
  });
}

watchEffect(() => {
  searchPromptVersion()
})


const deleteSuccessToastMessage = () => {
  return {
    message: `삭제되었습니다.`,
    type: IToastType.SUCCESS,
    showClose: false,
  }
}

const ErrorToastMessage = () => {
  return {
    message: `실패했습니다.`,
    type: IToastType.ERROR,
    showClose: false,
  }
}

const successChangeVersionToastMessage = () => {
  return {
    message: '적용 되었습니다.',
    type: IToastType.SUCCESS,
    showClose: false,
  }
}

//날짜 및 시간 문자열을 포맷합니다.
const formatDateTime = (dateTimeString: string) => {
  const date = dayjs(dateTimeString);
  const datePart = date.format('YYYY-MM-DD');
  const timePart = date.format('HH:mm:ss');
  return `${datePart} | ${timePart}`;
}

//취소 버튼 클릭 시 호출되며, 선택된 버전을 초기 활성 버전으로 되돌립니다.
const handleCancel = () => {
  selectedVersion.value = props.activeVersion
  emit('cancel')
}

//확인 버튼 클릭 시 호출되며, 롤백 API가 설정되어 있으면 성공 토스트를 띄우고 이벤트를 발생시킵니다.
const handleConfirm = () => {
  if (rollBackPromptApi.value !== '') {
    rollBackVersionList.value.forEach((x: { version_no: number; show: boolean; }) => {
      if (x.version_no !== rollBackPromptApi.value.version_no) {
        x.show = false;
      }
    });
    rollBackPromptApi.value.show = true
    openToast(successChangeVersionToastMessage())
    emit('choice', rollBackPromptApi.value)
    emit('confirm')
  } else {
    emit('cancel')
  }
}

//라디오 버튼 클릭 시 호출되며, 선택된 데이터를 롤백 API 값으로 설정합니다.
const handleClickRadio = (data: any) => {
  rollBackPromptApi.value = data
}

//버전을 삭제하는 API 요청을 보냅니다.
const deleteVersionApi = async (versionId: string): Promise<boolean> => {
  try {
    await request({
      method: 'POST',
      url: `/projects/${projectData.id}/prompt-configs/${projectData.promptConfig.id}/versions/${versionId}/delete`,
    })
    return true
  } catch (error) {
    console.error(error);
    return false
  }
}

//롤백 버전 리스트를 업데이트 날짜 순으로 정렬합니다.
const sortRollBackVersionList = () => {
  rollBackVersionList.value.sort((a: any, b: any) => dayjs(b.updated_at).unix() - dayjs(a.updated_at).unix());
}

//버전 삭제 버튼 클릭 시 호출되며, 삭제 확인 후 삭제 요청을 보냅니다.
const handleDeleteVersion = async (versionId: string, active: boolean) => {
  openConfirm(deleteConfirm).then(async () => {
    if (active) {
      openConfirm({
        content: '현재 적용 중인 버전입니다.\n확인 후 다시 시도해주세요.',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        center: true,
        hideCancelButton: true,
        closeOnClickModal: true,
        closeOnPressEscape: true,
      })
      return
    }
    const res = await deleteVersionApi(versionId)
    if (res) {
      openToast(deleteSuccessToastMessage())
      rollBackVersionList.value = rollBackVersionList.value.filter((version: { id: string }) => version.id !== versionId);
      sortRollBackVersionList()
    }
    else if (!res && res !== undefined) {
      openToast(ErrorToastMessage())
    }
  }).catch(() => {
    return
  })
}

onMounted(() => {
  searchPromptVersion()
  sortRollBackVersionList()
})
</script>

<template>
  <el-dialog v-model="isShow" :title="titleName" width="800" align-center destroy-on-close class="popup">
    <el-table :data="rollBackVersionList" style="width: 100%" size="small">
      <el-table-column label="선택" width="50">
        <template #default="scope">
          <div class="flex justify-center">
            <el-radio-group v-model="selectedVersion" class="selector-only">
              <el-radio :value="scope.row.version_no" @click="handleClickRadio(scope.row)" />
            </el-radio-group>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="version_no" label="Version ID" width="100" align="center" />
      <el-table-column property="prompt_id" label="Prompt ID" width="100" align="center" />
      <el-table-column property="updated_user_id" label="최종수정자" width="100" align="center" />
      <el-table-column property="updated_at" label="최종수정일시" min-width="110" align="center">
        <template #default="scope">
          <div class="flex justify-center">
            {{ formatDateTime(scope.row.created_at) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="현재 적용 버전" width="110" align="center">
        <template #default="scope">
          <div class="flex justify-center">
            <icon v-if="scope.row.now" name="check__full--333" width="16" height="16" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="삭제" width="50" align="center">
        <template #default="scope">
          <div class="flex justify-center">
            <button v-if="!scope.row.now && !scope.row.show" type="button"
              @click="handleDeleteVersion(scope.row.id, scope.row.now)">
              <Icon name="delete__line--555" width="20" height="20 " alt="삭제" />
            </button>
            <div v-else>
              <p>-</p>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <button type="button" class="btn__negative--md" @click="handleCancel">
        취소
      </button>
      <button type="button" class="btn__secondary--md" @click="handleConfirm">
        적용
      </button>
    </template>
  </el-dialog>
</template>

<style lang="scss"></style>
