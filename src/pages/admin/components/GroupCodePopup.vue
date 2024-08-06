<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IGroupCodeDetail } from '../types/common-code.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '~/types/modal.ts'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'


const { t } = useI18n()
const props = defineProps<{
  modelValue: boolean
  groupCodeId: string
  popupMode: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel'): void
  (e: 'confirm', value: { groupCodeInfo: IUserDetail }): void
}>()

const mockupData = {
  groupCode: 'groupCode1',
  groupCodeName: '그룹코드1',
  groupCodeDesc: '그룹코드1 입니다.',
  useStatus: 'Y',
  createDate: '2024-07-18',
  createUser: 'admin',
  updateDate: '2024-07-20',
  updateUser: 'admin'
}

const groupCodeId = ref('')
const popupMode = ref('')
const groupCodeInfo = reactive<IGroupCodeDetail>({
  groupCode: '',
  groupCodeName: '',
  groupCodeDesc: '',
  useStatus: 'Y',
  createDate: '',
  createUser: '',
  updateDate: '',
  updateUser: ''
})

const resetForm = () => {
  groupCodeInfo.groupCode = '',
    groupCodeInfo.groupCodeName = '',
    groupCodeInfo.groupCodeDesc = '',
    groupCodeInfo.useStatus = 'Y'
}

const handleCancel = () => {
  emits('cancel')
}

const getGroupCodeDetail = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/user/${props.userId}',
    //   userInfo,
    // })
    return mockupData
  }
  catch (error) {
    console.error(error)
  }
}

const setGroupCodeDetail = () => {
  const data = getGroupCodeDetail()
  groupCodeInfo.groupCode = data.groupCode,
    groupCodeInfo.groupCodeName = data.groupCodeName,
    groupCodeInfo.groupCodeDesc = data.groupCodeDesc,
    groupCodeInfo.useStatus = data.useStatus,
    groupCodeInfo.createDate = data.createDate,
    groupCodeInfo.createUser = data.createUser,
    groupCodeInfo.updateDate = data.updateDate ? data.updateDate : '-',
    groupCodeInfo.updateUser = data.updateUser ? data.updateUser : '-'
}

const handleChangeMode = () => {
  popupMode.value = 'Update'
}

const handleUpdateGroupCode = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/user/${props.userId}',
    //   userInfo,
    // })
    // const data = {
    //   use: userInfo.use,
    //   reason: userInfo.reason
    // }
    // console.log('수정', data)
    emits('confirm', { groupCodeInfo })
    emits('cancel')
  }
  catch (error) {
    console.error(error)
  }
}

const isShow = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

watchEffect(() => {
  groupCodeId.value = props.groupCodeId
  popupMode.value = props.popupMode
  if (!groupCodeId.value) {
    resetForm()
    return
  }
  resetForm()
  setGroupCodeDetail()
})
</script>

<template>
  <common-modal v-model="isShow" :title="t('comm-code.label.group-code')" :size="MODAL_SIZE.MEDIUM"
    @cancel="handleCancel">
    <template #content>
      <form class="form">
        <FormItem :label="t('comm-code.label.group-code')" :required="popupMode !== 'Detail'">
          <CustomInput v-model="groupCodeInfo.groupCode" :placeholder="t('comm-code.placeholder.group-code')"
            :readonly="popupMode === 'Detail'" />
        </FormItem>
        <FormItem :label="t('comm-code.label.group-code-name')" :required="popupMode !== 'Detail'">
          <CustomInput v-model="groupCodeInfo.groupCodeName" :placeholder="t('comm-code.placeholder.group-code-name')"
            :readonly="popupMode === 'Detail'" />
        </FormItem>
        <FormItem :label="t('comm-code.label.group-code-description')" :required="popupMode !== 'Detail'">
          <CustomTextarea v-model="groupCodeInfo.groupCodeDesc"
            :placeholder="t('comm-code.placeholder.group-code-description')" :readonly="popupMode === 'Detail'" />
        </FormItem>
        <FormItem :label="t('common.search-bar.use')">
          <div class="form">
            <el-radio-group v-model="groupCodeInfo.useStatus" :disabled="popupMode === 'Detail'">
              <el-radio value="Y">
                {{ t('common.label.use-yes') }}
              </el-radio>
              <el-radio value="N">
                {{ t('common.label.use-no') }}
              </el-radio>
            </el-radio-group>
          </div>
        </FormItem>
        <FormItem v-if="popupMode === 'Detail'" :label="t('common.label.create-date')">
          <CustomInput v-model="groupCodeInfo.createDate" readonly />
        </FormItem>
        <FormItem v-if="popupMode === 'Detail'" :label="t('common.label.create-user')">
          <CustomInput v-model="groupCodeInfo.createUser" readonly />
        </FormItem>
        <FormItem v-if="popupMode === 'Detail'" :label="t('common.label.update-date')">
          <CustomInput v-model="groupCodeInfo.updateDate" readonly />
        </FormItem>
        <FormItem v-if="popupMode === 'Detail'" :label="t('common.label.update-user')">
          <CustomInput v-model="groupCodeInfo.updateUser" readonly />
        </FormItem>
      </form>
    </template>
    <template #footer>
      <button type="button" class="btn__negative--md" @click="handleCancel">
        {{ t('common.button.cancel') }}
      </button>
      <button v-if="popupMode === 'Detail'" type="button" class="btn__secondary--md" @click="handleChangeMode">
        {{ t('common.button.update') }}
      </button>
      <button v-if="popupMode === 'Create' || popupMode === 'Update'" type="button" class="btn__secondary--md"
        @click="handleUpdateGroupCode">
        {{ t('common.button.save') }}
      </button>
    </template>
  </common-modal>
</template>
<style></style>