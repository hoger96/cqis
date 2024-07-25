<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ISearchParams, IQnaData } from '../types/qna.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchCondition = ref('제목')
const keyword = ref('')
const deletedQna = ref<string[]>([])
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
const searchStateOptions = [
  {
    value: 'wait',
    label: '대기'
  },
  {
    value: 'complete',
    label: '완료'
  },
]
const mockupList = ref([
  {
    index: 1,
    qnaId: 'qna_1',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    state: 'wait'
  },
  {
    index: 2,
    qnaId: 'qna_2',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    state: 'complete'
  },
  {
    index: 3,
    qnaId: 'qna_3',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    state: 'wait'
  },
  {
    index: 4,
    qnaId: 'qna_4',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    state: 'complete'
  },
  {
    index: 5,
    qnaId: 'qna_5',
    title: '[보안공지]전사 보안규정/지침/가이드안내',
    createUser: 'admin',
    createDate: '2024-07-18',
    state: 'wait'
  }
])


const searchParam = reactive<ISearchParams>({
  searchCondition: 'title',
  state: 'wait',
  keyword: '',
  page: 1,
})
const searchedParam = reactive<ISearchParams>({
  searchCondition: '',
  state: '',
  keyword: '',
  page: 1,
})
const totalCount = ref(0)
const qnaList = ref<IQnaData[]>([])

const getParams = (searchParam: ISearchParams) => {
  const params = {
    searchCondition: searchParam.searchCondition,
    state: searchParam.state,
    keyword: searchParam.keyword,
    page: searchParam.page,
  }
  return params
}

const changePage = async (newPage: number) => {
  searchedParam.page = newPage
  searchParam.page = newPage
  const params = getParams(searchedParam)
  getQnaList(params)
}

const handleReset = () => {
  searchParam.searchCondition = 'title'
  searchParam.state = 'wait'
  searchParam.keyword = ''
}

const getQnaList = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/qna',
    //   params,
    // })
    qnaList.value = mockupList.value
    totalCount.value = qnaList.value.length
  }
  catch (error) {
    console.error(error)
  }
}

const handleSearch = () => {
  searchedParam.searchCondition = searchParam.searchCondition
  searchedParam.state = searchParam.state
  searchedParam.keyword = searchParam.keyword
  const params = getParams(searchedParam)
  params.page = 1
  searchParam.page = 1
  getQnaList(params)
}

const handleQnaDetail = (e) => {
  router.push({ path: `/admin/qna/${e.qnaId}` })
}

const handleSelectionChange = (target: IQnaData[]) => {
  deletedQna.value = target.map(i => i.qnaId)
}

const handleDeleteQna = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'DELETE',
    //   url: '/faq',
    //   deletedFaq.value,
    // })
    console.log(deletedQna.value)
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
        Q&A 관리자
      </h2>
    </div>
    <form class="form__search">
      <div class="form">
        <label class="form__label">검색 조건</label>
        <basic-select-box v-model="searchParam.searchCondition" :options="searchConditionOptions" label="검색 조건" />
      </div>
      <div class="form">
        <label class="form__label">답변 상태</label>
        <basic-select-box v-model="searchParam.state" :options="searchStateOptions" label="답변 상태" />
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
      <button type="button" class="btn__secondary--md" @click="handleDeleteQna">
        삭제
      </button>
    </div>
    <div class="mgmt__box">
      <el-table :data="qnaList" style="width: 100%" @row-click="handleQnaDetail"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="index" label="번호" min-width="200" align="center" />
        <el-table-column prop="title" label="제목" min-width="450" align="center" />
        <el-table-column prop="createUser" label="등록자" min-width="200" align="center" />
        <el-table-column prop="createDate" label="등록일" min-width="200" align="center" />
        <el-table-column prop="state" label="상태" min-width="200" align="center">
          <template v-slot="scope">
            <p>
              {{ scope.row.state === 'wait' ? '대기' : '완료' }}
            </p>
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-model="searchParam.page" :total-count="totalCount" :limit="10" below-limit-shown
        @update:model-value="changePage" />
    </div>
  </div>
</template>
<style></style>