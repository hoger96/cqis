<script setup lang="ts">
import Upload from '../components/upload/Upload.vue'

function fileSuccess(files: Resumable.ResumableFile[], response: string) {
  console.log(files)
  console.log(response)
}
</script>

<template>
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
</template>
