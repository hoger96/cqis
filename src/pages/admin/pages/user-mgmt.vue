<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IUserData } from '../types/user-mgmt.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '../../../types/modal.ts'
import CustomTextarea from '../../../examples/components/custom-textarea/CustomTextarea.vue'
import UserPopup from '../components/UserPopup.vue'

const router = useRouter()
const { t } = useI18n()
const userPopupSignal = ref(false)
const userId = ref('')

const searchConditionOptions = [
  {
    value: 'userName',
    label: '이름'
  },
  {
    value: 'userId',
    label: '아이디'
  }
]
const userStateOptions = [
  {
    value: 'user',
    label: '일반'
  },
  {
    value: 'admin',
    label: '관리자'
  },
]
const useStateOptions = [
  {
    value: 'Y',
    label: '사용'
  },
  {
    value: 'N',
    label: '사용중지'
  },
]
const mockupList = ref([
  {
    rowNum: 1,
    userId: 'id_1',
    userName: '홍길동',
    mtrYn: 'Y',
    qlikUserAuthTp: 'A',
    useYn: 'Y',
    lastLoginDt: '2024-05-29 10:12:31',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    rowNum: 2,
    userId: 'id_2',
    userName: '김길동',
    mtrYn: 'Y',
    qlikUserAuthTp: 'P',
    useYn: 'Y',
    lastLoginDt: '2024-05-29 10:12:31',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    rowNum: 3,
    userId: 'id_3',
    userName: '남길동',
    mtrYn: 'Y',
    qlikUserAuthTp: 'A',
    useYn: 'Y',
    lastLoginDt: '2024-05-29 10:12:31',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    rowNum: 4,
    userId: 'id_4',
    userName: '강길동',
    mtrYn: '',
    qlikUserAuthTp: 'A',
    useYn: 'N',
    lastLoginDt: '2024-05-29 10:12:31',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  },
  {
    rowNum: 5,
    userId: 'id_5',
    userName: '마길동',
    mtrYn: 'Y',
    qlikUserAuthTp: 'A',
    useYn: 'Y',
    lastLoginDt: '2024-05-29 10:12:31',
    crteUserId: 'admin',
    crteDttm: '2024-07-01 12:23:12',
    updUserId: 'admin',
    updDttm: '2024-07-01 12:23:12'
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'userId',
  adminState: 'user',
  useYn: 'Y',
  keyword: '',
  currentPage: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  adminState: '',
  useYn: '',
  keyword: '',
  currentPage: 1,
})
const totalCount = ref(0)
const userList = ref<IUserData[]>([])

const getParams = (searchParam: ISearchParams) => {
  const params = {
    searchCondition: searchParam.searchCondition,
    adminState: searchParam.adminState,
    useYn: searchParam.useYn,
    keyword: searchParam.keyword,
    currentPage: searchParam.currentPage,
  }
  return params
}

const changePage = async (newPage: number) => {
  searchedParam.currentPage = newPage
  searchParam.currentPage = newPage
  const params = getParams(searchedParam)
  getUserList(params)
}

const handleReset = () => {
  searchParam.searchCondition = 'id',
    searchParam.adminState = 'user',
    searchParam.useYn = 'Y'
  searchParam.keyword = ''
}

const getUserList = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/user/list',
    //   params,
    // })
    userList.value = mockupList.value
    totalCount.value = userList.value.length
  }
  catch (error) {
    console.error(error)
  }
}

const handleSearch = () => {
  searchedParam.searchCondition = searchParam.searchCondition
  searchedParam.adminState = searchParam.adminState
  searchedParam.useYn = searchParam.useYn
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.currentPage = 1
  searchParam.currentPage = 1
  getUserList(params)
}

const handleUserDetail = (data: IUserData) => {
  userId.value = data.userId
  userPopupSignal.value = true
}

const handleCancel = () => {
  userPopupSignal.value = false
}

const handleUpdateUser = (data) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/user/update',
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
      {{ t('user.title') }}
    </h2>
    <SearchForm use-reset @search="handleSearch" @clear="handleReset">
      <SearchItem>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" />
        <CustomInput v-model="searchParam.keyword" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </SearchItem>
      <SearchItem :label="t('user.label.admin-state')">
        <basic-select-box v-model="searchParam.adminState" :options="userStateOptions" />
      </SearchItem>
      <SearchItem :label="t('common.search-bar.use')">
        <basic-select-box v-model="searchParam.useYn" :options="useStateOptions" />
      </SearchItem>
    </SearchForm>
    <div class="content__box">
      <div class="total">
        <span>
          {{ t('common.label.total') }} <em>{{ totalCount }}</em>{{ t('common.label.count') }}
        </span>
      </div>
      <el-table :data="userList" style="width: 100%" @row-dblclick="handleUserDetail">
        <el-table-column prop="rowNum" :label="t('common.label.index')" min-width="50" align="center" />
        <el-table-column prop="userId" :label="t('common.label.id')" min-width="150" align="center" />
        <el-table-column prop="userName" :label="t('common.label.name')" min-width="150" align="center" />
        <el-table-column prop="mtrYn" :label="t('user.label.admin-state')" min-width="150" align="center">
          <template v-slot="scope">
            <p>
              {{ scope.row.mtrYn === 'Y' ? t('user.label.admin') : t('user.label.user') }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="qlikUserAuthTp" :label="t('user.label.qlik')" min-width="150" align="center">
          <template v-slot="scope">
            <p>
              {{ scope.row.qlikUserAuthTp === 'P' ? t('user.label.professional') : t('user.label.analyst') }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="useYn" :label="t('common.search-bar.use')" min-width="100" align="center">
          <template v-slot="scope">
            <p>
              {{ scope.row.useYn === 'Y' ? t('common.label.use-yes') : t('common.label.use-no') }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="lastLoginDt" :label="t('common.label.login')" min-width="150" align="center" />
      </el-table>
      <Pagination v-model="searchParam.currentPage" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
    <UserPopup v-model:model-value="userPopupSignal" :user-id="userId" @cancel="handleCancel"
      @confirm="handleUpdateUser" />
  </div>
</template>
<style></style>