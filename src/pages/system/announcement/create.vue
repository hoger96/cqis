<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IAnnouncementCreate } from '../types/announcement.ts'
import { useRouter } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import Editor from '~/components/Editor.vue'

const router = useRouter()
const { t } = useI18n()
const contents = ref<string | Delta>()
const attachedFile = ref<File[]>([])

const anncForm = reactive<IAnnouncementDetail>({
  title: '',
  postingPeriod: '',
})

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
        title: anncForm.title,
        startDate: anncForm.postingPeriod[0],
        endDate: anncForm.postingPeriod[1],
        detail: contents,
        file: formData
      }
    }
    else {
      data.value = {
        title: anncForm.title,
        startDate: anncForm.postingPeriod[0],
        endDate: anncForm.postingPeriod[1],
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
  <div>
    <h2 class="title">
      {{ t('annc.title') }} {{ t('common.button.create') }}
    </h2>
    <div class="content__box">
      <form class="form">
        <FormItem :label="t('common.label.title')" required>
          <CustomInput v-model="anncForm.title" />
        </FormItem>
        <FormItem :label="t('common.label.period')" required>
          <el-date-picker v-model="anncForm.postingPeriod" type="daterange" range-separator="~"
            value-format="YYYY-MM-DD" :start-placeholder="t('common.label.start-date')"
            :end-placeholder="t('common.label.end-date')" />
        </FormItem>
        <FormItem :label="t('common.label.file')">
          <FileUpload @file-change="onFileChange" />
        </FormItem>
        <FormItem :label="t('common.label.content')" required>
          <Editor v-model:content="contents" toolbar="full" theme="snow"
            :placeholder="t('common.label.content-placeholder')" content-type="text" @change="onEditorChange" />
        </FormItem>
      </form>
    </div>
    <div class="content__btns">
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