<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IAnnouncementCreate } from '../types/announcement.ts'
import { useRouter } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import Editor from '../../components/Editor.vue'

const router = useRouter()

const title = ref('')
const postingPeriod = ref('')
const contents = ref<string | Delta>()

const onEditorChange = (value: string) => {
  contents.value = value
}

const handleGoAnncPage = () => {
  router.push({ path: '/system/announcement/admin-index' })
}

const handleCreateAnnc = () => {
  //FIXME: api 연결
  try {
    const data = ref({})
    if (attachedFile.value.length) {
      const formData = new FormData()
      formData.append('file', attachedFile.value[0])
      data.value = {
        title: title.value,
        startDate: postingPeriod.value[0],
        endDate: postingPeriod.value[1],
        detail: contents,
        file: formData
      }
    }
    else {
      data.value = {
        title: title.value,
        startDate: postingPeriod.value[0],
        endDate: postingPeriod.value[1],
        detail: contents,
      }
    }
    console.log('등록: ', data.value)
    router.push({ path: '/system/announcement/admin-index' })
  }
  catch (error) {
    console.error(error)
  }
}

const onFileChange = (file: File[]) => {
  attachedFile.value = file
}
</script>

<template>
  <div class="document">
    <div class="mb-4">
      <h2 class="mgmt__title">
        공지사항 등록
      </h2>
    </div>
    <div>
      <div class="form">
        <label class="form__label--required">제목</label>
        <CustomInput v-model="title" />
      </div>
      <div class="form">
        <label class="form__label--required">게시기간</label>
        <el-date-picker v-model="postingPeriod" type="daterange" range-separator="~" value-format="YYYY-MM-DD"
          start-placeholder="시작일" end-placeholder="종료일" />
      </div>
      <div>
        <label class="form__label--required">내용</label>
        <Editor v-model:content="contents" toolbar="full" theme="snow" placeholder="내용을 입력해주세요." content-type="text"
          @change="onEditorChange" />
      </div>
      <FileUpload @file-change="onFileChange" />
    </div>
    <div class="mgmt__btn">
      <button type="button" class="btn__secondary--lg" @click="handleGoAnncPage">
        취소
      </button>
      <button type="button" class="btn__primary--lg" @click="handleCreateAnnc">
        저장
      </button>
    </div>
  </div>
</template>
<style></style>