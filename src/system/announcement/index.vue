<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IAnnouncementData } from '../types/announcement.ts'
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

const handleReset = () => {
  searchParam.searchCondition = 'title'
  searchParam.keyword = ''
}

const getAnnouncement = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
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
  getAnnouncement(params)
}

const handleAnncDetail = (e) => {
  router.push({ path: `/annc/${e.anncId}` })
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div>
    <el-select v-model="searchParam.searchCondition" placeholder="Select" style="width: 240px">
      <el-option v-for="item in searchConditionOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input v-model="searchParam.keyword" style="width: 240px" placeholder="검색어를 입력하세요."
      @keyup.enter="handleSearch" />
    <el-button plain @click="handleReset">초기화</el-button>
    <el-button type="primary" plain @click="handleSearch">조회</el-button>
  </div>
  <h2>{{ totalCount }}</h2>
  <el-table :data="announcementList" style="width: 100%" @row-click="handleAnncDetail">
    <el-table-column prop="index" label="번호" width="180" />
    <el-table-column prop="title" label="제목" width="180" />
    <el-table-column prop="createDate" label="등록일" />
  </el-table>
</template>

<style></style>
