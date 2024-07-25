<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CustomInput from '../../components/CustomInput.vue'
import CustomTextarea from '../../examples/components/custom-textarea/CustomTextarea.vue'

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
  router.push({ path: '/annc' })
}

onMounted(() => {
  setAnncDetail()
})
</script>

<template>
  <div class="document">
    <div class="mb-4">
      <h2 class="mgmt__title">
        공지사항
      </h2>
    </div>
    <div class="mgmt__box">
      <div class="form">
        <label class="form__label">제목</label>
        <CustomInput v-model="anncForm.title" readonly />
      </div>
      <div class="form">
        <label class="form__label--required">게시기간</label>
        <el-date-picker v-model="anncForm.postingPeriod" type="daterange" range-separator="~" value-format="YYYY-MM-DD"
          start-placeholder="시작일" end-placeholder="종료일" readonly />
      </div>
      <div class="form">
        <label class="form__label">등록자</label>
        <CustomInput v-model="anncForm.createUser" readonly />
      </div>
      <div class="form">
        <label class="form__label">등록일자</label>
        <CustomInput v-model="anncForm.createDate" readonly />
      </div>
      <div class="form">
        <label class="form__label">수정자</label>
        <CustomInput v-model="anncForm.updateUser" readonly />
      </div>
      <div class="form">
        <label class="form__label">수정일자</label>
        <CustomInput v-model="anncForm.updateDate" readonly />
      </div>
      <div class="form">
        <label class="form__label">첨부파일</label>
        <CustomInput v-model="anncForm.file" readonly />
      </div>
      <div>
        <label class="form__label">내용</label>
        <Editor v-model:content="anncForm.detail" toolbar="full" theme="snow" placeholder="내용을 입력해주세요."
          content-type="text" @change="onEditorChange" :read-only="true" />
      </div>
    </div>
    <div class="mgmt__btn">
      <button type="button" class="btn__primary--lg" @click="handleGoAnncPage">
        확인
      </button>
    </div>
  </div>
</template>

<style scoped></style>
