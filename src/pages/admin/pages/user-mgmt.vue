<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IUserData } from '../types/user-mgmt.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '../../types/modal.ts'
import CustomTextarea from '../../examples/components/custom-textarea/CustomTextarea.vue'
import UserPopup from '../components/UserPopup.vue'

const { showFromFile, catchNotError } = useReturnMessage()
const router = useRouter()

const searchCondition = ref('id')
const useState = ref('Y')
const keyword = ref('')
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
    team: '마케팅전략담당',
    use: 'Y',
    loginDate: '2024-05-29 10:12:31'
  },
  {
    index: 2,
    userId: 'id_2',
    name: '김길동',
    team: '고객유지담당',
    use: 'Y',
    loginDate: '2024-05-29 10:12:31'
  },
  {
    index: 3,
    userId: 'id_3',
    name: '남길동',
    team: '영업정책담당',
    use: 'N',
    loginDate: '2024-05-29 10:12:31'
  },
  {
    index: 4,
    userId: 'id_4',
    name: '강길동',
    team: '채널혁신담당',
    use: 'N',
    loginDate: '2024-05-29 10:12:31'
  },
  {
    index: 5,
    userId: 'id_5',
    name: '마길동',
    team: '마케팅전략담당',
    use: 'Y',
    loginDate: '2024-05-29 10:12:31'
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'id',
  use: 'Y',
  keyword: '',
  page: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  use: '',
  keyword: '',
  page: 1,
})
const totalCount = ref(0)
const userList = ref<IUserData[]>([])

const getParams = (searchParam: ISearchParams) => {
  const params = {
    searchCondition: searchParam.searchCondition,
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
  searchParam.searchCondition = 'id'
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
  searchedParam.use = searchParam.use
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.page = 1
  searchParam.page = 1
  getUserList(params)
}

const UserPopup = defineAsyncComponent(() => import('../components/UserPopup.vue'))
const handleUserDetail = (data: IUserData) => {
  userId.value = data.userId
  try {
    showFromFile({
      component: UserPopup,
      title: '사용자 설정',
      props: { userId },
      width: 'var(--modal-width-md)',
      showClose: true,
    })
  }
  catch (error) {
    console.error(error)
  }
}

const handleCancel = () => {
  userPopupSignal.value = false
}

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div class="data-source">
    <div class="mb-4">
      <h2 class="mgmt__title">
        사용자 관리
      </h2>
    </div>
    <form class="form__search">
      <div class="form">
        <label class="form__label">검색 조건</label>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" label="검색 조건" />
      </div>
      <div class="form">
        <label class="form__label">사용 여부</label>
        <basic-select-box v-model="searchParam.use" :options="useStateOptions" label="답변 상태" />
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
    </div>
    <div class="mgmt__box">
      <el-table :data="userList" style="width: 100%" @row-dblclick="handleUserDetail">
        <el-table-column prop="index" label="번호" min-width="100" align="center" />
        <el-table-column prop="userId" label="아이디" min-width="200" align="center" />
        <el-table-column prop="name" label="이름" min-width="200" align="center" />
        <el-table-column prop="team" label="부서" min-width="300" align="center" />
        <el-table-column prop="use" label="사용여부" min-width="100" align="center">
          <template v-slot="scope">
            <p>
              {{ scope.row.use === 'Y' ? '사용' : '사용중지' }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="loginDate" label="최근 로그인 일시" min-width="300" align="center" />
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
    <UserPopup @close-popup="handleCancel" v-model="userPopupSignal" :user-id="userId" />
  </div>
</template>
<style></style>