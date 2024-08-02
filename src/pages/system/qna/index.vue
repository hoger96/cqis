<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const searchCondition = ref('제목')
const keyword = ref('')
const searchConditionOptions = [
  {
    value: 'title',
    label: '제목'
  },
  {
    value: 'detail',
    label: '내용'
  },
]
const searchStateOptions = [
  {
    value: 'wait',
    label: '대기'
  },
  {
    value: 'complete',
    label: '완료'
  },
]
const mockupList = ref([
  {
    index: 1,
    qnaId: 'qna_1',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    state: 'wait'
  },
  {
    index: 2,
    qnaId: 'qna_2',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    state: 'complete'
  },
  {
    index: 3,
    qnaId: 'qna_3',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    state: 'wait'
  },
  {
    index: 4,
    qnaId: 'qna_4',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    state: 'complete'
  },
  {
    index: 5,
    qnaId: 'qna_5',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    state: 'wait'
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'title',
  state: 'wait',
  keyword: '',
  page: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  state: '',
  keyword: '',
  page: 1,
})
const totalCount = ref(0)
const qnaList = ref<IQnaData[]>([])

const getParams = (searchParam: ISearchParams) => {
  const params = {
    searchCondition: searchParam.searchCondition,
    state: searchParam.state,
    keyword: searchParam.keyword,
    page: searchParam.page,
  }
  return params
}

const changePage = async (newPage: number) => {
  searchedParam.page = newPage
  searchParam.page = newPage
  const params = getParams(searchedParam)
  getQnaList(params)
}

const handleReset = () => {
  searchParam.searchCondition = 'title'
  searchParam.state = 'wait'
  searchParam.keyword = ''
}

const getQnaList = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/qna',
    //   params,
    // })
    qnaList.value = mockupList.value
    totalCount.value = qnaList.value.length
  }
  catch (error) {
    console.error(error)
  }
}

const handleSearch = () => {
  searchedParam.searchCondition = searchParam.searchCondition
  searchedParam.state = searchParam.state
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.page = 1
  searchParam.page = 1
  getQnaList(params)
}

const handleQnaDetail = (e) => {
  router.push({ path: `/system/qna/${e.qnaId}` })
}

const handleCreateQna = () => {
  router.push({ path: '/system/qna/create' })
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('qna.title') }}
    </h2>
    <SearchForm use-reset @search="handleSearch" @clear="handleReset">
      <SearchItem>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" />
        <CustomInput v-model="searchParam.keyword" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </SearchItem>
      <SearchItem :label="t('common.search-bar.state')">
        <basic-select-box v-model="searchParam.state" :options="searchStateOptions" />
      </SearchItem>
    </SearchForm>
    <div class="content__box">
      <div class="total__bar">
        <span class="total">
          {{ t('common.label.total') }} <em>{{ totalCount }}</em>{{ t('common.label.count') }}
        </span>
        <button type="button" class="btn__primary-line--md" @click="handleCreateQna">
          {{ t('common.button.create') }}
        </button>
      </div>
      <el-table :data="qnaList" style="width: 100%" @row-dblclick="handleQnaDetail">
        <el-table-column prop="index" :label="t('common.label.index')" min-width="50" align="center" />
        <el-table-column prop="title" :label="t('common.label.title')" min-width="400" align="center" />
        <el-table-column prop="createUser" :label="t('common.label.create-user')" min-width="150" align="center" />
        <el-table-column prop="createDate" :label="t('common.label.create-date')" min-width="200" align="center" />
        <el-table-column prop="state" :label="t('common.label.state')" min-width="100" align="center">
          <template v-slot="scope">
            <p>
              {{ scope.row.state === 'wait' ? t('common.label.wait') : t('common.label.complete') }}
            </p>
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>
<style></style>