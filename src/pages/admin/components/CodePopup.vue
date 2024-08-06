<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ICodeDetail } from '../types/common-code.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '~/types/modal.ts'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'

const { t } = useI18n()
const props = defineProps<{
  modelValue: boolean
  codeId: string
  popupMode: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel'): void
  (e: 'confirm', value: { codeInfo: ICodeDetail }): void
}>()

const mockupData = {
  code: 'code1',
  codeName: '코드1',
  codeValue: 'code1',
  codeDesc: '코드1 입니다.',
  codeSeq: 0,
  useStatus: 'Y',
  createDate: '2024-07-18',
  createUser: 'admin',
  updateDate: '2024-07-20',
  updateUser: 'admin'
}

const codeId = ref('')
const popupMode = ref('')
const codeInfo = reactive<ICodeDetail>({
  code: '',
  codeName: '',
  codeValue: '',
  codeDesc: '',
  codeSeq: '',
  useStatus: 'Y',
  createDate: '',
  createUser: '',
  updateDate: '',
  updateUser: ''
})

const resetForm = () => {
  codeInfo.code = '',
    codeInfo.codeName = '',
    codeInfo.codeValue = '',
    codeInfo.codeDesc = '',
    codeInfo.codeSeq = '',
    codeInfo.useStatus = 'Y'
}

const handleCancel = () => {
  emits('cancel')
}

const getCodeDetail = () => {
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

const setCodeDetail = () => {
  const data = getCodeDetail()
  codeInfo.code = data.code,
    codeInfo.codeName = data.codeName,
    codeInfo.codeValue = data.codeValue,
    codeInfo.codeDesc = data.codeDesc,
    codeInfo.codeSeq = data.codeSeq,
    codeInfo.useStatus = data.useStatus,
    codeInfo.createDate = data.createDate,
    codeInfo.createUser = data.createUser,
    codeInfo.updateDate = data.updateDate ? data.updateDate : '-',
    codeInfo.updateUser = data.updateUser ? data.updateUser : '-'
}

const handleChangeMode = () => {
  popupMode.value = 'Update'
}

const handleUpdateCode = () => {
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
    emits('confirm', { codeInfo })
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
  codeId.value = props.codeId
  popupMode.value = props.popupMode
  if (!codeId.value) {
    resetForm()
    return
  }
  resetForm()
  setCodeDetail()
})
</script>

<template>
  <common-modal v-model="isShow" :title="t('comm-code.label.code')" :size="MODAL_SIZE.MEDIUM" @cancel="handleCancel">
    <template #content>
      <form class="form">
        <FormItem :label="t('comm-code.label.code')" :required="popupMode !== 'Detail'">
          <CustomInput v-model="codeInfo.code" :placeholder="t('comm-code.placeholder.code')"
            :readonly="popupMode === 'Detail'" />
        </FormItem>
        <FormItem :label="t('comm-code.label.code-name')" :required="popupMode !== 'Detail'">
          <CustomInput v-model="codeInfo.codeName" :placeholder="t('comm-code.placeholder.code-name')"
            :readonly="popupMode === 'Detail'" />
        </FormItem>
        <FormItem :label="t('comm-code.label.code-value')" :required="popupMode !== 'Detail'">
          <CustomInput v-model="codeInfo.codeValue" :placeholder="t('comm-code.placeholder.code-value')"
            :readonly="popupMode === 'Detail'" />
        </FormItem>
        <FormItem :label="t('comm-code.label.code-description')" :required="popupMode !== 'Detail'">
          <CustomTextarea v-model="codeInfo.codeDesc" :placeholder="t('comm-code.placeholder.code-description')"
            :readonly="popupMode === 'Detail'" />
        </FormItem>
        <FormItem :label="t('comm-code.label.code-sequence')" :required="popupMode !== 'Detail'">
          <CustomInput v-model="codeInfo.codeSeq" :placeholder="t('comm-code.placeholder.sequence')"
            :readonly="popupMode === 'Detail'" />
        </FormItem>
        <FormItem :label="t('common.search-bar.use')">
          <div class="form">
            <el-radio-group v-model="codeInfo.useStatus" :disabled="popupMode === 'Detail'">
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
          <CustomInput v-model="codeInfo.createDate" readonly />
        </FormItem>
        <FormItem v-if="popupMode === 'Detail'" :label="t('common.label.create-user')">
          <CustomInput v-model="codeInfo.createUser" readonly />
        </FormItem>
        <FormItem v-if="popupMode === 'Detail'" :label="t('common.label.update-date')">
          <CustomInput v-model="codeInfo.updateDate" readonly />
        </FormItem>
        <FormItem v-if="popupMode === 'Detail'" :label="t('common.label.update-user')">
          <CustomInput v-model="codeInfo.updateUser" readonly />
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
        @click="handleUpdateCode">
        {{ t('common.button.save') }}
      </button>
    </template>
  </common-modal>
</template>
<style></style>