<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import FileUpload from '~/components/FileUpload.vue'
import Editor from '~/components/Editor.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const faqId = ref(route.params.id)
const updateMode = ref(true)
const contents = ref<string | Delta>()
const attachedFile = ref<File[]>([])
const dataLoaded = ref(false)

const faqForm = reactive({
  title: '',
  createUser: '',
  createDate: '',
  updateUser: '',
  updateDate: '',
})

const fileData = {
  lastModified: 1721021632831,
  lastModifiedDate: 'Mon Jul 15 2024 14: 33: 52 GMT +0900(한국 표준시)',
  name: '호걸가계부.xlsx',
  size: 14083,
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  webkitRelativePath: ''
};

const getFaqDetail = async () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: `/faq/${faqId.value}`
    // })
    const res = await {
      title: '[전사공지] 안전관리',
      createUser: '김영현',
      createDate: '2024-07-18',
      detail: '안전관리에 대하여 알려드리겠습니다.',
      file: new File([""], fileData.name, {
        type: fileData.type,
        lastModified: fileData.lastModified
      })
    }
    return res
  }
  catch (error: Error) {
    console.error(error)
  }
}

const setFaqDetail = async () => {
  const data = await getFaqDetail()
  faqForm.title = data.title
  faqForm.createUser = data.createUser
  faqForm.createDate = data.createDate
  faqForm.updateUser = data.updateUser ? data.updateUser : '-'
  faqForm.updateDate = data.updateDate ? data.updateDate : '-'
  contents.value = data.detail
  if (data.file) {
    attachedFile.value = [data.file]
  }
  dataLoaded.value = true
}

const onEditorChange = (value: string) => {
  contents.value = value
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

const onFileChange = (file: File[]) => {
  attachedFile.value = file
}

const handleChangeUpdateMode = () => {
  updateMode.value = false
}

const handleGoFaqPage = () => {
  router.push({ path: '/system/faq/admin-index' })
}

const handleCancel = () => {
  updateMode.value = true
}

onMounted(async () => {
  await setFaqDetail()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('faq.admin-title') }}
    </h2>
    <div class="content__box">
      <form class="form">
        <FormItem :label="t('common.label.title')" :required="!updateMode">
          <CustomInput v-model="faqForm.title" :readonly="updateMode" />
        </FormItem>
        <FormItem :label="t('common.label.create-user')" :required="!updateMode">
          <CustomInput v-model="faqForm.createUser" readonly />
        </FormItem>
        <FormItem :label="t('common.label.create-date')" :required="!updateMode">
          <CustomInput v-model="faqForm.createDate" readonly />
        </FormItem>
        <FormItem :label="t('common.label.update-user')" :required="!updateMode">
          <CustomInput v-model="faqForm.updateUser" readonly />
        </FormItem>
        <FormItem :label="t('common.label.update-date')" :required="!updateMode">
          <CustomInput v-model="faqForm.updateDate" readonly />
        </FormItem>
        <FormItem v-if="dataLoaded" :label="t('common.label.file')">
          <FileUpload @file-change="onFileChange" :show="!updateMode" :file="attachedFile" />
        </FormItem>
        <FormItem :label="t('common.label.content')" :required="!updateMode">
          <Editor v-model:content="contents" toolbar="full" theme="snow"
            :placeholder="t('common.label.content-placeholder')" content-type="text" @change="onEditorChange"
            :read-only="updateMode" />
        </FormItem>
      </form>
    </div>
    <div class="content__btns">
      <button v-if="updateMode" type="button" class="btn__secondary-line--lg" @click="handleGoFaqPage">
        {{ t('common.button.cancel') }}
      </button>
      <button v-if="updateMode" type="button" class="btn__primary--lg" @click="handleChangeUpdateMode">
        {{ t('common.button.update') }}
      </button>
      <button v-if="!updateMode" type="button" class="btn__secondary-line--lg" @click="handleCancel">
        {{ t('common.button.cancel') }}
      </button>
      <button v-if="!updateMode" type="button" class="btn__primary--lg" @click="handleUpdateFaq">
        {{ t('common.button.confirm') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
