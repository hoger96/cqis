<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IFaqCreate } from '../types/faq.ts'
import { useRouter } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import Editor from '../../components/Editor.vue'
import FileUpload from '../../components/FileUpload.vue'

const router = useRouter()

const title = ref('')
const contents = ref<string | Delta>()

const onEditorChange = (value: string) => {
  contents.value = value
}

const handleGoFaqPage = () => {
  router.push({ path: '/admin/faq' })
}

const handleCreateFaq = () => {
  //FIXME: api 연결
  try {
    const data = ref({})
    if (attachedFile.value.length) {
      const formData = new FormData()
      formData.append('file', attachedFile.value[0])
      data.value = {
        title: title.value,
        detail: contents,
        file: formData
      }
    }
    else {
      data.value = {
        title: title.value,
        detail: contents,
      }
    }
    console.log('등록: ', data.value)
    //router.push({ path: '/admin/faq' })
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
        FAQ 등록 관리자
      </h2>
    </div>
    <div>
      <div class="form">
        <label class="form__label--required">제목</label>
        <CustomInput v-model="title" />
      </div>
      <div>
        <label class="form__label--required">내용</label>
        <Editor v-model:content="contents" toolbar="full" theme="snow" placeholder="내용을 입력해주세요." content-type="text"
          @change="onEditorChange" />
      </div>
      <FileUpload @file-change="onFileChange" />
    </div>
    <div class="mgmt__btn">
      <button type="button" class="btn__secondary--lg" @click="handleGoFaqPage">
        취소
      </button>
      <button type="button" class="btn__primary--lg" @click="handleCreateFaq">
        저장
      </button>
    </div>
  </div>
</template>
<style></style>