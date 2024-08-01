<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IBatchData } from '../types/batch-history.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '../../types/modal.ts'
import CustomTextarea from '../../examples/components/custom-textarea/CustomTextarea.vue'
import BatchPopup from '../components/BatchPopup.vue'

const router = useRouter()
const { t } = useI18n()
const popupSignal = ref(false)
const batchId = ref('')
const deletedBatch = ref<string[]>([])
const popupMode = ref('')
const batchPeriod = ref('')

const searchConditionOptions = [
  {
    value: 'name',
    label: '배치 이름'
  },
  {
    value: 'code',
    label: '배치 코드'
  },
]
const batchStateOptions = [
  {
    value: 'all',
    label: '전체'
  },
  {
    value: 'complete',
    label: '완료'
  },
  {
    value: 'wait',
    label: '대기'
  },
  {
    value: 'fail',
    label: '실패'
  },
  {
    value: 'processing',
    label: '진행중'
  },
]
const mockupList = ref([
  {
    index: 1,
    batchId: 'batch_1',
    batchCode: 'B001',
    batchName: '배치 이름1',
    batchState: 'complete',
    startDate: '2024-05-29',
    endDate: '2024-06-05',
    count: 1000
  },
  {
    index: 2,
    batchId: 'batch_2',
    batchCode: 'B002',
    batchName: '배치 이름2',
    batchState: 'fail',
    startDate: '2024-05-29',
    endDate: '',
    count: 0
  },
  {
    index: 3,
    batchId: 'batch_3',
    batchCode: 'B003',
    batchName: '배치 이름3',
    batchState: 'processing',
    startDate: '2024-05-29',
    endDate: '',
    count: 0
  },
  {
    index: 4,
    batchId: 'batch_4',
    batchCode: 'B004',
    batchName: '배치 이름4',
    batchState: 'wait',
    startDate: '2024-05-29',
    endDate: '',
    count: 0
  },
  {
    index: 5,
    batchId: 'batch_5',
    batchCode: 'B005',
    batchName: '배치 이름5',
    batchState: 'fail',
    startDate: '2024-05-29',
    endDate: '',
    count: 0
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'name',
  batchState: 'all',
  batchPeriod: '',
  keyword: '',
  page: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  batchState: '',
  batchPeriod: '',
  keyword: '',
  page: 1,
})
const totalCount = ref(0)
const batchList = ref<IBatchData[]>([])

const getParams = (searchParam: ISearchParams) => {
  const params = {
    searchCondition: searchParam.searchCondition,
    batchState: searchParam.batchState,
    batchPeriod: searchParam.batchPeriod,
    keyword: searchParam.keyword,
    page: searchParam.page,
  }
  return params
}

const changePage = async (newPage: number) => {
  searchedParam.page = newPage
  searchParam.page = newPage
  const params = getParams(searchedParam)
  getBatchList(params)
}

const handleReset = () => {
  searchParam.searchCondition = 'name',
    searchParam.batchState = 'all',
    searchParam.batchPeriod = '',
    searchParam.keyword = ''
}

const getBatchList = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/qna',
    //   params,
    // })
    batchList.value = mockupList.value
    totalCount.value = batchList.value.length
  }
  catch (error) {
    console.error(error)
  }
}

const handleSearch = () => {
  searchedParam.searchCondition = searchParam.searchCondition
  searchedParam.batchState = searchParam.batchState
  searchedParam.batchPeriod = searchParam.batchPeriod
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.page = 1
  searchParam.page = 1
  getBatchList(params)
}

const handleRestart = (batchId: string) => {
  console.log(batchId)
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('batch-history.title') }}
    </h2>
    <SearchForm use-reset @search="handleSearch" @clear="handleReset">
      <SearchItem>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" />
        <CustomInput v-model="searchParam.keyword" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </SearchItem>
      <SearchItem :label="t('batch-history.label.state')">
        <basic-select-box v-model="searchParam.batchState" :options="batchStateOptions" />
      </SearchItem>
      <SearchItem :label="t('batch-history.label.date-range')">
        <el-date-picker v-model="searchParam.batchPeriod" type="daterange" range-separator="~" value-format="YYYY-MM-DD"
          :start-placeholder="t('common.label.start-date')" :end-placeholder="t('common.label.end-date')" />
      </SearchItem>
    </SearchForm>
    <div class="content__box">
      <div class="total__bar">
        <span class="total">
          {{ t('common.label.total') }} <em>{{ totalCount }}</em>{{ t('common.label.count') }}
        </span>
      </div>
      <el-table :data="batchList" style="width: 100%">
        <el-table-column prop="index" :label="t('common.label.index')" min-width="50" align="center" />
        <el-table-column prop="batchCode" :label="t('batch.label.code')" min-width="150" align="center" />
        <el-table-column prop="batchName" :label="t('batch.label.name')" min-width="150" align="center" />
        <el-table-column prop="batchState" :label="t('batch-history.label.state')" min-width="100" align="center">
          <template v-slot="scope">
            <p>
              {{ scope.row.batchState === 'complete' ? t('batch-history.label.complete') : scope.row.batchState ===
                'fail' ? t('batch-history.label.fail') : scope.row.batchState === 'wait' ? t('batch-history.label.wait') :
                t('batch-history.label.processing') }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="startDate" :label="t('batch-history.label.start-date')" min-width="150" align="center" />
        <el-table-column prop="endDate" :label="t('batch-history.label.end-date')" min-width="150" align="center" />
        <el-table-column prop="count" :label="t('batch-history.label.count')" min-width="150" align="center">
          <template v-slot="scope">
            <p>
              {{ scope.row.count === 0 ? '' : scope.row.count }}
            </p>
          </template>
        </el-table-column>
        <el-table-column :label="t('batch-history.label.restart')" min-width="100" align="center">
          <template #default="scope">
            <button v-if="scope.row.batchState === 'fail'" class="btn__secondary--sm"
              @click="handleRestart(scope.row.batchId)">
              {{ t('batch-history.label.restart') }}
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