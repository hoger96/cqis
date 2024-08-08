<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IBatchDetail } from '../types/batch-mgmt.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '~/types/modal.ts'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'


const { t } = useI18n()
const props = defineProps<{
  modelValue: boolean
  batchId: string
  popupMode: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel'): void
  (e: 'confirm', value: { popupMode: string }): void
}>()

const mockupData = {
  batSeq: props.batchId,
  batName: '배치 이름1',
  batTp: 'minute',
  batTime: '15:30',
  batDesc: '배치 1 입니다.'
}
const batchKindOptions = [
  {
    value: 'year',
    label: '년'
  },
  {
    value: 'month',
    label: '월'
  },
  {
    value: 'day',
    label: '일'
  },
  {
    value: 'minute',
    label: '분'
  }
]

const batchId = ref('')
const popupMode = ref('')
const batchInfo = reactive<IBatchDetail>({
  batName: '',
  batTp: 'year',
  batTime: '',
  batDesc: ''
})

const resetForm = () => {
  batchInfo.batName = '',
    batchInfo.batTp = 'year',
    batchInfo.batTime = '',
    batchInfo.batDesc = ''
}

const handleCancel = () => {
  emits('cancel')
}

const getBatchDetail = () => {
  try {
    // FIXME: api 연결
    // const param = {
    //   corpSeq: batchId.value
    // }
    // const res = await request({
    //   method: 'POST',
    //   url: '/batch/detail',
    //   param
    // })
    return mockupData
  }
  catch (error) {
    console.error(error)
  }
}

const setBatchDetail = () => {
  const data = getBatchDetail()
  batchInfo.batchCode = data.batchCode
  batchInfo.batName = data.batName
  batchInfo.batTp = data.batTp
  batchInfo.batTime = data.batTime
  batchInfo.batDesc = data.batDesc
}

const handleUpdateBatch = () => {
  try {
    if (popupMode.value === 'Create') {
      // FIXME: api 연결
      // const res = await request({
      //   method: 'POST',
      //   url: '/batch/insert',
      //   {batchInfo},
      // })
      console.log('등록', batchInfo)
    }
    else if (popupMode.value === 'Update') {
      // FIXME: api 연결
      // const res = await request({
      //   method: 'POST',
      //   url: '/batch/update',
      //   {batchInfo},
      // })
      console.log('수정', batchInfo)
    }
    emits('confirm', popupMode.value)
    emits('cancel')
  }
  catch (error) {
    console.error(error)
  }
}

const handleChangeMode = () => {
  popupMode.value = 'Update'
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
  batchId.value = props.batchId
  popupMode.value = props.popupMode
  if (!batchId.value) {
    resetForm()
    return
  }

  resetForm()
  setBatchDetail()
})
</script>

<template>
  <common-modal v-model="isShow" :title="t('batch.title')" :size="MODAL_SIZE.MEDIUM" @cancel="handleCancel">
    <template #content>
      <form class="form">
        <!-- <FormItem :label="t('batch.label.code')">
          <CustomInput v-model="batchInfo.batchCode" :placeholder="t('batch.placeholder.code')"
            :readonly="popupMode === 'Detail'" />
        </FormItem> -->
        <FormItem :label="t('batch.label.name')">
          <CustomInput v-model="batchInfo.batName" :placeholder="t('batch.placeholder.name')"
            :readonly="popupMode === 'Detail'" />
        </FormItem>
        <FormItem :label="t('batch.label.kind')">
          <basic-select-box v-model="batchInfo.batTp" :options="batchKindOptions" :readonly="popupMode === 'Detail'" />
        </FormItem>
        <FormItem :label="t('batch.label.time')">
          <el-time-select v-model="batchInfo.batTime" :placeholder="t('batch.placeholder.time')"
            :readonly="popupMode === 'Detail'" />
        </FormItem>
        <FormItem :label="t('batch.label.description')">
          <CustomTextarea v-model="batchInfo.batDesc" :placeholder="t('batch.placeholder.description')"
            :readonly="popupMode === 'Detail'" />
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
        @click="handleUpdateBatch">
        {{ t('common.button.save') }}
      </button>
    </template>
  </common-modal>
</template>
<style></style>