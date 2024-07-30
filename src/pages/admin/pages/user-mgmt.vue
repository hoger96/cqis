<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IUserData } from '../types/user-mgmt.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '../../types/modal.ts'
import CustomTextarea from '../../examples/components/custom-textarea/CustomTextarea.vue'
import UserPopup from '../components/UserPopup.vue'

const router = useRouter()
const { t } = useI18n()
const userPopupSignal = ref(false)
const userId = ref('')

const searchConditionOptions = [
  {
    value: 'id',
    label: '아이디'
  },
  {
    value: 'name',
    label: '이름'
  },
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
    index: 1,
    userId: 'id_1',
    name: '홍길동',
    adminState: 'user',
    qlik: 'professional',
    use: 'Y',
    loginDate: '2024-05-29 10:12:31'
  },
  {
    index: 2,
    userId: 'id_2',
    name: '김길동',
    adminState: 'user',
    qlik: 'Analyst',
    use: 'Y',
    loginDate: '2024-05-29 10:12:31'
  },
  {
    index: 3,
    userId: 'id_3',
    name: '남길동',
    adminState: 'admin',
    qlik: 'professional',
    use: 'N',
    loginDate: '2024-05-29 10:12:31'
  },
  {
    index: 4,
    userId: 'id_4',
    name: '강길동',
    adminState: 'user',
    qlik: 'professional',
    use: 'N',
    loginDate: '2024-05-29 10:12:31'
  },
  {
    index: 5,
    userId: 'id_5',
    name: '마길동',
    adminState: 'admin',
    qlik: 'Analyst',
    use: 'Y',
    loginDate: '2024-05-29 10:12:31'
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'id',
  adminState: 'user',
  use: 'Y',
  keyword: '',
  page: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  adminState: '',
  use: '',
  keyword: '',
  page: 1,
})
const totalCount = ref(0)
const userList = ref<IUserData[]>([])

const getParams = (searchParam: ISearchParams) => {
  const params = {
    searchCondition: searchParam.searchCondition,
    adminState: searchParam.adminState,
    use: searchParam.use,
    keyword: searchParam.keyword,
    page: searchParam.page,
  }
  return params
}

const changePage = async (newPage: number) => {
  searchedParam.page = newPage
  searchParam.page = newPage
  const params = getParams(searchedParam)
  getUserList(params)
}

const handleReset = () => {
  searchParam.searchCondition = 'id',
    searchParam.adminState = 'user',
    searchParam.use = 'Y'
  searchParam.keyword = ''
}

const getUserList = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/qna',
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
  searchedParam.use = searchParam.use
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.page = 1
  searchParam.page = 1
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
    console.log(data)
    const userInfo = {
      use: data.userInfo.use,
      reason: data.userInfo.reason
    }
    // const res = await request({
    //   method: 'POST',
    //   url: '/user/${userId.value}',
    //   userInfo,
    // })
    console.log('수정', userInfo)
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
      <SearchItem :label="t('common.search-bar.condition')">
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" />
      </SearchItem>
      <SearchItem :label="t('user.label.admin-state')">
        <basic-select-box v-model="searchParam.adminState" :options="userStateOptions" />
      </SearchItem>
      <SearchItem :label="t('common.search-bar.use')">
        <basic-select-box v-model="searchParam.use" :options="useStateOptions" />
      </SearchItem>
      <SearchItem :label="t('common.search-bar.keyword')">
        <CustomInput v-model="searchParam.keyword" :placeholder="t('common.search-bar.placeholder')"
          @keyup.enter="handleSearch" />
      </SearchItem>
    </SearchForm>
    <div class="content__box">
      <span class="total">
        {{ t('common.label.total') }} <em>{{ totalCount }}</em>{{ t('common.label.count') }}
      </span>
      <el-table :data="userList" style="width: 100%" @row-dblclick="handleUserDetail">
        <el-table-column prop="index" :label="t('common.label.index')" min-width="50" align="center" />
        <el-table-column prop="userId" :label="t('common.label.id')" min-width="150" align="center" />
        <el-table-column prop="name" :label="t('common.label.name')" min-width="150" align="center" />
        <el-table-column prop="adminState" :label="t('user.label.admin')" min-width="150" align="center" />
        <el-table-column prop="qlik" :label="t('user.label.qlik')" min-width="150" align="center" />
        <el-table-column prop="use" :label="t('common.search-bar.use')" min-width="100" align="center">
          <template v-slot="scope">
            <p>
              {{ scope.row.use === 'Y' ? t('common.label.use-yes') : t('common.label.use-no') }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="loginDate" :label="t('common.label.login')" min-width="150" align="center" />
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
    <UserPopup v-model:model-value="userPopupSignal" :user-id="userId" @cancel="handleCancel"
      @confirm="handleUpdateUser" />
  </div>
</template>
<style></style>