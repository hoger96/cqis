<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'
import LineagePopup from '../../components/LineagePopup.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const updateMode = ref(false)
const datasetId = ref(route.params.id)
const popupSignal = ref(false)
const lineageId = ref('')

const dataset = reactive({
  name: '',
  description: '',
  use: 'Y'
})
const tableList = ref<[]>([''])

const handleGetDataset = () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: `/dataset-visual/${datasetId.value}`
    // })
    const res = {
      name: '데이터셋1',
      description: '데이터셋1 입니다.',
      tableList: ['테이블1', '테이블2'],
      use: 'N'
    }

    return res
  }
  catch (error) {
    console.error(error)
  }
}

const handleSetDataset = () => {
  const data = handleGetDataset()
  dataset.name = data.name
  dataset.description = data.description
  tableList.value = data.tableList
  dataset.use = data.use
  lineageId.value = data.lineageId
}

const handleUpdateDataset = () => {
  try {
    const data = {
      name: dataset.name,
      description: dataset.description,
      tableList: tableList.value,
      use: dataset.use,
    }
    // const res = await request({
    //   method: 'POST',
    //   url: `/dataset-visual/${datasetId.value}`,
    //   data
    // })
    console.log('수정: ', data)
    router.push({ path: '/admin/pages/data-visual' })
  } catch (error) {
    console.error(error)
  }
}

const handleAddTable = (index: number) => {
  tableList.value.push('')
}

const handleRemoveTable = (index: number) => {
  if (tableList.value.length > 1) {
    tableList.value.splice(index, 1)
  }
}

const handleChangeMode = () => {
  updateMode.value = false
}

const handleUpdateMode = () => {
  updateMode.value = true
}

const handleGoDatasetPage = () => {
  router.push({ path: '/admin/pages/data-visual' })
}

const handleLineagePopup = () => {
  popupSignal.value = true
}

const handleCancel = () => {
  popupSignal.value = false
}

onMounted(() => {
  if (datasetId) {
    handleSetDataset()
  }
})
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      {{ t('data-set.title') }} {{ t('common.label.detail') }}
    </h2>
    <div class="my-10">
      <form class="form">
        <FormItem :label="t('data-visual.label.app-name')" :required="updateMode">
          <CustomInput v-model="dataset.name" :placeholder="t('data-visual.placeholder.app-name')"
            :readonly="!updateMode" />
        </FormItem>
        <FormItem :label="t('data-visual.label.app-description')" :required="updateMode">
          <CustomTextarea v-model="dataset.description" :placeholder="t('data-visual.placeholder.app-description')"
            :readonly="!updateMode" />
        </FormItem>
        <FormItem :label="t('data-visual.label.table')" :required="updateMode">
          <div v-for="(table, index) in tableList" :key="index" class="flex">
            <CustomInput v-model="tableList[index]" :placeholder="t('data-visual.label.table')"
              :readonly="!updateMode" />
            <button v-if="index === 0 && updateMode" type="button" class="btn__secondary--sm"
              @click="handleAddTable(index)">
              {{ t('common.button.add') }}
            </button>
            <button v-if="tableList.length > 1 && updateMode" type="button" class="btn__secondary--sm"
              @click="handleRemoveTable(index)">
              {{ t('common.button.delete') }}
            </button>
          </div>
        </FormItem>
        <FormItem :label="t('common.search-bar.use')" :required="updateMode">
          <el-radio-group v-model="dataset.use" :disabled="!updateMode">
            <el-radio value="Y">
              {{ t('common.label.use-yes') }}
            </el-radio>
            <el-radio value="N">
              {{ t('common.label.use-no') }}
            </el-radio>
          </el-radio-group>
        </FormItem>
      </form>
    </div>
    <div class="mgmt__btn">
      <button v-if="!updateMode" type="button" class="btn__secondary--lg" @click="handleLineagePopup">
        {{ t('data-visual.label.lineage') }}
      </button>
      <button v-if="!updateMode" type="button" class="btn__secondary--lg" @click="handleGoDatasetPage">
        {{ t('common.button.cancel') }}
      </button>
      <button v-if="!updateMode" type="button" class="btn__primary--lg" @click="handleUpdateMode">
        {{ t('common.button.update') }}
      </button>
      <button v-if="updateMode" type="button" class="btn__secondary--lg" @click="handleChangeMode">
        {{ t('common.button.cancel') }}
      </button>
      <button v-if="updateMode" type="button" class="btn__primary--lg" @click="handleUpdateDataset">
        {{ t('common.button.save') }}
      </button>
    </div>
    <LineagePopup v-model:model-value="popupSignal" :lineage-id="lineageId" @cancel="handleCancel" />
  </div>
</template>
<style></style>