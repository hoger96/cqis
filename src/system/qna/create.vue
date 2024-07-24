<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IQnaCreate } from '../types/qna.ts'
import { useRouter } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import Editor from '../../components/Editor.vue'

const router = useRouter()

const title = ref('')
const contents = ref<string | Delta>()
const dropZoneRef = ref<HTMLDivElement>()
const attachedFile = ref<File>([])
const fileRef = ref<HTMLInputElement | null>(null)
const fileName = ref('')

const onEditorChange = (value: string) => {
  contents.value = value
}

const onDrop = (files: File[] | null, event: DragEvent) => {
  if (files) {
    uploadFile(event, files)
  }
}
useDropZone(dropZoneRef, {
  onDrop,
  // dataTypes: ['application/pdf', 'application/vnd.hancom.hwp', 'application/haansofthwp', 'application/x-hwp', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
})


const openFileUpload = (e: Event) => {
  if (fileRef.value !== null)
    fileRef.value.value = ''
  if (!fileRef.value)
    return e.preventDefault()
  fileRef.value.click()
}

const setFileName = () => {
  fileName.value = attachedFile.value[0].name
}

const uploadFile = (e: Event | DragEvent, dropFile?: File) => {
  const target = e.target as HTMLInputElement
  const files = dropFile || target.files

  if (!files)
    return

  attachedFile.value = files as any
  setFileName()
}

const handleGoQnaPage = () => {
  router.push({ path: '/qna' })
}

const handleCreateQna = () => {
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
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="document">
    <div class="mb-4">
      <h2 class="mgmt__title">
        Q&A 등록
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
      <div class="form">
        <label class="form__label">첨부파일</label>
        <div ref="dropZoneRef" class="form__upload">
          <button class="drop-area__upload" @click="openFileUpload">
            파일첨부
          </button>
          <p>파일을 드래그 앤 드롭 하거나 클릭하여 업로드하세요.</p>
          <input id="file-upload" ref="fileRef" type="file" style="display: none;" @change="uploadFile">
        </div>
        <div>
          {{ fileName }}
        </div>
      </div>
    </div>
    <div class="mgmt__btn">
      <button type="button" class="btn__secondary--lg" @click="handleGoQnaPage">
        취소
      </button>
      <button type="button" class="btn__primary--lg" @click="handleCreateQna">
        저장
      </button>
    </div>
  </div>
</template>
<style></style>