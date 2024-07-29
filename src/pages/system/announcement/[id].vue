<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CustomInput from '~/components/CustomInput.vue'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const anncId = ref(route.params.id)

const anncForm = reactive<IAnnouncementDetail>({
  title: '',
  createUser: '',
  createDate: '',
  updateUser: '',
  updateDate: '',
  detail: '',
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
  anncForm.detail = data.detail
  anncForm.file = data.file
  anncForm.postingPeriod = period
}

const handleGoAnncPage = () => {
  router.push({ path: '/system/announcement' })
}

onMounted(() => {
  setAnncDetail()
})
</script>

<template>
  <div class="document">
    <div class="mb-4">
      <h2 class="mgmt__title">
        {{ t('annc.title') }}
      </h2>
    </div>
    <div class="content__box">
      <div class="form">
        <label class="form__label">{{ t('common.label.title') }}</label>
        <CustomInput v-model="anncForm.title" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.period') }}</label>
        <el-date-picker v-model="anncForm.postingPeriod" type="daterange" range-separator="~" value-format="YYYY-MM-DD"
          :start-placeholder="t('common.label.start-date')" :end-placeholder="t('common.label.end-date')" readonly />
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
        <CustomInput v-model="anncForm.file" readonly />
      </div>
      <div class="form">
        <label class="form__label">{{ t('common.label.content') }}</label>
        <Editor v-model:content="anncForm.detail" toolbar="full" theme="snow"
          :placeholder="t('common.label.content-placeholder')" content-type="text" @change="onEditorChange"
          :read-only="true" />
      </div>
    </div>
    <div class="mgmt__btn">
      <button type="button" class="btn__primary--lg" @click="handleGoAnncPage">
        {{ t('common.button.confirm') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
