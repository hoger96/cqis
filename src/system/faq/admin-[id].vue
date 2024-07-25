<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CustomInput from '../../components/CustomInput.vue'
import CustomTextarea from '../../examples/components/custom-textarea/CustomTextarea.vue'
import { IFaqDetail } from '../types/faq.ts'

const route = useRoute()
const router = useRouter()
const faqId = ref(route.params.id)
const updateMode = ref(true)
const contents = ref<string | Delta>()
const dropZoneRef = ref<HTMLDivElement>()
const attachedFile = ref<File>([])
const fileRef = ref<HTMLInputElement | null>(null)
const fileName = ref('')

const faqForm = reactive<IFaqDetail>({
  title: '',
  createUser: '',
  createDate: '',
  updateUser: '',
  updateDate: '',
  file: '',
})

const getFaqDetail = () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: `/faq/${faqId.value}`
    // })
    const res = {
      title: '[전사공지] 안전관리',
      createUser: '김영현',
      createDate: '2024-07-18',
      detail: '안전관리에 대하여 알려드리겠습니다.',
      file: '안전관리.pdf',
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
  faqForm.updateUser = data.updateUser ? data.updateUser : '-'
  faqForm.updateDate = data.updateDate ? data.updateDate : '-'
  contents.value = data.detail
  fileName.value = data.file
}

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

const uploadFile = (e: Event | DragEvent, dropFile?: File) => {
  const target = e.target as HTMLInputElement
  const files = dropFile || target.files

  if (!files)
    return

  attachedFile.value = files as any
  setFileName()
}


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

const handleUpdateFaq = () => {
  //FIXME: api 연결
  try {
    const data = ref({})
    if (attachedFile.value.length) {
      const formData = new FormData()
      formData.append('file', attachedFile.value[0])
      data.value = {
        title: faqForm.title,
        detail: contents,
        file: formData
      }
    }
    else {
      data.value = {
        title: faqForm.title,
        detail: contents,
      }
    }
    console.log('등록: ', data.value)
    updateMode.value = true
    setFaqDetail()
  }
  catch (error) {
    console.error(error)
  }
}

const handleChangeUpdateMode = () => {
  updateMode.value = false
}

const handleGoFaqPage = () => {
  router.push({ path: '/admin/faq' })
}

const handleCancel = () => {
  updateMode.value = true
}

onMounted(() => {
  setFaqDetail()
})
</script>

<template>
  <div class="document">
    <div class="mb-4">
      <h2 class="mgmt__title">
        FAQ 관리자
      </h2>
    </div>
    <div class="mgmt__box">
      <div class="form">
        <label :class="updateMode ? 'form__label' : 'form__label--required'">제목</label>
        <CustomInput v-model="faqForm.title" :readonly="updateMode" />
      </div>
      <div class="form">
        <label class="form__label">등록자</label>
        <CustomInput v-model="faqForm.createUser" readonly />
      </div>
      <div class="form">
        <label class="form__label">등록일자</label>
        <CustomInput v-model="faqForm.createDate" readonly />
      </div>
      <div class="form">
        <label class="form__label">수정자</label>
        <CustomInput v-model="faqForm.updateUser" readonly />
      </div>
      <div class="form">
        <label class="form__label">수정일자</label>
        <CustomInput v-model="faqForm.updateDate" readonly />
      </div>
      <div class="form">
        <label class="form__label">첨부파일</label>
        <div ref="dropZoneRef" class="form__upload">
          <button v-if="!updateMode" class="btn__secondary-line--md" @click="openFileUpload">
            파일첨부
          </button>
          <p v-if="!updateMode">파일을 드래그 앤 드롭 하거나 클릭하여 업로드하세요.</p>
          <p>{{ fileName }}</p>
          <input id="file-upload" ref="fileRef" type="file" style="display: none;" @change="uploadFile">
        </div>
      </div>
      <div>
        <label :class="updateMode ? 'form__label' : 'form__label--required'">내용</label>
        <Editor v-model:content="contents" toolbar="full" theme="snow" placeholder="내용을 입력해주세요." content-type="text"
          @change="onEditorChange" :read-only="updateMode" />
      </div>
    </div>
    <div class="mgmt__btn">
      <button v-if="updateMode" type="button" class="btn__secondary-line--lg" @click="handleGoFaqPage">
        취소
      </button>
      <button v-if="updateMode" type="button" class="btn__primary--lg" @click="handleChangeUpdateMode">
        수정
      </button>
      <button v-if="!updateMode" type="button" class="btn__secondary-line--lg" @click="handleCancel">
        취소
      </button>
      <button v-if="!updateMode" type="button" class="btn__primary--lg" @click="handleUpdateFaq">
        확인
      </button>
    </div>
  </div>
</template>

<style scoped></style>
