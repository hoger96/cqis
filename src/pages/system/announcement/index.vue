<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { ISearchParams, IAnnouncementData } from '../types/announcement.ts'
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
    notySeq: '1',
    rowNum: '1',
    ctg: '전사공지',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    topDispYn: 'Y',
    crteUserId: 'admin',
    notyStartDt: '2024-01-01',
    notyEndDt: '2024-12-31',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    notySeq: '2',
    rowNum: '2',
    ctg: '전사공지',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    topDispYn: 'Y',
    crteUserId: 'admin',
    notyStartDt: '2024-01-01',
    notyEndDt: '2024-12-31',
    crteDttm: ' 2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: ' 2024-07-01 12:23:12'
  },
  {
    notySeq: '3',
    rowNum: '3',
    ctg: '전사공지',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    topDispYn: 'Y',
    crteUserId: 'admin',
    notyStartDt: '2024-01-01',
    notyEndDt: '2024-12-31',
    crteDttm: ' 2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: ' 2024-07-01 12:23:12'
  },
  {
    notySeq: '4',
    rowNum: '4',
    ctg: '긴급공지',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    topDispYn: '',
    crteUserId: 'admin',
    notyStartDt: '2024-01-01',
    notyEndDt: '2024-12-31',
    crteDttm: ' 2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: ' 2024-07-01 12:23:12'
  },
  {
    notySeq: '5',
    rowNum: '5',
    ctg: '전사공지',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    topDispYn: 'Y',
    crteUserId: 'admin',
    notyStartDt: '2024-01-01',
    notyEndDt: '2024-12-31',
    crteDttm: ' 2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: ' 2024-07-01 12:23:12'
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
const announcementList = ref<IAnnouncementData[]>([])

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
  setAnnouncementList(params)
}

const handleReset = () => {
  searchParam.searchCondition = 'title'
  searchParam.keyword = ''
}

const getAnnouncementList = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/annc',
    //   params,
    // })
    return mockupList.value
  }
  catch (error) {
    console.error(error)
  }
}

const setAnnouncementList = () => {
  const data = getAnnouncementList()
  announcementList.value = data.map(item => ({
    ...item,
    period: `${item.notyStartDt} ~ ${item.notyEndDt}`,
  }))
  totalCount.value = announcementList.value.length
}


const handleSearch = () => {
  searchedParam.searchCondition = searchParam.searchCondition
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.currentPage = 1
  searchParam.currentPage = 1
  setAnnouncementList(params)
}

const handleAnncDetail = (e: IAnnouncementData) => {
  router.push({ path: `/system/announcement/${e.notySeq}` })
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('annc.title') }}
    </h2>
    <SearchForm use-reset @search="handleSearch" @clear="handleReset">
      <SearchItem>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" />
        <CustomInput v-model="searchParam.keyword" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </SearchItem>
    </SearchForm>
    <div class="content__box">
      <el-table :data="announcementList" style="width: 100%" @row-dblclick="handleAnncDetail">
        <el-table-column prop="rowNum" :label="t('common.label.index')" min-width="10" align="center" />
        <el-table-column prop="ctg" :label="t('annc.label.category')" min-width="20" align="center" />
        <el-table-column prop="title" :label="t('common.label.title')" min-width="70" align="center" />
        <el-table-column prop="period" :label="t('annc.label.period')" min-width="40" align="center" />
        <el-table-column prop="crteDttm" :label="t('common.label.create-date')" min-width="30" align="center" />
      </el-table>
      <Pagination v-model="searchParam.currentPage" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>

<style></style>
