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
    value: 'name',
    label: '배치 이름'
  },
  {
    value: 'code',
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
    index: 1,
    batchId: 'batch_1',
    batchCode: 'B001',
    batchName: '배치 이름1',
    batchKind: '일',
    createDate: '2024-05-29'
  },
  {
    index: 2,
    batchId: 'batch_2',
    batchCode: 'B002',
    batchName: '배치 이름2',
    batchKind: '일',
    createDate: '2024-05-29'
  },
  {
    index: 3,
    batchId: 'batch_3',
    batchCode: 'B003',
    batchName: '배치 이름3',
    batchKind: '년',
    createDate: '2024-05-29'
  },
  {
    index: 4,
    batchId: 'batch_4',
    batchCode: 'B004',
    batchName: '배치 이름4',
    batchKind: '일',
    createDate: '2024-05-29'
  },
  {
    index: 5,
    batchId: 'batch_5',
    batchCode: 'B005',
    batchName: '배치 이름5',
    batchKind: '월',
    createDate: '2024-05-29'
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'name',
  batchKind: 'all',
  keyword: '',
  page: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  batchKind: '',
  keyword: '',
  page: 1,
})
const totalCount = ref(0)
const batchList = ref<IBatchData[]>([])

const getParams = (searchParam: ISearchParams) => {
  const params = {
    searchCondition: searchParam.searchCondition,
    batchKind: searchParam.batchKind,
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
    searchParam.batchKind = 'all',
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
  searchedParam.batchKind = searchParam.batchKind
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.page = 1
  searchParam.page = 1
  getBatchList(params)
}

const handleCreateBatch = () => {
  batchId.value = ''
  popupSignal.value = true
  popupMode.value = 'Create'
}

const handleBatchDetail = (data: IUserData) => {
  batchId.value = data.batchId
  popupSignal.value = true
  popupMode.value = 'Detail'
}

const handleCancel = () => {
  popupSignal.value = false
}

const handleUpdateBatch = (data) => {
  try {
    // FIXME: api 연결
    console.log(data)
    // const res = await request({
    //   method: 'POST',
    //   url: '/user/${userId.value}',
    //   userInfo,
    // })
    console.log('수정 or 등록')
  }
  catch (error) {
    console.error(error)
  }
}

const handleSelectionChange = (target: IBatchData[]) => {
  deletedBatch.value = target.map(i => i.batchId)
}

const handleDeleteBatch = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'DELETE',
    //   url: '/faq',
    //   deletedFaq.value,
    // })
    console.log(deletedBatch.value)
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
        <basic-select-box v-model="searchParam.batchKind" :options="kindStateOptions" />
      </SearchItem>
    </SearchForm>
    <div class="content__box">
      <div class="total">
        <span>
          {{ t('common.label.total') }} <em>{{ totalCount }}</em>{{ t('common.label.count') }}
        </span>
        <div class="flex">
          <button type="button" class="btn__secondary--md" @click="handleDeleteBatch">
            {{ t('common.button.delete') }}
          </button>
          <button type="button" class="btn__primary-line--md" @click="handleCreateBatch">
            {{ t('common.button.create') }}
          </button>
        </div>
      </div>
      <el-table :data="batchList" style="width: 100%" @row-dblclick="handleBatchDetail"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column prop="index" :label="t('common.label.index')" min-width="50" align="center" />
        <el-table-column prop="batchCode" :label="t('batch.label.code')" min-width="150" align="center" />
        <el-table-column prop="batchName" :label="t('batch.label.name')" min-width="150" align="center" />
        <el-table-column prop="batchKind" :label="t('batch.label.kind')" min-width="150" align="center" />
        <el-table-column prop="createDate" :label="t('common.label.create-date')" min-width="150" align="center" />
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
    <BatchPopup v-model:model-value="popupSignal" :batch-id="batchId" @cancel="handleCancel"
      @confirm="handleUpdateBatch" :popup-mode="popupMode" />
  </div>
</template>
<style></style>