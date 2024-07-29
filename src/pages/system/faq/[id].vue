<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CustomInput from '~/components/CustomInput.vue'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'
import { IFaqDetail } from '~/types/faq.ts'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const faqId = ref(route.params.id)

const faqForm = reactive<IFaqDetail>({
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
  router.push({ path: '/system/announcement' })
}

onMounted(() => {
  setFaqDetail()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('faq.title') }}
    </h2>
    <div class="content__box">
      <div class="form">
        <label class="form__label">{{ t('common.label.title') }}</label>
        <CustomInput v-model="faqForm.title" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.create-user') }}</label>
        <CustomInput v-model="faqForm.createUser" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.create-date') }}</label>
        <CustomInput v-model="faqForm.createDate" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.file') }}</label>
        <CustomInput v-model="faqForm.file" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.content') }}</label>
        <CustomTextarea v-model="faqForm.detail" readonly />
      </div>
    </div>
    <div class="content__btns">
      <button type="button" class="btn__primary--lg" @click="handleGoFaqPage">
        {{ t('common.button.confirm') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
