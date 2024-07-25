<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CustomInput from '../../components/CustomInput.vue'
import CustomTextarea from '../../examples/components/custom-textarea/CustomTextarea.vue'
import { IQnaDetail } from '../types/qna.ts'

const route = useRoute()
const router = useRouter()
const qnaId = ref(route.params.id)

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
  console.log(qnaForm.question.file)
  if (data.answer) {
    qnaForm.answer.title = data.answer.title
    qnaForm.answer.createUser = data.answer.createUser
    qnaForm.answer.createDate = data.answer.createDate
    qnaForm.answer.detail = data.answer.detail
    qnaForm.answer.file = data.answer.file
  }
}

const handleGoQnaPage = () => {
  router.push({ path: '/qna' })
}

onMounted(() => {
  setQnaDetail()
})
</script>

<template>
  <div class="document">
    <div class="mb-4">
      <h2 class="mgmt__title">
        Q&A
      </h2>
    </div>
    <div class="mgmt__box">
      <div class="form">
        <label class="form__label">제목</label>
        <CustomInput v-model="qnaForm.question.title" readonly />
      </div>
      <div class="form">
        <label class="form__label">등록자</label>
        <CustomInput v-model="qnaForm.question.createUser" readonly />
      </div>
      <div class="form">
        <label class="form__label">등록일자</label>
        <CustomInput v-model="qnaForm.question.createDate" readonly />
      </div>
      <div class="form">
        <label class="form__label">첨부파일</label>
        <CustomInput v-model="qnaForm.question.file" readonly />
      </div>
      <div class="form">
        <label class="form__label">내용</label>
        <CustomTextarea v-model="qnaForm.question.detail" readonly />
      </div>
    </div>
    <div v-if="qnaForm.answer.title !== ''" class="mgmt__box">
      <div class="form">
        <label class="form__label">제목</label>
        <CustomInput v-model="qnaForm.answer.title" readonly />
      </div>
      <div class="form">
        <label class="form__label">등록자</label>
        <CustomInput v-model="qnaForm.answer.createUser" readonly />
      </div>
      <div class="form">
        <label class="form__label">등록일자</label>
        <CustomInput v-model="qnaForm.answer.createDate" readonly />
      </div>
      <div class="form">
        <label class="form__label">첨부파일</label>
        <CustomInput v-model="qnaForm.answer.file" readonly />
      </div>
      <div class="form">
        <label class="form__label">내용</label>
        <CustomTextarea v-model="qnaForm.answer.detail" readonly />
      </div>
    </div>
    <div v-else class="mgmt__box">
      <p>등록된 답변이 없습니다.</p>
    </div>
    <div class="mgmt__btn">
      <button type="button" class="btn__primary--lg" @click="handleGoQnaPage">
        확인
      </button>
    </div>
  </div>
</template>

<style scoped></style>
