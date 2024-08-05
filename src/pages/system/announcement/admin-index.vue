<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { ISearchParams, IAnnouncementData } from '../types/announcement.ts'
import { useRouter } from 'vue-router'


const { t } = useI18n()
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

const handleAnncDetail = (e: IAnnouncementData) => {
  router.push({ path: `/system/announcement/admin-${e.anncId}` })
}

const handleCreateAnnc = () => {
  router.push({ path: '/system/announcement/create' })
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
  <div>
    <h2 class="title">
      {{ t('annc.admin-title') }}
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
          <button type="button" class="btn__secondary--md" @click="handleDeleteAnnc">
            {{ t('common.button.delete') }}
          </button>
          <button type="button" class="btn__primary-line--md" @click="handleCreateAnnc">
            {{ t('common.button.create') }}
          </button>
        </div>
      </div>
      <el-table :data="announcementList" style="width: 100%" @row-dblclick="handleAnncDetail"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="10" />
        <el-table-column prop="index" :label="t('common.label.index')" min-width="10" align="center" />
        <el-table-column prop="title" :label="t('common.label.title')" min-width="50" align="center" />
        <el-table-column prop="createDate" :label="t('common.label.create-date')" min-width="30" align="center" />
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>

<style></style>
