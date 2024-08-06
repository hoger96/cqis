<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, ICorData } from '../types/corporation.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '../../../types/modal.ts'
import CustomTextarea from '../../../examples/components/custom-textarea/CustomTextarea.vue'
import CorPopup from '../components/CorPopup.vue'

const router = useRouter()
const { t } = useI18n()
const corPopupSignal = ref(false)
const corId = ref('')
const deletedCor = ref<string[]>([])

const searchConditionOptions = [
  {
    value: 'name',
    label: '법인명'
  },
  {
    value: 'country',
    label: '국가'
  },
]
const stateOptions = [
  {
    value: 'sale',
    label: '판매'
  },
  {
    value: 'product',
    label: '생산'
  },
]
const mockupList = ref([
  {
    corId: 'cor_01',
    corName: '법인1',
    continent: '아시아',
    country: '한국',
    city: '서울',
    corState: 'sale',
    closeState: 'operate'
  },
  {
    corId: 'cor_02',
    corName: '법인2',
    continent: '아시아',
    country: '중국',
    city: '베이징',
    corState: 'product',
    closeState: 'operate'
  },
  {
    corId: 'cor_03',
    corName: '법인3',
    continent: '아시아',
    country: '베트남',
    city: '다낭',
    corState: 'sale',
    closeState: 'close'
  },
  {
    corId: 'cor_04',
    corName: '법인4',
    continent: '아시아',
    country: '호주',
    city: '시드니',
    corState: 'product',
    closeState: 'operate'
  },
  {
    corId: 'cor_05',
    corName: '법인5',
    continent: '아시아',
    country: '홍콩',
    city: '란콰이펑',
    corState: 'sale',
    closeState: 'close'
  },
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'name',
  corState: 'sale',
  keyword: '',
  page: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  corState: '',
  keyword: '',
  page: 1,
})
const totalCount = ref(0)
const corList = ref<ICorData[]>([])

const getParams = (searchParam: ISearchParams) => {
  const params = {
    searchCondition: searchParam.searchCondition,
    corState: searchParam.corState,
    keyword: searchParam.keyword,
    page: searchParam.page,
  }
  return params
}

const changePage = async (newPage: number) => {
  searchedParam.page = newPage
  searchParam.page = newPage
  const params = getParams(searchedParam)
  getUserList(params)
}

const handleReset = () => {
  searchParam.searchCondition = 'id',
    searchParam.corState = 'sale',
    searchParam.keyword = ''
}

const getCorList = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/qna',
    //   params,
    // })
    corList.value = mockupList.value
    totalCount.value = corList.value.length
  }
  catch (error) {
    console.error(error)
  }
}

const handleSearch = () => {
  searchedParam.searchCondition = searchParam.searchCondition
  searchedParam.corState = searchParam.corState
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.page = 1
  searchParam.page = 1
  getCorList(params)
}

const handleCorDetail = (data: ICorData) => {
  corId.value = data.corId
  console.log(corId.value)
  corPopupSignal.value = true
}

const handleCancel = () => {
  corPopupSignal.value = false
}

const handleUpdateCor = (data) => {
  try {
    // FIXME: api 연결
    console.log(data)
    // const res = await request({
    //   method: 'POST',
    //   url: '/user/${userId.value}',
    //   corInfo,
    // })
  }
  catch (error) {
    console.error(error)
  }
}

const handleCreateCor = () => {
  corPopupSignal.value = true
}

const handleSelectionChange = (target: ICorData[]) => {
  deletedCor.value = target.map(i => i.corId)
}

const handleDeleteCor = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'DELETE',
    //   url: '/cor',
    //   deletedCor.value,
    // })
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
      {{ t('corporation.title') }}
    </h2>
    <SearchForm use-reset @search="handleSearch" @clear="handleReset">
      <SearchItem>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" />
        <CustomInput v-model="searchParam.keyword" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </SearchItem>
      <SearchItem :label="t('corporation.label.cor-state')">
        <basic-select-box v-model="searchParam.corState" :options="stateOptions" />
      </SearchItem>
    </SearchForm>
    <div class="content__box">
      <div class="total">
        <span>
          {{ t('common.label.total') }} <em>{{ totalCount }}</em>{{ t('common.label.count') }}
        </span>
        <div class="flex">
          <button type="button" class="btn__secondary--md" @click="handleDeleteCor">
            {{ t('common.button.delete') }}
          </button>
          <button type="button" class="btn__primary-line--md" @click="handleCreateCor">
            {{ t('common.button.create') }}
          </button>
        </div>
      </div>
      <el-table :data="corList" style="width: 100%" @row-dblclick="handleCorDetail"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" min-width="50" />
        <el-table-column prop="corName" :label="t('corporation.label.name')" min-width="80" align="center" />
        <el-table-column prop="continent" :label="t('corporation.label.continent')" min-width="80" align="center" />
        <el-table-column prop="country" :label="t('corporation.label.country')" min-width="100" align="center" />
        <el-table-column prop="city" :label="t('corporation.label.city')" min-width="100" align="center" />
        <el-table-column prop="corState" :label="t('corporation.label.cor-state')" min-width="100" align="center">
          <template v-slot="scope">
            <p>
              {{ scope.row.corState === 'sale' ? t('corporation.label.sale') : t('corporation.label.product') }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="closeState" :label="t('corporation.label.close')" min-width="100" align="center">
          <template v-slot="scope">
            <p>
              {{ scope.row.closeState === 'operate' ? t('corporation.label.operate') :
        t('corporation.label.close-down')
              }}
            </p>
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
    <CorPopup v-model:model-value="corPopupSignal" :cor-id="corId" @cancel="handleCancel" @confirm="handleUpdateCor" />
  </div>
</template>
<style></style>