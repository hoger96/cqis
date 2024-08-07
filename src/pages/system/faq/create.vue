<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { IFaqCreate } from '../types/faq.ts'
import type { Delta } from '@vueup/vue-quill'
import Editor from '../../../components/Editor.vue'
import FileUpload from '../../../components/FileUpload.vue'

const router = useRouter()
const { t } = useI18n()
const contents = ref<string | Delta>()
const attachedFile = ref<File[]>([])

const faqForm = reactive<IFaqCreate>({
  title: '',
  faqDispYn: 'N',
})

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
      attachedFile.value.forEach(i => {
        formData.append('file', i)
      })
      data.value = {
        title: faqForm.title,
        faqDispYn: faqForm.faqDispYn,
        cont: contents.value,
        fileList: formData
      }
    }
    else {
      data.value = {
        title: faqForm.title,
        faqDispYn: faqForm.faqDispYn,
        cont: contents.value,
      }
    }
    //  await request({
    //   method: 'POST',
    //   url: '/faq/insert',
    //   data.value
    // })
    console.log('등록: ', data.value)
    router.push({ path: '/system/faq/admin-index' })
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
      {{ t('faq.admin-title') }}{{ t('common.button.create') }}
    </h2>
    <form class="form form__table">
      <FormItem :label="t('common.label.title')" required>
        <CustomInput v-model="faqForm.title" />
      </FormItem>
      <FormItem :label="t('faq.label.output')">
        <el-checkbox v-model="faqForm.faqDispYn" :label="t('faq.label.out')" true-value="Y" false-value="N" />
      </FormItem>
      <FormItem :label="t('common.label.content')" required class="flex-1">
        <Editor v-model:content="contents" toolbar="full" theme="snow"
          :placeholder="t('common.label.content-placeholder')" content-type="text" @change="onEditorChange" />
      </FormItem>
      <FormItem :label="t('common.label.file')">
        <FileUpload @file-change="onFileChange" />
      </FormItem>
    </form>
    <div class="content__btns">
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