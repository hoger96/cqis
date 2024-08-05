<script setup lang="ts">
import { IUploadProps } from '../examples/types/upload.ts'

const { t } = useI18n()

const dropZoneRef = ref<HTMLDivElement>()
const attachedFile = ref<File>([])
const fileRef = ref<HTMLInputElement | null>(null)
const fileName = ref('')
const fileExtension = ref('')
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
  if (attachedFile.value.length > 0) {
    const fullName = attachedFile.value[0].name
    const lastDotIndex = fullName.lastIndexOf('.')
    fileName.value = fullName.slice(0, lastDotIndex)
    fileExtension.value = fullName.slice(lastDotIndex + 1)
  }
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
  <div class="form__upload">
    <div v-if="props.show" ref="dropZoneRef" class="form__upload-area">
      <button type="button" @click="openFileUpload">
        <icon name="file__line--bbb" width="32" height="32" :alt="t('common.button.file')" />
      </button>
      <p class="mt-2">{{ t('common.label.file-placeholder') }}</p>
      <input id="file-upload" ref="fileRef" type="file" style="display: none;" @change="uploadFile">
    </div>
    <div v-if="fileName.length > 0" class="form__upload--file">
      <Icon class="mr-1" :name="`file__${fileExtension}`" :key="fileExtension" width="16" height="16" alt=""
        area-hidden="true" />
      <a :href="fileUrl" :download="fileName">{{ fileName }}.{{ fileExtension }}</a>
    </div>
  </div>
</template>
