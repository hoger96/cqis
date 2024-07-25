<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IAnnouncementData } from '../types/announcement.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchCondition = ref('제목')
const keyword = ref('')
const deletedAnnc = ref<string[]>([])
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
  router.push({ path: `/admin/annc/${e.anncId}` })
}

const handleCreateAnnc = () => {
  router.push({ path: '/admin/annc/create' })
}

const handleSelectionChange = (target: IAnnouncementData[]) => {
  deletedAnnc.value = target.map(i => i.anncId)
}

const handleDeleteAnnc = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'DELETE',
    //   url: '/annc',
    //   deletedAnnc.value,
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
    <div class="flex">
      <span class="table__count">
        총 <em>{{ totalCount }}</em>건
      </span>
      <button type="button" class="btn__secondary--md" @click="handleDeleteAnnc">
        삭제
      </button>
      <button type="button" class="btn__primary-line--md" @click="handleCreateAnnc">
        등록
      </button>
    </div>
    <div class="mgmt__box">
      <el-table :data="announcementList" style="width: 100%" @row-click="handleAnncDetail"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="index" label="번호" min-width="200" align="center" />
        <el-table-column prop="title" label="제목" min-width="650" align="center" />
        <el-table-column prop="createDate" label="등록일" min-width="400" align="center" />
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>

<style></style>
