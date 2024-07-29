<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CustomInput from '~/components/CustomInput.vue'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'
import { IQnaDetail } from '../types/qna.ts'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const qnaId = ref(route.params.id)
const createAnwerMode = ref(true)
const dropZoneRef = ref<HTMLDivElement>()
const attachedFile = ref<File>([])
const fileRef = ref<HTMLInputElement | null>(null)

const onDrop = (files: File[] | null, event: DragEvent) => {
  if (files) {
    uploadFile(event, files)
  }
}
useDropZone(dropZoneRef, {
  onDrop,
  // dataTypes: ['application/pdf', 'application/vnd.hancom.hwp', 'application/haansofthwp', 'application/x-hwp', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
})


const openFileUpload = (e: Event) => {
  if (fileRef.value !== null)
    fileRef.value.value = ''
  if (!fileRef.value)
    return e.preventDefault()
  fileRef.value.click()
}

const setFileName = () => {
  qnaForm.answer.file = attachedFile.value[0].name
}

const uploadFile = (e: Event | DragEvent, dropFile?: File) => {
  const target = e.target as HTMLInputElement
  const files = dropFile || target.files

  if (!files)
    return

  attachedFile.value = files as any
  setFileName()
}

const qnaForm = reactive<IQnaDetail>({
  question: {
    title: '',
    createUser: '',
    createDate: '',
    detail: '',
    file: ''
  },
  answer: {
    title: '',
    createUser: '',
    createDate: '',
    detail: '',
    file: '',
  }
})

const onEditorChange = (value: string) => {
  qnaForm.answer.detail = value
}

const getQnaDetail = () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: `/qna/${qnaId.value}`
    // })
    const res = {
      question: {
        title: '검색결과 노출기준에 관련 문의',
        createUser: '문지연',
        createDate: '2024-07-18',
        detail: '안녕하세요. 검색결과 노출기준에 대해 궁금합니다.',
        file: '캡처.jpg'
      },
      answer: {
        title: 'RE: 검색결과 노출기준에 관련 문의',
        createUser: '김수철',
        createDate: '2024-07-19',
        detail: '안녕하세요. 기준에 대해 말씀드리겠습니다.',
        file: '캡처.jpg'
      }
    }
    return res
  }
  catch (error: Error) {
    console.error(error)
  }
}

const setQnaDetail = () => {
  const data = getQnaDetail()
  qnaForm.question.title = data.question.title
  qnaForm.question.createUser = data.question.createUser
  qnaForm.question.createDate = data.question.createDate
  qnaForm.question.detail = data.question.detail
  qnaForm.question.file = data.question.file
  if (data.answer) {
    qnaForm.answer.title = data.answer.title
    qnaForm.answer.createUser = data.answer.createUser
    qnaForm.answer.createDate = data.answer.createDate
    qnaForm.answer.detail = data.answer.detail
    qnaForm.answer.file = data.answer.file
  } else {
    createAnwerMode.value = false
  }
}

const handleAnswerQna = () => {
  try {
    const data = ref({})
    if (attachedFile.value.length) {
      const formData = new FormData()
      formData.append('file', attachedFile.value[0])
      data.value = {
        detail: qnaForm.answer.detail,
        file: formData
      }
    }
    else {
      data.value = {
        detail: qnaForm.answer.detail,
      }
    }
    console.log('등록: ', data.value)
    createAnwerMode.value = true
    setQnaDetail()
  }
  catch (error) {
    console.error(error)
  }
}

const handleGoQnaPage = () => {
  router.push({ path: '/system/qna/admin-index' })
}

onMounted(() => {
  setQnaDetail()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('qna.admin-title') }}
    </h2>
    <div class="content__box">
      <div class="form">
        <label class="form__label">{{ t('common.label.title') }}</label>
        <CustomInput v-model="qnaForm.question.title" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.create-user') }}</label>
        <CustomInput v-model="qnaForm.question.createUser" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.create-date') }}</label>
        <CustomInput v-model="qnaForm.question.createDate" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.file') }}</label>
        <div class="form__upload">
          <p>{{ qnaForm.question.file }}</p>
          <input id="file-upload" ref="fileRef" type="file" style="display: none;">
        </div>
      </div>
      <div>
        <label class='form__label'>{{ t('common.label.content') }}</label>
        <Editor v-model:content="qnaForm.question.detail" toolbar="full" theme="snow"
          :placeholder="t('common.label.content-placeholder')" content-type="text" @change="onEditorChange"
          :read-only="true" />
      </div>
    </div>
    <div class="content__box">
      <div v-if="createAnwerMode" class="form">
        <label class='form__label'>{{ t('common.label.title') }}</label>
        <CustomInput v-model="qnaForm.answer.title" readonly />
      </div>
      <div v-if="createAnwerMode" class="form">
        <label class="form__label">{{ t('common.label.create-user') }}</label>
        <CustomInput v-model="qnaForm.answer.createUser" readonly />
      </div>
      <div v-if="createAnwerMode" class="form">
        <label class="form__label">{{ t('common.label.create-date') }}</label>
        <CustomInput v-model="qnaForm.answer.createDate" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.file') }}</label>
        <div ref="dropZoneRef" class="form__upload">
          <button v-if="!createAnwerMode" class="btn__secondary-line--md" @click="openFileUpload">
            {{ t('common.button.file') }}
          </button>
          <p v-if="!createAnwerMode">{{ t('common.label.file-placeholder') }}</p>
          <p>{{ qnaForm.answer.file }}</p>
          <input id="file-upload" ref="fileRef" type="file" style="display: none;" @change="uploadFile">
        </div>
      </div>
      <div>
        <label :class="createAnwerMode ? 'form__label' : 'form__label--required'">{{ t('common.label.content')
          }}</label>
        <Editor v-model:content="qnaForm.answer.detail" toolbar="full" theme="snow"
          :placeholder="t('common.label.content-placeholder')" content-type="text" @change="onEditorChange"
          :read-only="createAnwerMode" />
      </div>
    </div>
    <div class="content__btns">
      <button type="button" class="btn__secondary-line--lg" @click="handleGoQnaPage">
        {{ t('common.button.cancel') }}
      </button>
      <button v-if="!createAnwerMode" type="button" class="btn__primary--lg" @click="handleAnswerQna">
        {{ t('common.button.confirm') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
