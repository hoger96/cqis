<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IAdminAuthData } from '../types/admin-auth.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '~/types/modal.ts'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'
import AdminAuthPopup from '../components/AdminAuthPopup.vue'

const router = useRouter()
const { t } = useI18n()
const searchCondition = ref('id')
const useState = ref('Y')
const keyword = ref('')
const adminPopupSignal = ref(false)
const userId = ref('')

const searchConditionOptions = [
  {
    value: 'userId',
    label: '아이디'
  },
  {
    value: 'userName',
    label: '이름'
  },
]
const mockupList = ref([
  {
    rowNum: 1,
    userId: 'id_1',
    userName: '홍길동',
    setYn: 'Y',
    lastRoleMppDttm: '2024-05-29 10:12:31',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    rowNum: 2,
    userId: 'id_2',
    userName: '김길동',
    setYn: 'Y',
    lastRoleMppDttm: '2024-05-29 10:12:31',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    rowNum: 3,
    userId: 'id_3',
    userName: '남길동',
    setYn: 'Y',
    lastRoleMppDttm: '2024-05-29 10:12:31',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    rowNum: 4,
    userId: 'id_4',
    userName: '강길동',
    setYn: 'Y',
    lastRoleMppDttm: '2024-05-29 10:12:31',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    rowNum: 5,
    userId: 'id_5',
    userName: '마길동',
    setYn: 'N',
    lastRoleMppDttm: '2024-05-29 10:12:31',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'userId',
  keyword: '',
  currentPage: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  keyword: '',
  currentPage: 1,
})
const totalCount = ref(0)
const adminList = ref<IAdminAuthData[]>([])

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
  getAdminList(params)
}

const handleReset = () => {
  searchParam.searchCondition = 'id'
  searchParam.keyword = ''
}

const getAdminList = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/mtrRoleMpp/list',
    //   params,
    // })
    adminList.value = mockupList.value
    totalCount.value = adminList.value.length
  }
  catch (error) {
    console.error(error)
  }
}

const handleSearch = () => {
  searchedParam.searchCondition = searchParam.searchCondition
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.currentPage = 1
  searchParam.currentPage = 1
  getAdminList(params)
}

const handleAdminDetail = (data: IAdminAuthData) => {
  userId.value = data.userId
  adminPopupSignal.value = true
}

const handleCancel = () => {
  adminPopupSignal.value = false
}

const handleUpdateAdmin = (data) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/mtrRoleMpp/update',
    //   data,
    // })
    console.log('수정', data)
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
      {{ t('admin-auth.title') }}
    </h2>
    <SearchForm use-reset @search="handleSearch" @clear="handleReset">
      <SearchItem>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" />
        <CustomInput v-model="searchParam.keyword" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </SearchItem>
    </SearchForm>
    <div class="content__box">
      <div class="table-header">
        <span class="table-header__total">
          {{ t('common.label.total') }} <em>{{ totalCount }}</em>{{ t('common.label.count') }}
        </span>
      </div>
      <el-table :data="adminList" style="width: 100%" @row-dblclick="handleAdminDetail">
        <el-table-column prop="rowNum" :label="t('common.label.index')" min-width="50" align="center" />
        <el-table-column prop="userId" :label="t('common.label.id')" min-width="150" align="center" />
        <el-table-column prop="userName" :label="t('common.label.name')" min-width="150" align="center" />
        <el-table-column prop="setYn" :label="t('admin-auth.label.set')" min-width="150" align="center" />
        <el-table-column prop="lastRoleMppDttm" :label="t('user-auth.label.auth-date')" min-width="150"
          align="center" />
      </el-table>
      <Pagination v-model="searchParam.currentPage" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
    <AdminAuthPopup v-model:model-value="adminPopupSignal" :user-id="userId" @cancel="handleCancel"
      @confirm="handleUpdateAdmin" />
  </div>
</template>
<style></style>