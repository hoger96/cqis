<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IFaqData } from '../types/faq.ts'
import { useRouter } from 'vue-router'

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
const mockupList = ref([
  {
    index: 1,
    faqId: 'faq_1',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    views: 105
  },
  {
    index: 2,
    faqId: 'faq_2',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    views: 10
  },
  {
    index: 3,
    faqId: 'faq_3',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    views: 1
  },
  {
    index: 4,
    faqId: 'faq_4',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    views: 10
  },
  {
    index: 5,
    faqId: 'faq_5',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    views: 105
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'title',
  keyword: '',
  page: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  keyword: '',
  page: 1,
})
const totalCount = ref(0)
const faqList = ref<IFaqData[]>([])

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
  getFaqList(params)
}

const handleReset = () => {
  searchParam.searchCondition = 'title'
  searchParam.keyword = ''
}

const getFaqList = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/annc',
    //   params,
    // })
    faqList.value = mockupList.value
    totalCount.value = faqList.value.length
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
  getFaqList(params)
}

const handleFaqDetail = (e) => {
  router.push({ path: `/faq/${e.faqId}` })
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div class="data-source">
    <div class="mb-4">
      <h2 class="mgmt__title">
        공지사항
      </h2>
    </div>
    <form class="form__search">
      <div class="form">
        <label class="form__label">검색 조건</label>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" label="검색 조건" />
      </div>
      <div class="form flex-1">
        <label class="form__label">검색어</label>
        <CustomInput v-model="searchParam.keyword" placeholder="검색어를 입력하세요." @keyup.enter="handleSearch" />
      </div>
      <button type="button" class="ml-5 btn__secondary--md" @click="handleReset">
        초기화
      </button>
      <button type="button" class="ml-5 btn__primary-line--md" @click="handleSearch">
        검색
      </button>
    </form>
    <div class="mgmt__box">
      <el-table :data="faqList" style="width: 100%" @row-click="handleFaqDetail">
        <el-table-column prop="index" label="번호" min-width="200" align="center" />
        <el-table-column prop="title" label="제목" min-width="500" align="center" />
        <el-table-column prop="createUser" label="등록자" min-width="200" align="center" />
        <el-table-column prop="createDate" label="등록일" min-width="200" align="center" />
        <el-table-column prop="views" label="조회수" min-width="100" align="center" />
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>

<style></style>
