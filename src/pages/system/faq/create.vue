<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IFaqCreate } from '../types/faq.ts'
import { useRouter } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import Editor from '~/components/Editor.vue'
import FileUpload from '~/components/FileUpload.vue'

const router = useRouter()
const { t } = useI18n()
const title = ref('')
const contents = ref<string | Delta>()

const onEditorChange = (value: string) => {
  contents.value = value
}

const handleGoFaqPage = () => {
  router.push({ path: '/system/faq/admin-index' })
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
        {{ t('faq.admin-title') }}{{ t('common.button.create') }}
      </h2>
    </div>
    <div>
      <div class="form">
        <label class="form__label--required">{{ t('common.label.title') }}</label>
        <CustomInput v-model="title" />
      </div>
      <div>
        <label class="form__label--required">{{ t('common.label.content') }}</label>
        <Editor v-model:content="contents" toolbar="full" theme="snow"
          :placeholder="t('common.label.content-placeholder')" content-type="text" @change="onEditorChange" />
      </div>
      <FileUpload @file-change="onFileChange" />
    </div>
    <div class="mgmt__btn">
      <button type="button" class="btn__secondary--lg" @click="handleGoFaqPage">
        {{ t('common.button.cancel') }}
      </button>
      <button type="button" class="btn__primary--lg" @click="handleCreateFaq">
        {{ t('common.button.confirm') }}
      </button>
    </div>
  </div>
</template>
<style></style>