<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CustomInput from '~/components/CustomInput.vue'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const anncId = ref(route.params.id)
const updateMode = ref(true)
const contents = ref<string | Delta>()
const attachedFile = ref<File[]>([])
const dataLoaded = ref(false)

const anncForm = reactive<IAnnouncementDetail>({
  title: '',
  createUser: '',
  createDate: '',
  updateUser: '',
  updateDate: '',
  postingPeriod: '',
})

const fileData = {
  lastModified: 1721021632831,
  lastModifiedDate: 'Mon Jul 15 2024 14: 33: 52 GMT +0900(한국 표준시)',
  name: '호걸가계부.xlsx',
  size: 14083,
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  webkitRelativePath: ''
};

const getAnncDetail = async () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: `/annc/${anncId.value}`
    // })
    const res = await {
      title: '[전사공지] 안전관리',
      createUser: '김영현',
      createDate: '2024-07-18',
      detail: '안전관리에 대하여 알려드리겠습니다.',
      startDate: '2024-07-18',
      endDate: '2024-07-24',
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

const setAnncDetail = async () => {
  const data = await getAnncDetail()
  const period = [data.startDate, data.endDate]
  anncForm.title = data.title
  anncForm.createUser = data.createUser
  anncForm.createDate = data.createDate
  anncForm.updateUser = data.updateUser ? data.updateUser : '-'
  anncForm.updateDate = data.updateDate ? data.updateDate : '-'
  contents.value = data.detail
  anncForm.postingPeriod = period
  if (data.file) {
    attachedFile.value = [data.file]
  }
  dataLoaded.value = true
}

const onEditorChange = (value: string) => {
  contents.value = value
}

const onFileChange = (file: File[]) => {
  attachedFile.value = file
}

const handleUpdateAnnc = () => {
  //FIXME: api 연결
  try {
    const data = ref({})
    if (attachedFile.value.length) {
      const formData = new FormData()
      formData.append('file', attachedFile.value[0])
      data.value = {
        title: anncForm.title,
        startDate: String(anncForm.postingPeriod[0]),
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
    updateMode.value = true
    setAnncDetail()
  }
  catch (error) {
    console.error(error)
  }
}

const handleChangeUpdateMode = () => {
  updateMode.value = false
}

const handleGoAnncPage = () => {
  router.push({ path: '/system/announcement/admin-index' })
}

const handleCancel = () => {
  updateMode.value = true
}

onMounted(async () => {
  await setAnncDetail()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('annc.admin-title') }}
    </h2>
    <div class="content__box">
      <form class="form">
        <FormItem :label="t('common.label.title')" :required="!updateMode">
          <CustomInput v-model="anncForm.title" :readonly="updateMode" />
        </FormItem>
        <FormItem :label="t('common.label.period')" :required="!updateMode">
          <el-date-picker v-model="anncForm.postingPeriod" type="daterange" range-separator="~"
            value-format="YYYY-MM-DD" :start-placeholder="t('common.label.start-date')"
            :end-placeholder="t('common.label.end-date')" :readonly="updateMode" />
        </FormItem>
        <FormItem :label="t('common.label.create-user')" :required="!updateMode">
          <CustomInput v-model="anncForm.createUser" readonly />
        </FormItem>
        <FormItem :label="t('common.label.create-date')" :required="!updateMode">
          <CustomInput v-model="anncForm.createDate" readonly />
        </FormItem>
        <FormItem :label="t('common.label.update-user')" :required="!updateMode">
          <CustomInput v-model="anncForm.updateUser" readonly />
        </FormItem>
        <FormItem :label="t('common.label.update-date')" :required="!updateMode">
          <CustomInput v-model="anncForm.updateDate" readonly />
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
      <button v-if="updateMode" type="button" class="btn__secondary-line--lg" @click="handleGoAnncPage">
        {{ t('common.button.cancel') }}
      </button>
      <button v-if="updateMode" type="button" class="btn__primary--lg" @click="handleChangeUpdateMode">
        {{ t('common.button.update') }}
      </button>
      <button v-if="!updateMode" type="button" class="btn__secondary-line--lg" @click="handleCancel">
        {{ t('common.button.cancel') }}
      </button>
      <button v-if="!updateMode" type="button" class="btn__primary--lg" @click="handleUpdateAnnc">
        {{ t('common.button.confirm') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
