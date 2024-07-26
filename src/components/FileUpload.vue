<script setup lang="ts">
import { IUploadProps } from '../examples/types/upload.ts'

const dropZoneRef = ref<HTMLDivElement>()
const attachedFile = ref<File>([])
const fileRef = ref<HTMLInputElement | null>(null)
const fileName = ref('')
const fileUrl = ref('')

const props = withDefaults(defineProps<IUploadProps>(), {
  show: true,
  file: []
})
const emit = defineEmits<{
  (e: 'file-change', file: File[]): void
}>()

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
  if (attachedFile.value.length > 0)
    fileName.value = attachedFile.value[0].name
}

const createDownloadLink = (file: File) => {
  const url = URL.createObjectURL(file);
  fileUrl.value = url;
};

const uploadFile = (e: Event | DragEvent, dropFile?: File[]) => {
  const target = e.target as HTMLInputElement
  const files = dropFile || Array.from(target.files)

  if (!files)
    return

  attachedFile.value = files as any
  setFileName()
  if (attachedFile.value.length > 0) {
    createDownloadLink(attachedFile.value[0]);
  }
  emit('file-change', attachedFile.value);
}

onMounted(() => {
  if (props.file) {
    attachedFile.value = props.file
    setFileName()
    if (attachedFile.value.length > 0) {
      createDownloadLink(attachedFile.value[0]);
    }
  }
})
</script>

<template>
  <div class="form">
    <label class="form__label">첨부파일</label>
    <div ref="dropZoneRef" class="form__upload">
      <button v-if="props.show" class="btn__secondary-line--md" @click="openFileUpload">
        파일첨부
      </button>
      <p v-if="props.show">파일을 드래그 앤 드롭 하거나 클릭하여 업로드하세요.</p>
      <a :href="fileUrl" :download="fileName" class="download-link">{{ fileName }}</a>
      <input id="file-upload" ref="fileRef" type="file" style="display: none;" @change="uploadFile">
    </div>
  </div>
</template>
