<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IBatchData } from '../types/batch-mgmt.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '../../../types/modal.ts'
import CustomTextarea from '../../../examples/components/custom-textarea/CustomTextarea.vue'
import BatchPopup from '../components/BatchPopup.vue'

const router = useRouter()
const { t } = useI18n()
const popupSignal = ref(false)
const batchId = ref('')
const deletedBatch = ref<string[]>([])
const popupMode = ref('')

const searchConditionOptions = [
  {
    value: 'batName',
    label: '배치 이름'
  },
  {
    value: 'batCode',
    label: '배치 코드'
  },
]
const kindStateOptions = [
  {
    value: 'all',
    label: '전체'
  },
  {
    value: 'year',
    label: '년'
  },
  {
    value: 'month',
    label: '월'
  },
  {
    value: 'day',
    label: '일'
  },
  {
    value: 'minute',
    label: '분'
  },
]
const mockupList = ref([
  {
    batSeq: '1',
    rowNum: '1',
    batName: '배치 이름1',
    batTp: '일',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    batSeq: '2',
    rowNum: '2',
    batName: '배치 이름2',
    batTp: '일',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    batSeq: '3',
    rowNum: '3',
    batName: '배치 이름3',
    batTp: '일',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    batSeq: '4',
    rowNum: '4',
    batName: '배치 이름4',
    batTp: '일',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    batSeq: '5',
    rowNum: '5',
    batName: '배치 이름5',
    batTp: '일',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'batName',
  batTp: 'all',
  keyword: '',
  currentPage: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  batTp: '',
  keyword: '',
  currentPage: 1,
})
const totalCount = ref(0)
const batchList = ref<IBatchData[]>([])

const getParams = (searchParam: ISearchParams) => {
  const params = {
    searchCondition: searchParam.searchCondition,
    batTp: searchParam.batTp,
    keyword: searchParam.keyword,
    currentPage: searchParam.currentPage,
  }
  return params
}

const changePage = async (newPage: number) => {
  searchedParam.currentPage = newPage
  searchParam.currentPage = newPage
  const params = getParams(searchedParam)
  getBatchList(params)
}

const handleReset = () => {
  searchParam.searchCondition = 'name',
    searchParam.batTp = 'all',
    searchParam.keyword = ''
}

const getBatchList = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/batch/list',
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
  searchedParam.batTp = searchParam.batTp
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.currentPage = 1
  searchParam.currentPage = 1
  getBatchList(params)
}

const handleCreateBatch = () => {
  batchId.value = ''
  popupSignal.value = true
  popupMode.value = 'Create'
}

const handleBatchDetail = (data: IUserData) => {
  batchId.value = data.batSeq
  popupSignal.value = true
  popupMode.value = 'Detail'
}

const handleCancel = () => {
  popupSignal.value = false
}

const handleUpdateBatch = (data) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/batch/delete',
    //   {batSeqList},
    // })
    console.log('수정 or 등록', data)
  }
  catch (error) {
    console.error(error)
  }
}

const handleSelectionChange = (target: IBatchData[]) => {
  deletedBatch.value = Object.values(target).map(item => item.batSeq);
}

const handleDeleteBatch = () => {
  try {
    // FIXME: api 연결
    const batSeqList = Array.from(deletedBatch.value)
    // const res = await request({
    //   method: 'POST',
    //   url: '/batch/delete',
    //   {batSeqList},
    // })
    console.log(batSeqList)
    handleSearch()
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('batch.title') }}
    </h2>
    <SearchForm use-reset @search="handleSearch" @clear="handleReset">
      <SearchItem>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" />
        <CustomInput v-model="searchParam.keyword" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </SearchItem>
      <SearchItem :label="t('batch.label.kind')">
        <basic-select-box v-model="searchParam.batTp" :options="kindStateOptions" />
      </SearchItem>
    </SearchForm>
    <div class="content__box">
      <div class="table-header">
        <span class="table-header__total">
          {{ t('common.label.total') }} <em>{{ totalCount }}</em>{{ t('common.label.count') }}
        </span>
        <div class="table-header__btn">
          <button type="button" class="btn__secondary-line--md" @click="handleDeleteBatch">
            {{ t('common.button.delete') }}
          </button>
          <button type="button" class="btn__secondary--md" @click="handleCreateBatch">
            {{ t('common.button.create') }}
          </button>
        </div>
      </div>
      <el-table :data="batchList" style="width: 100%" @row-dblclick="handleBatchDetail"
        @selection-change="handleSelectionChange" :empty-text="t('common.label.no-data')">
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column prop="rowNum" :label="t('common.label.index')" min-width="50" align="center" />
        <el-table-column prop="batName" :label="t('batch.label.name')" min-width="150" align="center" />
        <el-table-column prop="batTp" :label="t('batch.label.kind')" min-width="150" align="center" />
        <el-table-column prop="crteDttm" :label="t('common.label.create-date')" min-width="150" align="center" />
      </el-table>
      <Pagination v-model="searchParam.currentPage" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
    <BatchPopup v-model:model-value="popupSignal" :batch-id="batchId" @cancel="handleCancel"
      @confirm="handleUpdateBatch" :popup-mode="popupMode" />
  </div>
</template>
<style></style>