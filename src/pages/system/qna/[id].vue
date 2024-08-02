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
const questionUpload = ref(false)
const createAnswerMode = ref(true)
const attachedAnswerFile = ref<File[]>([])
const attachedQuestionFile = ref<File[]>([])
const dataLoaded = ref(false)
const questionContents = ref<string | Delta>()
const answerContents = ref<string | Delta>()

const qnaForm = reactive({
  question: {
    title: '',
    createUser: '',
    createDate: '',
  },
  answer: {
    title: '',
    createUser: '',
    createDate: '',
  }
})

const fileData = {
  lastModified: 1721021632831,
  lastModifiedDate: 'Mon Jul 15 2024 14: 33: 52 GMT +0900(한국 표준시)',
  name: '호걸가계부.xlsx',
  size: 14083,
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  webkitRelativePath: ''
};
const getQnaDetail = async () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: `/qna/${qnaId.value}`
    // })
    const res = await {
      question: {
        title: '검색결과 노출기준에 관련 문의',
        createUser: '문지연',
        createDate: '2024-07-18',
        detail: '안녕하세요. 검색결과 노출기준에 대해 궁금합니다.',
        file: new File([""], fileData.name, {
          type: fileData.type,
          lastModified: fileData.lastModified
        })
      },
      answer: {
        title: 'RE: 검색결과 노출기준에 관련 문의',
        createUser: '김수철',
        createDate: '2024-07-19',
        detail: '안녕하세요. 기준에 대해 말씀드리겠습니다.',
        file: new File([""], fileData.name, {
          type: fileData.type,
          lastModified: fileData.lastModified
        })
      }
    }
    return res
  }
  catch (error: Error) {
    console.error(error)
  }
}

const onFileChange = (file: File[]) => {
  console.log('dd')
}

const setQnaDetail = async () => {
  const data = await getQnaDetail()
  qnaForm.question.title = data.question.title
  qnaForm.question.createUser = data.question.createUser
  qnaForm.question.createDate = data.question.createDate
  questionContents.value = data.question.detail
  if (data.question.file) {
    attachedQuestionFile.value = [data.question.file]
  }
  if (data.answer) {
    qnaForm.answer.title = data.answer.title
    qnaForm.answer.createUser = data.answer.createUser
    qnaForm.answer.createDate = data.answer.createDate
    answerContents.value = data.answer.detail
    if (data.answer.file) {
      attachedAnswerFile.value = [data.answer.file]
    }
  } else {
    createAnswerMode.value = false
  }
  dataLoaded.value = true
}
const handleGoQnaPage = () => {
  router.push({ path: '/system/qna' })
}

onMounted(async () => {
  await setQnaDetail()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('qna.title') }}
    </h2>
    <div class="content__box">
      <form class="form">
        <FormItem :label="t('common.label.title')">
          <CustomInput v-model="qnaForm.question.title" readonly />
        </FormItem>
        <FormItem :label="t('common.label.create-user')">
          <CustomInput v-model="qnaForm.question.createUser" readonly />
        </FormItem>
        <FormItem :label="t('common.label.create-date')">
          <CustomInput v-model="qnaForm.question.createDate" readonly />
        </FormItem>
        <FormItem v-if="dataLoaded" :label="t('common.label.file')">
          <FileUpload @file-change="onFileChangeQuestion" :show="questionUpload" :file="attachedQuestionFile" />
        </FormItem>
        <FormItem :label="t('common.label.content')">
          <Editor v-model:content="questionContents" toolbar="full" theme="snow"
            :placeholder="t('common.label.content-placeholder')" content-type="text" @change="onEditorChange"
            :read-only="true" />
        </FormItem>
      </form>
    </div>
    <div v-if="qnaForm.answer.title !== ''" class="content__box">
      <form class="form">
        <FormItem v-if="createAnswerMode" :label="t('common.label.title')">
          <CustomInput v-model="qnaForm.answer.title" readonly />
        </FormItem>
        <FormItem v-if="createAnswerMode" :label="t('common.label.create-user')">
          <CustomInput v-model="qnaForm.answer.createUser" readonly />
        </FormItem>
        <FormItem v-if="createAnswerMode" :label="t('common.label.create-date')">
          <CustomInput v-model="qnaForm.answer.createDate" readonly />
        </FormItem>
        <FormItem v-if="dataLoaded" :label="t('common.label.file')">
          <FileUpload @file-change="onFileChangeQuestion" :show="questionUpload" :file="attachedAnswerFile" />
        </FormItem>
        <FormItem :label="t('common.label.content')">
          <Editor v-model:content="answerContents" toolbar="full" theme="snow"
            :placeholder="t('common.label.content-placeholder')" content-type="text" @change="onEditorChange"
            :read-only="true" />
        </FormItem>
      </form>
    </div>
    <div v-else class="content__box">
      <p>{{ t('qna.no-answer') }}</p>
    </div>
    <div class="content__btns">
      <button type="button" class="btn__primary--lg" @click="handleGoQnaPage">
        {{ t('common.button.confirm') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
