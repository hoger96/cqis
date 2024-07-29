<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CustomInput from '~/components/CustomInput.vue'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const anncId = ref(route.params.id)
const updateMode = ref(true)
const contents = ref<string | Delta>()
const dropZoneRef = ref<HTMLDivElement>()
const attachedFile = ref<File>([])
const fileRef = ref<HTMLInputElement | null>(null)
const fileName = ref('')

const anncForm = reactive<IAnnouncementDetail>({
  title: '',
  createUser: '',
  createDate: '',
  updateUser: '',
  updateDate: '',
  file: '',
  postingPeriod: '',
})

const getAnncDetail = () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: `/annc/${anncId.value}`
    // })
    const res = {
      title: '[전사공지] 안전관리',
      createUser: '김영현',
      createDate: '2024-07-18',
      detail: '안전관리에 대하여 알려드리겠습니다.',
      file: '안전관리.pdf',
      startDate: '2024-07-18',
      endDate: '2024-07-24'
    }
    return res
  }
  catch (error: Error) {
    console.error(error)
  }
}

const setAnncDetail = () => {
  const data = getAnncDetail()
  const period = [data.startDate, data.endDate]
  anncForm.title = data.title
  anncForm.createUser = data.createUser
  anncForm.createDate = data.createDate
  anncForm.updateUser = data.updateUser ? data.updateUser : '-'
  anncForm.updateDate = data.updateDate ? data.updateDate : '-'
  contents.value = data.detail
  fileName.value = data.file
  anncForm.postingPeriod = period
}

const onEditorChange = (value: string) => {
  contents.value = value
}

const onDrop = (files: File[] | null, event: DragEvent) => {
  if (files) {
    uploadFile(event, files)
  }
}
useDropZone(dropZoneRef, {
  onDrop,
  // dataTypes: ['application/pdf', 'application/vnd.hancom.hwp', 'application/haansofthwp', 'application/x-hwp', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
})

const uploadFile = (e: Event | DragEvent, dropFile?: File) => {
  const target = e.target as HTMLInputElement
  const files = dropFile || target.files

  if (!files)
    return

  attachedFile.value = files as any
  setFileName()
}


const openFileUpload = (e: Event) => {
  if (fileRef.value !== null)
    fileRef.value.value = ''
  if (!fileRef.value)
    return e.preventDefault()
  fileRef.value.click()
}

const setFileName = () => {
  fileName.value = attachedFile.value[0].name
}

const handleUpdateAnnc = () => {
  //FIXME: api 연결
  try {
    const data = ref({})
    if (attachedFile.value.length) {
      const formData = new FormData()
      formData.append('file', attachedFile.value[0])
      data.value = {
        title: anncForm.title,
        startDate: String(anncForm.postingPeriod[0]),
        endDate: anncForm.postingPeriod[1],
        detail: contents,
        file: formData
      }
    }
    else {
      data.value = {
        title: anncForm.title,
        startDate: anncForm.postingPeriod[0],
        endDate: anncForm.postingPeriod[1],
        detail: contents,
      }
    }
    console.log('등록: ', data.value)
    updateMode.value = true
    setAnncDetail()
  }
  catch (error) {
    console.error(error)
  }
}

const handleChangeUpdateMode = () => {
  updateMode.value = false
}

const handleGoAnncPage = () => {
  router.push({ path: '/system/announcement/admin-index' })
}

const handleCancel = () => {
  updateMode.value = true
}

onMounted(() => {
  setAnncDetail()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('annc.admin-title') }}
    </h2>
    <div class="content__box">
      <div class="form">
        <label :class="updateMode ? 'form__label' : 'form__label--required'"> {{ t('common.label.title') }}</label>
        <CustomInput v-model="anncForm.title" :readonly="updateMode" />
      </div>
      <div class="form">
        <label :class="updateMode ? 'form__label' : 'form__label--required'">{{ t('common.label.period') }}</label>
        <el-date-picker v-model="anncForm.postingPeriod" type="daterange" range-separator="~" value-format="YYYY-MM-DD"
          :start-placeholder="t('common.label.start-date')" :end-placeholder="t('common.label.end-date')"
          :readonly="updateMode" />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.create-user') }}</label>
        <CustomInput v-model="anncForm.createUser" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.create-date') }}</label>
        <CustomInput v-model="anncForm.createDate" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.update-user') }}</label>
        <CustomInput v-model="anncForm.updateUser" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.update-date') }}</label>
        <CustomInput v-model="anncForm.updateDate" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.file') }}</label>
        <div ref="dropZoneRef" class="form__upload">
          <button v-if="!updateMode" class="btn__secondary-line--md" @click="openFileUpload">
            {{ t('common.button.file') }}
          </button>
          <p v-if="!updateMode">{{ t('common.label.file-placeholder') }}</p>
          <p>{{ fileName }}</p>
          <input id="file-upload" ref="fileRef" type="file" style="display: none;" @change="uploadFile">
        </div>
      </div>
      <div>
        <label :class="updateMode ? 'form__label' : 'form__label--required'">{{ t('common.label.content') }}</label>
        <Editor v-model:content="contents" toolbar="full" theme="snow"
          :placeholder="t('common.label.content-placeholder')" content-type="text" @change="onEditorChange"
          :read-only="updateMode" />
      </div>
    </div>
    <div class="content__btns">
      <button v-if="updateMode" type="button" class="btn__secondary-line--lg" @click="handleGoAnncPage">
        {{ t('common.button.cancel') }}
      </button>
      <button v-if="updateMode" type="button" class="btn__primary--lg" @click="handleChangeUpdateMode">
        {{ t('common.button.update') }}
      </button>
      <button v-if="!updateMode" type="button" class="btn__secondary-line--lg" @click="handleCancel">
        {{ t('common.button.cancel') }}
      </button>
      <button v-if="!updateMode" type="button" class="btn__primary--lg" @click="handleUpdateAnnc">
        {{ t('common.button.confirm') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
