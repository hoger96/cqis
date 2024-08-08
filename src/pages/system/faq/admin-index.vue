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
  setFaqList(params)
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
  router.push({ path: `/system/faq/admin-${e.faqId}` })
}

const handleCreateFaq = () => {
  router.push({ path: '/system/faq/create' })
}

const handleSelectionChange = (target: IFaqData) => {
  deletedFaq.value = Object.values(target).map(item => item.faqSeq);
}

const handleDeleteFaq = () => {
  try {
    console.log(Array.from(deletedFaq.value))
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/faq/delete',
    //   {faqSeqList: Array.from(deletedFaq.value)}
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
      <div class="total">
        <span>
          {{ t('common.label.total') }} <em>{{ totalCount }}</em>{{ t('common.label.count') }}
        </span>
        <div class="flex">
          <button type="button" class="btn__secondary-line--md" @click="handleDeleteFaq">
            {{ t('common.button.delete') }}
          </button>
          <button type="button" class="btn__secondary--md" @click="handleCreateFaq">
            {{ t('common.button.create') }}
          </button>
        </div>
      </div>
      <el-table :data="faqList" style="width: 100%" @row-dblclick="handleFaqDetail"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" min-width="5" />
        <el-table-column prop="rowNum" :label="t('common.label.index')" min-width="10" align="center" />
        <el-table-column prop="title" :label="t('common.label.title')" min-width="50" align="center" />
        <el-table-column prop="faqDispYn" :label="t('faq.label.output')" min-width="10" align="center">
          <template v-slot="scope">
            <p>
              {{ scope.row.faqDispYn === 'Y' ? t('faq.label.out') : t('faq.label.hide') }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="crteDttm" :label="t('common.label.create-date')" min-width="15" align="center" />
      </el-table>
      <Pagination v-model="searchParam.currentPage" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>

<style></style>
