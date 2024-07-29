<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IQnaCreate } from '../types/qna.ts'
import { useRouter } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import Editor from '~/components/Editor.vue'
import FileUpload from '~/components/FileUpload.vue'

const router = useRouter()
const { t } = useI18n()
const title = ref('')
const contents = ref<string | Delta>()
const attachedFile = ref<File>([])

const onEditorChange = (value: string) => {
  contents.value = value
}

const handleGoQnaPage = () => {
  router.push({ path: '/system/qna' })
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
      for (const x of formData) {
        console.log(x);
      };
    }
    else {
      data.value = {
        title: title.value,
        detail: contents,
      }
    }
    console.log('등록: ', data.value)
    // router.push({ path: '/system/qna' })
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
  <div>
    <h2 class="title">
      {{ t('qna.title') }} {{ t('common.button.create') }}
    </h2>
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
    <div class="content__btns">
      <button type="button" class="btn__secondary--lg" @click="handleGoQnaPage">
        {{ t('common.button.cancel') }}
      </button>
      <button type="button" class="btn__primary--lg" @click="handleCreateQna">
        {{ t('common.button.save') }}
      </button>
    </div>
  </div>
</template>
<style></style>