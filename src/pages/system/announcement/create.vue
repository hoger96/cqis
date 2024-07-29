<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IAnnouncementCreate } from '../types/announcement.ts'
import { useRouter } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import Editor from '~/components/Editor.vue'

const router = useRouter()
const { t } = useI18n()
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
        {{ t('annc.title') }} {{ t('common.button.create') }}
      </h2>
    </div>
    <div>
      <div class="form">
        <label class="form__label--required">{{ t('common.label.title') }}</label>
        <CustomInput v-model="title" />
      </div>
      <div class="form">
        <label class="form__label--required">{{ t('common.label.period') }}</label>
        <el-date-picker v-model="postingPeriod" type="daterange" range-separator="~" value-format="YYYY-MM-DD"
          :start-placeholder="t('common.label.start-date')" :end-placeholder="t('common.label.end-date')" />
      </div>
      <div>
        <label class="form__label--required">{{ t('common.label.content') }}</label>
        <Editor v-model:content="contents" toolbar="full" theme="snow"
          :placeholder="t('common.label.content-placeholder')" content-type="text" @change="onEditorChange" />
      </div>
      <FileUpload @file-change="onFileChange" />
    </div>
    <div class="mgmt__btn">
      <button type="button" class="btn__secondary--lg" @click="handleGoAnncPage">
        {{ t('common.button.cancel') }}
      </button>
      <button type="button" class="btn__primary--lg" @click="handleCreateAnnc">
        {{ t('common.button.save') }}
      </button>
    </div>
  </div>
</template>
<style></style>