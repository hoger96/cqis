<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CustomTextarea from '../../../examples/components/custom-textarea/CustomTextarea.vue'
import { type IFaqDetail } from '../types/faq.ts'
import type { Delta } from '@vueup/vue-quill'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const faqId = ref(route.params.id)
const contents = ref<string | Delta>()
const attachedFile = ref<File[]>([])
const dataLoaded = ref(false)
const noUpload = ref(false)

const faqForm = reactive({
  title: '',
  crteUserId: '',
  crteDttm: '',
  updUserId: '',
  updDttm: '',
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
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/faq/detail'
    //   {faqSeq: faqId.value}
    // })
    const res = await {
      title: '[전사공지] 안전관리',
      faqDispYn: 'Y',
      crteUserId: '김영현',
      crteDttm: '2024-07-18',
      cont: '안전관리에 대하여 알려드리겠습니다.',
      fileList: new File([""], fileData.name, {
        type: fileData.type,
        lastModified: fileData.lastModified
      }),
      updDttm: '',
      updUserId: ''
    }
    return res
  }
  catch (error) {
    console.error(error)
  }
}

const setFaqDetail = async () => {
  const data = await getFaqDetail()
  if (data) {
    faqForm.title = data.title
    faqForm.faqDispYn = data.faqDispYn
    faqForm.crteUserId = data.crteUserId
    faqForm.crteDttm = data.crteDttm
    faqForm.updUserId = data.updUserId ? data.updUserId : '-'
    faqForm.updDttm = data.updDttm ? data.updDttm : '-'
    contents.value = data.cont
    if (data.fileList) {
      attachedFile.value = [data.fileList]
    }
    dataLoaded.value = true
  }
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
    <form class="form form__table">
      <FormItem :label="t('common.label.title')">
        <CustomInput v-model="faqForm.title" readonly />
      </FormItem>
      <FormItem :label="t('common.label.content')" class="flex-1">
        <Editor v-model:content="contents" toolbar="full" theme="snow" content-type="text" :read-only="true" />
      </FormItem>
      <FormItem v-if="dataLoaded" :label="t('common.label.file')">
        <FileUpload @file-change="onFileChange" :show="noUpload" :file="attachedFile" />
      </FormItem>
      <div class="form__item">
        <FormItem :label="t('common.label.create-user')">
          <CustomInput v-model="faqForm.crteUserId" readonly />
        </FormItem>
        <FormItem :label="t('common.label.create-date')">
          <CustomInput v-model="faqForm.crteDttm" readonly />
        </FormItem>
      </div>
      <div class="form__item">
        <FormItem :label="t('common.label.update-user')">
          <CustomInput v-model="faqForm.updUserId" readonly />
        </FormItem>
        <FormItem :label="t('common.label.update-date')">
          <CustomInput v-model="faqForm.updDttm" readonly />
        </FormItem>
      </div>
    </form>
    <div class="content__btns">
      <button type="button" class="btn__primary--lg" @click="handleGoFaqPage">
        {{ t('common.button.confirm') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
