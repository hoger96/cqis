<script setup lang="ts">
import Upload from '../components/upload/Upload.vue'

function fileSuccess(files: Resumable.ResumableFile[], response: string) {
  console.log(files)
  console.log(response)
}
</script>

<template>
  <div class="p-20">
    <h2 class="mb-10 text-3xl font-semibold">
      Upload/Download 예제
    </h2>
    <Upload progress-shown pause-button-shown @file-success="fileSuccess" />
    <!-- <Download /> -->
  </div>
</template>
