<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IFaqData } from '../types/faq.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchCondition = ref('제목')
const keyword = ref('')
const deletedFaq = ref<string[]>([])
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
  router.push({ path: `/admin/faq/${e.faqId}` })
}

const handleCreateFaq = () => {
  router.push({ path: '/admin/faq/create' })
}

const handleSelectionChange = (target: IFaqData[]) => {
  deletedFaq.value = target.map(i => i.faqId)
}

const handleDeleteFaq = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'DELETE',
    //   url: '/faq',
    //   deletedFaq.value,
    // })
    console.log(deletedFaq.value)
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
      FAQ 관리자
    </h2>
    <SearchForm user-reset @search="handleSearch" @clear="handleSearch">
      <SearchItem label="검색 조건">
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" />
      </SearchItem>
      <SearchItem label="검색어">
        <CustomInput v-model="searchParam.keyword" placeholder="검색어를 입력하세요." @keyup.enter="handleSearch" />
      </SearchItem>
    </SearchForm>
    <div class="content__box">
      <div class="total__bar">
        <span class="total">
          총 <em>{{ totalCount }}</em>건
        </span>
        <div class="flex">
          <button type="button" class="btn__secondary-line--sm" @click="handleDeleteFaq">
            삭제
          </button>
          <button type="button" class="btn__secondary--sm" @click="handleCreateFaq">
            등록
          </button>
        </div>
      </div>
      <el-table :data="faqList" style="width: 100%" @row-click="handleFaqDetail"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="5" />
        <el-table-column prop="index" label="번호" min-width="10" align="center" />
        <el-table-column prop="title" label="제목" min-width="35" align="center" />
        <el-table-column prop="createUser" label="등록자" min-width="20" align="center" />
        <el-table-column prop="createDate" label="등록일" min-width="20" align="center" />
        <el-table-column prop="views" label="조회수" min-width="10" align="center" />
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>

<style></style>
