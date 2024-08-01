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
const contents = ref<string | Delta>()
const attachedFile = ref<File[]>([])
const dataLoaded = ref(false)
const noUpload = ref(false)

const faqForm = reactive<IFaqDetail>({
  title: '',
  createUser: '',
  createDate: '',
})

const fileData = {
  lastModified: 1721021632831,
  lastModifiedDate: 'Mon Jul 15 2024 14: 33: 52 GMT +0900(한국 표준시)',
  name: '호걸가계부.xlsx',
  size: 14083,
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  webkitRelativePath: ''
};
const getFaqDetail = async () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: `/annc/${anncId.value}`
    // })
    const res = await {
      title: '로그인 가이드',
      createUser: '김영현',
      createDate: '2024-07-18',
      detail: '로그인 방법에 대해 알려드리겠습니다.',
      file: new File([""], fileData.name, {
        type: fileData.type,
        lastModified: fileData.lastModified
      })
    }
    return res
  }
  catch (error: Error) {
    console.error(error)
  }
}

const setFaqDetail = async () => {
  const data = await getFaqDetail()
  faqForm.title = data.title
  faqForm.createUser = data.createUser
  faqForm.createDate = data.createDate
  contents.value = data.detail
  if (data.file) {
    attachedFile.value = [data.file]
  }
  dataLoaded.value = true
}

const handleGoFaqPage = () => {
  router.push({ path: '/system/announcement' })
}

const onFileChange = (file: File[]) => {
  attachedFile.value = file
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
      <form class="form">
        <FormItem :label="t('common.label.title')">
          <CustomInput v-model="faqForm.title" readonly />
        </FormItem>
        <FormItem :label="t('common.label.create-user')">
          <CustomInput v-model="faqForm.createUser" readonly />
        </FormItem>
        <FormItem :label="t('common.label.create-date')">
          <CustomInput v-model="faqForm.createDate" readonly />
        </FormItem>
        <FormItem v-if="dataLoaded" :label="t('common.label.file')">
          <FileUpload @file-change="onFileChange" :show="noUpload" :file="attachedFile" />
        </FormItem>
        <FormItem :label="t('common.label.content')">
          <Editor v-model:content="contents" toolbar="full" theme="snow" content-type="text" :read-only="true" />
        </FormItem>
      </form>
    </div>
    <div class="content__btns">
      <button type="button" class="btn__primary--lg" @click="handleGoFaqPage">
        {{ t('common.button.confirm') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
