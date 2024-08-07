<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { type ISearchParams, type IFaqData } from '../types/faq.ts'
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
    value: 'cont',
    label: '내용'
  },
]
const mockupList = ref([
  {
    rowNum: '1',
    faqSeq: '1',
    faqId: 'faq_1',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    faqDispYn: 'Y',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'

  },
  {
    rowNum: '2',
    faqSeq: '2',
    faqId: 'faq_2',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    faqDispYn: 'Y',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    rowNum: '3',
    faqSeq: '3',
    faqId: 'faq_3',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    faqDispYn: 'Y',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    rowNum: '4',
    faqSeq: '4',
    faqId: 'faq_4',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    faqDispYn: 'Y',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    rowNum: '5',
    faqSeq: '5',
    faqId: 'faq_5',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    faqDispYn: 'Y',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'title',
  keyword: '',
  currentPage: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  keyword: '',
  currentPage: 1,
})
const totalCount = ref(0)
const faqList = ref<IFaqData[]>([])

const getParams = (searchParam: ISearchParams) => {
  const params = {
    searchCondition: searchParam.searchCondition,
    keyword: searchParam.keyword,
    currentPage: searchParam.currentPage,
  }
  return params
}

const changePage = async (newPage: number) => {
  searchedParam.currentPage = newPage
  searchParam.currentPage = newPage
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
    //   method: 'POST',
    //   url: '/faq/list',
    //   params,
    // })
    return mockupList.value
  }
  catch (error) {
    console.error(error)
  }
}

const setFaqList = (params: ISearchParams) => {
  const data = getFaqList(params)
  faqList.value = data
  totalCount.value = faqList.value.length
}

const handleSearch = () => {
  searchedParam.searchCondition = searchParam.searchCondition
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.currentPage = 1
  searchParam.currentPage = 1
  setFaqList(params)
}

const handleFaqDetail = (e: IFaqData) => {
  router.push({ path: `/system/faq/${e.faqId}` })
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('faq.title') }}
    </h2>
    <SearchForm use-reset @search="handleSearch" @clear="handleReset">
      <SearchItem>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" />
        <CustomInput v-model="searchParam.keyword" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </SearchItem>
    </SearchForm>
    <div class="content__box">
      <el-table :data="faqList" style="width: 100%" @row-dblclick="handleFaqDetail">
        <el-table-column prop="rowNum" :label="t('common.label.index')" min-width="100" align="center" />
        <el-table-column prop="title" :label="t('common.label.title')" min-width="500" align="center" />
        <el-table-column prop="crteDttm" :label="t('common.label.create-date')" min-width="200" align="center" />
      </el-table>
      <Pagination v-model="searchParam.currentPage" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>

<style></style>
