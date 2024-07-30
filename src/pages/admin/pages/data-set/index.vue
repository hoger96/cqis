<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IDatasetData } from '../types/data-set.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '../../types/modal.ts'
import CustomTextarea from '../../examples/components/custom-textarea/CustomTextarea.vue'
import UserPopup from '../components/UserPopup.vue'

const router = useRouter()
const { t } = useI18n()
const deletedDataset = ref<string[]>([])
const mockupList = ref([
  {
    index: 1,
    datasetId: 'dataset_1',
    datasetName: '데이터셋 상세정보1',
    targetTableName: '고객 가입 정보',
    targetPhysicalTableName: 'Y',
    job: '2024-07-18',
    period: '3시간'
  },
  {
    index: 2,
    datasetId: 'dataset_2',
    datasetName: '데이터셋 상세정보2',
    targetTableName: '냉장고 매출 정보',
    targetPhysicalTableName: 'Y',
    job: '2024-07-18',
    period: '3시간'
  },
  {
    index: 3,
    datasetId: 'dataset_3',
    datasetName: '데이터셋 상세정보3',
    targetTableName: '고객 CS 정보',
    targetPhysicalTableName: 'N',
    job: '2024-07-18',
    period: '3시간'
  },
  {
    index: 4,
    datasetId: 'dataset_4',
    datasetName: '데이터셋 상세정보4',
    targetTableName: '에어컨 매출 정보',
    targetPhysicalTableName: 'Y',
    job: '2024-07-18',
    period: '3시간'
  },
  {
    index: 5,
    datasetId: 'dataset_5',
    datasetName: '데이터셋 상세정보5',
    targetTableName: '스탠바이미 매출 정보',
    targetPhysicalTableName: 'Y',
    job: '2024-07-18',
    period: '3시간'
  }
])


const searchParam = reactive<ISearchParams>({
  datasetName: '',
  tableName: '',
  physicalTableName: '',
  job: '',
  columnName: '',
  page: 1,
})
const searchedParam = reactive<ISearchParams>({
  datasetName: '',
  tableName: '',
  physicalTableName: '',
  job: '',
  columnName: '',
  page: 1,
})
const totalCount = ref(0)
const dataSetList = ref<IDataSetData[]>([])

const getParams = (searchParam: ISearchParams) => {
  const params = {
    datasetName: searchParam.datasetName,
    tableName: searchParam.tableName,
    physicalTableName: searchParam.physicalTableName,
    job: searchParam.job,
    columnName: searchParam.columnName,
    page: searchParam.page,
  }
  return params
}

const changePage = async (newPage: number) => {
  searchedParam.page = newPage
  searchParam.page = newPage
  const params = getParams(searchedParam)
  getDataSetList(params)
}

const handleReset = () => {
  searchParam.datasetName = ''
  searchParam.tableName = ''
  searchParam.physicalTableName = ''
  searchParam.job = ''
  searchParam.columnName = ''
}

const getDataSetList = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/qna',
    //   params,
    // })
    dataSetList.value = mockupList.value
    totalCount.value = dataSetList.value.length
  }
  catch (error) {
    console.error(error)
  }
}

const handleSearch = () => {
  searchedParam.datasetName = searchParam.datasetName
  searchedParam.tableName = searchParam.tableName
  searchedParam.physicalTableName = searchParam.physicalTableName
  searchedParam.job = searchParam.job
  searchedParam.columnName = searchParam.columnName
  const params = getParams(searchedParam)
  params.page = 1
  searchParam.page = 1
  getDataSetList(params)
}

const handleDeleteDataset = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'DELETE',
    //   url: '/dataset',
    //   deletedDataset.value,
    // })
    console.log(deletedDataset.value)
    handleSearch()
  }
  catch (error) {
    console.error(error)
  }
}

const handleSelectionChange = (target: IDatasetData[]) => {
  deletedDataset.value = target.map(i => i.datasetId)
}

const handleCreateDataSet = () => {
  router.push({ path: '/admin/pages/data-set/create' })
}

const handleDataSetDetail = (data) => {
  router.push({ path: `/admin/pages/data-set/${data.datasetId}` })
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div class="data-source">
    <div class="mb-4">
      <h2 class="mgmt__title">
        {{ t('data-set.title') }}
      </h2>
    </div>
    <form class="form__search">
      <div class="form flex-1">
        <label class="form__label">{{ t('data-set.label.data-set') }}</label>
        <CustomInput v-model="searchParam.datasetName" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </div>
      <div class="form flex-1">
        <label class="form__label">{{ t('data-set.label.table') }}</label>
        <CustomInput v-model="searchParam.tableName" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </div>
      <div class="form flex-1">
        <label class="form__label">{{ t('data-set.label.physical-table') }}</label>
        <CustomInput v-model="searchParam.physicalTableName" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </div>
      <div class="form flex-1">
        <label class="form__label">{{ t('data-set.label.job') }}</label>
        <CustomInput v-model="searchParam.job" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </div>
      <div class="form flex-1">
        <label class="form__label">{{ t('data-set.label.column') }}</label>
        <CustomInput v-model="searchParam.column" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </div>
      <button type="button" class="ml-5 btn__secondary--md" @click="handleReset">
        {{ t('common.button.reset') }}
      </button>
      <button type="button" class="ml-5 btn__primary-line--md" @click="handleSearch">
        {{ t('common.button.search') }}
      </button>
    </form>
    <div class="flex">
      <span class="table__count">
        {{ t('common.label.total') }} <em>{{ totalCount }}</em>{{ t('common.label.count') }}
      </span>
      <button type="button" class="btn__secondary--md" @click="handleDeleteDataset">
        {{ t('common.button.delete') }}
      </button>
      <button type="button" class="btn__primary-line--md" @click="handleCreateDataSet">
        {{ t('common.button.create') }}
      </button>
    </div>
    <div class="mgmt__box">
      <el-table :data="dataSetList" style="width: 100%" @row-dblclick="handleDataSetDetail"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="index" :label="t('common.label.index')" min-width="50" align="center" />
        <el-table-column prop="datasetName" :label="t('data-set.label.data-set')" min-width="150" align="center" />
        <el-table-column prop="targetTableName" :label="t('data-set.table.table')" min-width="150" align="center" />
        <el-table-column prop="targetPhysicalTableName" :label="t('data-set.table.physical-table')" min-width="150"
          align="center" />
        <el-table-column prop="job" :label="t('data-set.label.job')" min-width="100" align="center" />
        <el-table-column prop="period" :label="t('data-set.table.period')" min-width="150" align="center" />
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>
<style></style>