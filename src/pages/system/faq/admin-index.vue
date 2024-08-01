<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IFaqData } from '../types/faq.ts'
import { useRouter } from 'vue-router'

const { t } = useI18n()
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
  router.push({ path: `/system/faq/admin-${e.faqId}` })
}

const handleCreateFaq = () => {
  router.push({ path: '/system/faq/create' })
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
      {{ t('faq.admin-title') }}
    </h2>
    <SearchForm use-reset @search="handleSearch" @clear="handleReset">
      <SearchItem>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" />
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
          <button type="button" class="btn__secondary--md" @click="handleDeleteFaq">
            {{ t('common.button.delete') }}
          </button>
          <button type="button" class="btn__primary-line--md" @click="handleCreateFaq">
            {{ t('common.button.create') }}
          </button>
        </div>
      </div>
      <el-table :data="faqList" style="width: 100%" @row-dblclick="handleFaqDetail"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="5" />
        <el-table-column prop="index" :label="t('common.label.index')" min-width="10" align="center" />
        <el-table-column prop="title" :label="t('common.label.title')" min-width="35" align="center" />
        <el-table-column prop="createUser" :label="t('common.label.create-user')" min-width="20" align="center" />
        <el-table-column prop="createDate" :label="t('common.label.create-date')" min-width="20" align="center" />
        <el-table-column prop="views" :label="t('common.label.views')" min-width="10" align="center" />
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>

<style></style>
