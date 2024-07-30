<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IDatasetVisualData } from '../types/data-visual.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const deletedDataset = ref<string[]>([])
const searchConditionOptions = [
  {
    value: 'datasetName',
    label: '데이터셋 명'
  },
  {
    value: 'type',
    label: '타입'
  },
]
const mockupList = ref([
  {
    index: 1,
    datasetId: 'dataset_1',
    datasetName: '데이터셋 상세정보1',
    job: '로그 데이터셋',
    use: 'Y',
    createDate: '2024-07-18',
    lineageId: 'lineage_1'
  },
  {
    index: 2,
    datasetId: 'dataset_2',
    datasetName: '데이터셋 상세정보2',
    job: '로그 데이터셋',
    use: 'Y',
    createDate: '2024-07-18',
    lineageId: 'lineage_2'
  },
  {
    index: 3,
    datasetId: 'dataset_3',
    datasetName: '데이터셋 상세정보3',
    job: '통계 데이터셋',
    use: 'Y',
    createDate: '2024-07-18',
    lineageId: 'lineage_3'
  },
  {
    index: 4,
    datasetId: 'dataset_4',
    datasetName: '데이터셋 상세정보4',
    job: '로그 데이터셋',
    use: 'Y',
    createDate: '2024-07-18',
    lineageId: 'lineage_4'
  },
  {
    index: 5,
    datasetId: 'dataset_5',
    datasetName: '데이터셋 상세정보5',
    job: '로그 데이터셋',
    use: 'Y',
    createDate: '2024-07-18',
    lineageId: 'lineage_5'
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'datasetName',
  keyword: '',
  page: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  keyword: '',
  page: 1,
})
const totalCount = ref(0)
const dataSetList = ref<IDatasetVisualData[]>([])

const getParams = (searchParam: ISearchParams) => {
  const params = {
    searchCondition: searchParam.searchCondition,
    keyword: searchParam.keyword,
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
  searchParam.searchCondition = 'datasetName'
  searchParam.keyword = ''
}

const getDatasetVisualList = (params: ISearchParams) => {
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
  searchedParam.searchCondition = searchParam.searchCondition
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.page = 1
  searchParam.page = 1
  getDatasetVisualList(params)
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
  router.push({ path: '/admin/pages/data-visual/create' })
}

const handleDataSetDetail = (data) => {
  router.push({ path: `/admin/pages/data-visual/${data.datasetId}` })
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('data-visual.title') }}
    </h2>
    <SearchForm use-reset @search="handleSearch" @clear="handleReset">
      <SearchItem :label="t('data-set.label.data-set')">
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" />
      </SearchItem>
      <SearchItem :label="t('common.search-bar.keyword')">
        <CustomInput v-model="searchParam.keyword" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </SearchItem>
    </SearchForm>
    <div class="content__box">
      <div class="total__bar">
        <span class="total">
          {{ t('common.label.total') }} <em>{{ totalCount }}</em>{{ t('common.label.count') }}
        </span>
        <div class="flex">
          <button type="button" class="btn__secondary--md" @click="handleDeleteDataset">
            {{ t('common.label.use-no') }}
          </button>
          <button type="button" class="btn__primary-line--md" @click="handleCreateDataSet">
            {{ t('common.button.create') }}
          </button>
        </div>
      </div>
      <el-table :data="dataSetList" style="width: 100%" @row-dblclick="handleDataSetDetail"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="index" :label="t('common.label.index')" min-width="50" align="center" />
        <el-table-column prop="datasetName" :label="t('data-set.label.data-set')" min-width="150" align="center" />
        <el-table-column prop="job" :label="t('data-visual.label.job')" min-width="150" align="center" />
        <el-table-column prop="use" :label="t('common.search-bar.use')" min-width="150" align="center" />
        <el-table-column prop="createDate" :label="t('common.label.create-date')" min-width="100" align="center" />
        <el-table-column prop="lineage" :label="t('data-visual.label.lineage')" min-width="150" align="center">
          <template #default="scope">
            <button class="btn__secondary--sm" @click="handleLineagePopup(scope.lineageId)">
              리니지
            </button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>
<style></style>