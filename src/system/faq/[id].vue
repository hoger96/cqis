<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CustomInput from '../../components/CustomInput.vue'
import CustomTextarea from '../../examples/components/custom-textarea/CustomTextarea.vue'
import { IFaqDetail } from '../types/faq.ts'

const route = useRoute()
const router = useRouter()
const faqId = ref(route.params.id)

const faqForm = reactive<IAnnouncementDetail>({
  title: '',
  createUser: '',
  createDate: '',
  detail: '',
  file: '',
})

const getFaqDetail = () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: `/annc/${anncId.value}`
    // })
    const res = {
      title: '로그인 가이드',
      createUser: '김영현',
      createDate: '2024-07-18',
      detail: '로그인 방법에 대해 알려드리겠습니다.',
      file: '로그인.pdf'
    }
    return res
  }
  catch (error: Error) {
    console.error(error)
  }
}

const setFaqDetail = () => {
  const data = getFaqDetail()
  faqForm.title = data.title
  faqForm.createUser = data.createUser
  faqForm.createDate = data.createDate
  faqForm.detail = data.detail
  faqForm.file = data.file
}

const handleGoFaqPage = () => {
  router.push({ path: '/annc' })
}

onMounted(() => {
  setFaqDetail()
})
</script>

<template>
  <div class="document">
    <div class="mb-4">
      <h2 class="mgmt__title">
        FAQ
      </h2>
    </div>
    <div class="mgmt__box">
      <div class="form">
        <label class="form__label">제목</label>
        <CustomInput v-model="faqForm.title" readonly />
      </div>
      <div class="form">
        <label class="form__label">등록자</label>
        <CustomInput v-model="faqForm.createUser" readonly />
      </div>
      <div class="form">
        <label class="form__label">등록일자</label>
        <CustomInput v-model="faqForm.createDate" readonly />
      </div>
      <div class="form">
        <label class="form__label">첨부파일</label>
        <CustomInput v-model="faqForm.file" readonly />
      </div>
      <div class="form">
        <label class="form__label">내용</label>
        <CustomTextarea v-model="faqForm.detail" readonly />
      </div>
    </div>
    <div class="mgmt__btn">
      <button type="button" class="btn__primary--lg" @click="handleGoFaqPage">
        확인
      </button>
    </div>
  </div>
</template>

<style scoped></style>
