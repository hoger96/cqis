<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import FileUpload from '../../../components/FileUpload.vue'
import Editor from '../../../components/Editor.vue'

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
  faqDispYn: '',
  crteUserId: '',
  crteDttm: '',
  updUserId: '',
  updDttm: '',
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
    //   method: 'POST',
    //   url: '/faq/detail'
    //   {faqSeq: faqId.value}
    // })
    const res = await {
      title: '[전사공지] 안전관리',
      faqDispYn: 'Y',
      crteUserId: '김영현',
      crteDttm: '2024-07-18',
      cont: '안전관리에 대하여 알려드리겠습니다.',
      fileList: new File([""], fileData.name, {
        type: fileData.type,
        lastModified: fileData.lastModified
      }),
      updDttm: '',
      updUserId: ''
    }
    return res
  }
  catch (error) {
    console.error(error)
  }
}

const setFaqDetail = async () => {
  const data = await getFaqDetail()
  if (data) {
    faqForm.title = data.title
    faqForm.faqDispYn = data.faqDispYn
    faqForm.crteUserId = data.crteUserId
    faqForm.crteDttm = data.crteDttm
    faqForm.updUserId = data.updUserId ? data.updUserId : '-'
    faqForm.updDttm = data.updDttm ? data.updDttm : '-'
    contents.value = data.cont
    if (data.fileList) {
      attachedFile.value = [data.fileList]
    }
    dataLoaded.value = true
  }
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
        faqSeq: faqId.value,
        title: faqForm.title,
        faqDispYn: faqForm.faqDispYn,
        cont: contents.value,
        fileList: formData
      }
    }
    else {
      data.value = {
        faqSeq: faqId.value,
        title: faqForm.title,
        faqDispYn: faqForm.faqDispYn,
        cont: contents.value,
      }
    }
    // FIXME: api 연결
    //  await request({
    //   method: 'POST',
    //   url: `/faq/update,
    //   data
    // })
    console.log('수정: ', data.value)
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
    <form class="form form__table">
      <FormItem :label="t('common.label.title')" :required="!updateMode">
        <CustomInput v-model="faqForm.title" :readonly="updateMode" />
      </FormItem>
      <FormItem :label="t('faq.label.output')">
        <el-checkbox v-model="faqForm.faqDispYn" :label="t('faq.label.out')" true-value="Y" false-value="N"
          :disabled="updateMode" />
      </FormItem>
      <FormItem :label="t('common.label.content')" :required="!updateMode" class="flex-1">
        <Editor v-model:content="contents" toolbar="full" theme="snow"
          :placeholder="t('common.label.content-placeholder')" content-type="text" @change="onEditorChange"
          :read-only="updateMode" />
      </FormItem>
      <FormItem v-if="dataLoaded" :label="t('common.label.file')">
        <FileUpload @file-change="onFileChange" :show="!updateMode" :file="attachedFile" />
      </FormItem>
      <div class="form__item">
        <FormItem :label="t('common.label.create-user')">
          <CustomInput v-model="faqForm.crteUserId" readonly />
        </FormItem>
        <FormItem :label="t('common.label.create-date')">
          <CustomInput v-model="faqForm.crteDttm" readonly />
        </FormItem>
      </div>
      <div class="form__item">
        <FormItem :label="t('common.label.update-user')">
          <CustomInput v-model="faqForm.updUserId" readonly />
        </FormItem>
        <FormItem :label="t('common.label.update-date')">
          <CustomInput v-model="faqForm.updDttm" readonly />
        </FormItem>
      </div>
    </form>
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
