<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { Delta } from '@vueup/vue-quill'
import { useRouter, useRoute } from 'vue-router'
import { type IAnnouncementDetail } from '../types/announcement.ts'
import FileUpload from '../../../components/FileUpload.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const anncId = ref(route.params.id)
const contents = ref<string | Delta>()
const attachedFile = ref<File[] | []>([])
const dataLoaded = ref(false)
const questionUpload = ref(false)

const anncForm = reactive({
  title: '',
  createUser: '',
  createDate: '',
  updateUser: '',
  updateDate: '',
  postingPeriod: '',
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
    //   url: `/annc/${anncId.value}`
    // })
    const res = await {
      title: '[전사공지] 안전관리',
      createUser: '김영현',
      createDate: '2024-07-18',
      detail: '안전관리에 대하여 알려드리겠습니다.',
      startDate: '2024-07-18',
      endDate: '2024-07-24',
      file: new File([""], fileData.name, {
        type: fileData.type,
        lastModified: fileData.lastModified
      })
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
    const period = [data.startDate, data.endDate]
    anncForm.title = data.title
    anncForm.createUser = data.createUser
    anncForm.createDate = data.createDate
    anncForm.updateUser = data.updateUser ? data.updateUser : '-'
    anncForm.updateDate = data.updateDate ? data.updateDate : '-'
    contents.value = data.detail
    anncForm.postingPeriod = period
    if (data.file) {
      attachedFile.value = [data.file]
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
      <div class="form__item">
        <FormItem :label="t('common.label.create-user')">
          <CustomInput v-model="anncForm.createUser" readonly />
        </FormItem>
        <FormItem :label="t('common.label.create-date')">
          <CustomInput v-model="anncForm.createDate" readonly />
        </FormItem>
      </div>
      <div class="form__item">
        <FormItem :label="t('common.label.update-user')">
          <CustomInput v-model="anncForm.updateUser" readonly />
        </FormItem>
        <FormItem :label="t('common.label.update-date')">
          <CustomInput v-model="anncForm.updateDate" readonly />
        </FormItem>
      </div>
      <FormItem v-if="dataLoaded" :label="t('common.label.file')">
        <FileUpload @file-change="onFileChange" :show="questionUpload" :file="attachedFile" />
      </FormItem>
      <FormItem :label="t('common.label.content')">
        <Editor v-model:content="contents" toolbar="full" theme="snow" content-type="text" :read-only="true" />
      </FormItem>
    </form>
    <div class="content__btns">
      <button type="button" class="btn__primary--lg" @click="handleGoAnncPage">
        {{ t('common.button.confirm') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
