<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IAnnouncementData } from '../types/announcement.ts'
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
const mockupList = ref([
  {
    index: 1,
    anncId: 'annc_1',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18'
  },
  {
    index: 2,
    anncId: 'annc_2',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18'
  },
  {
    index: 3,
    anncId: 'annc_3',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18'
  },
  {
    index: 4,
    anncId: 'annc_4',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18'
  },
  {
    index: 5,
    anncId: 'annc_5',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18'
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
const announcementList = ref<IAnnouncementData[]>([])

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
  getAnnouncementList(params)
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
    announcementList.value = mockupList.value
    totalCount.value = announcementList.value.length
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
  getAnnouncementList(params)
}

const handleAnncDetail = (e) => {
  router.push({ path: `/system/announcement/${e.anncId}` })
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div class="data-source">
    <div class="mb-4">
      <h2 class="mgmt__title">
        {{ t('annc.title') }}
      </h2>
    </div>
    <form class="form__search">
      <div class="form">
        <label class="form__label">{{ t('common.search-bar.condition') }}</label>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" label="검색 조건" />
      </div>
      <div class="form flex-1">
        <label class="form__label">{{ t('common.search-bar.keyword') }}</label>
        <CustomInput v-model="searchParam.keyword" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </div>
      <button type="button" class="ml-5 btn__secondary--md" @click="handleReset">
        {{ t('common.button.reset') }}
      </button>
      <button type="button" class="ml-5 btn__primary-line--md" @click="handleSearch">
        {{ t('common.button.search') }}
      </button>
    </form>
    <div class="mgmt__box">
      <el-table :data="announcementList" style="width: 100%" @row-click="handleAnncDetail">
        <el-table-column prop="index" :label="t('common.label.index')" min-width="200" align="center" />
        <el-table-column prop="title" :label="t('common.label.title')" min-width="650" align="center" />
        <el-table-column prop="createDate" :label="t('common.label.create-date')" min-width="400" align="center" />
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>

<style></style>
