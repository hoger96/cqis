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
const adminId = ref('')

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
const mockupList = ref([
  {
    index: 1,
    adminId: 'id_1',
    name: '홍길동',
    adminGroup: '1번 그룹',
    authDate: '2024-05-29 10:12:31'
  },
  {
    index: 2,
    adminId: 'id_2',
    name: '김길동',
    adminGroup: '2번 그룹, 3번그룹',
    authDate: '2024-05-29 10:12:31'
  },
  {
    index: 3,
    adminId: 'id_3',
    name: '남길동',
    adminGroup: '1번 그룹',
    authDate: '2024-05-29 10:12:31'
  },
  {
    index: 4,
    adminId: 'id_4',
    name: '강길동',
    adminGroup: '2번그룹',
    authDate: '2024-05-29 10:12:31'
  },
  {
    index: 5,
    adminId: 'id_5',
    name: '마길동',
    adminGroup: '3번 그룹',
    authDate: '2024-05-29 10:12:31'
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'id',
  keyword: '',
  page: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  keyword: '',
  page: 1,
})
const totalCount = ref(0)
const adminList = ref<IAdminAuthData[]>([])

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
    //   method: 'GET',
    //   url: '/qna',
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
  params.page = 1
  searchParam.page = 1
  getAdminList(params)
}

const handleAdminDetail = (data: IAdminAuthData) => {
  adminId.value = data.adminId
  adminPopupSignal.value = true
}

const handleCancel = () => {
  adminPopupSignal.value = false
}

const handleUpdateAdmin = (data) => {
  try {
    // FIXME: api 연결
    const adminInfo = {
      auth: data.adminInfo.auth,
      reason: data.adminInfo.reason
    }
    // const res = await request({
    //   method: 'POST',
    //   url: '/admin-auth/${adminId.value}',
    //   adminInfo,
    // })
    console.log('수정', adminInfo)
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
      <div class="total">
        <span>
          {{ t('common.label.total') }} <em>{{ totalCount }}</em>{{ t('common.label.count') }}
        </span>
        <!-- <div class="flex">
          <button type="button" class="btn__secondary--md" @click="handleDeleteCor">
            {{ t('common.button.delete') }}
          </button>
          <button type="button" class="btn__primary-line--md" @click="handleCreateCor">
            {{ t('common.button.create') }}
          </button>
        </div> -->
      </div>
      <el-table :data="adminList" style="width: 100%" @row-dblclick="handleAdminDetail">
        <el-table-column prop="index" :label="t('common.label.index')" min-width="50" align="center" />
        <el-table-column prop="adminId" :label="t('common.label.id')" min-width="150" align="center" />
        <el-table-column prop="name" :label="t('common.label.name')" min-width="150" align="center" />
        <el-table-column prop="adminGroup" :label="t('admin-auth.label.admin-group')" min-width="150" align="center" />
        <el-table-column prop="authDate" :label="t('user-auth.label.auth-date')" min-width="150" align="center" />
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
    <AdminAuthPopup v-model:model-value="adminPopupSignal" :admin-id="adminId" @cancel="handleCancel"
      @confirm="handleUpdateAdmin" />
  </div>
</template>
<style></style>