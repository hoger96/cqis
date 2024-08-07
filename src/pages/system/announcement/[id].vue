<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { Delta } from '@vueup/vue-quill'
import { useRouter, useRoute } from 'vue-router'
import { type IAnnouncementDetail } from '../types/announcement.ts'
import FileUpload from '../../../components/FileUpload.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const notySeq = ref(route.params.id)
const contents = ref<string | Delta>()
const attachedFile = ref<File[] | []>([])
const dataLoaded = ref(false)
const questionUpload = ref(false)

const anncForm = reactive({
  title: '',
  ctg: '',
  crteUserId: '',
  crteDttm: '',
  updUserId: '',
  updDttm: '',
  postingPeriod: []
})

const fileData = {
  lastModified: 1721021632831,
  lastModifiedDate: 'Mon Jul 15 2024 14: 33: 52 GMT +0900(한국 표준시)',
  name: '호걸가계부.xlsx',
  size: 14083,
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  webkitRelativePath: ''
};
const getAnncDetail = async () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: `/annc/${notySeq.value}`
    // })
    const res = await {
      title: '[전사공지] 안전관리',
      ctg: '전사공지',
      crteUserId: '김영현',
      crteDttm: '2024-07-18',
      cont: '안전관리에 대하여 알려드리겠습니다.',
      startDate: '2024-07-18',
      endDate: '2024-07-24',
      fileList: new File([""], fileData.name, {
        type: fileData.type,
        lastModified: fileData.lastModified
      }),
      updUserId: '',
      updDttm: '',
      notyStartDt: '2024-01-01',
      notyEndDt: '2024-12-31'
    }
    return res
  }
  catch (error) {
    console.error(error)
  }
}

const setAnncDetail = async () => {
  const data = await getAnncDetail()
  if (data) {
    const period = [data.notyStartDt, data.notyEndDt]
    anncForm.title = data.title
    anncForm.ctg = data.ctg
    anncForm.crteUserId = data.crteUserId
    anncForm.crteDttm = data.crteDttm
    anncForm.updUserId = data.updUserId ? data.updUserId : '-'
    anncForm.updDttm = data.updDttm ? data.updDttm : '-'
    contents.value = data.cont
    anncForm.postingPeriod = period
    if (data.fileList) {
      attachedFile.value = [data.fileList]
    }
    dataLoaded.value = true
  }
}

const handleGoAnncPage = () => {
  router.push({ path: '/system/announcement' })
}

const onFileChange = (file: File[]) => {
  attachedFile.value = file
}

onMounted(async () => {
  await setAnncDetail()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('annc.title') }}
    </h2>
    <form class="form form__table">
      <FormItem :label="t('common.label.title')">
        <CustomInput v-model="anncForm.title" readonly />
      </FormItem>
      <FormItem :label="t('common.label.period')">
        <el-date-picker v-model="anncForm.postingPeriod" type="daterange" range-separator="~" value-format="YYYY-MM-DD"
          :start-placeholder="t('common.label.start-date')" :end-placeholder="t('common.label.end-date')" readonly />
      </FormItem>
      <FormItem :label="t('annc.label.category')">
        <CustomInput v-model="anncForm.ctg" readonly />
      </FormItem>
      <FormItem :label="t('common.label.content')">
        <Editor v-model:content="contents" toolbar="full" theme="snow" content-type="text" :read-only="true" />
      </FormItem>
      <FormItem v-if="dataLoaded" :label="t('common.label.file')">
        <FileUpload @file-change="onFileChange" :show="questionUpload" :file="attachedFile" />
      </FormItem>
      <div class="form__item">
        <FormItem :label="t('common.label.create-user')">
          <CustomInput v-model="anncForm.crteUserId" readonly />
        </FormItem>
        <FormItem :label="t('common.label.create-date')">
          <CustomInput v-model="anncForm.crteDttm" readonly />
        </FormItem>
      </div>
      <div class="form__item">
        <FormItem :label="t('common.label.update-user')">
          <CustomInput v-model="anncForm.updUserId" readonly />
        </FormItem>
        <FormItem :label="t('common.label.update-date')">
          <CustomInput v-model="anncForm.updDttm" readonly />
        </FormItem>
      </div>
    </form>
    <div class="content__btns">
      <button type="button" class="btn__primary--lg" @click="handleGoAnncPage">
        {{ t('common.button.confirm') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
