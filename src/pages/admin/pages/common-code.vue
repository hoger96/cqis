<script setup lang="ts">
import { ref } from 'vue'
import { ISearchParams, ISearchParamsCode, IGroupCode, ICode } from '../types/common-code.ts'
import GroupCodePopup from '../components/GroupCodePopup.vue'
import CodePopup from '../components/CodePopup.vue'

const { t } = useI18n()

const groupCodeOption = [
  {
    value: 'groupCode',
    label: '그룹 코드',
  },
  {
    value: 'groupCodeName',
    label: '그룹 코드 명',
  },
]
const codeOption = [
  {
    value: 'code',
    label: '코드',
  },
  {
    value: 'codeName',
    label: '코드 명',
  },
]
const mockupGroupCode = [
  {
    groupCode: 'groupCode1',
    groupCodeName: '그룹코드1',
    groupCodeDesc: '그룹코드1 입니다.',
    useStatus: 'Y'
  },
  {
    groupCode: 'groupCode2',
    groupCodeName: '그룹코드2',
    groupCodeDesc: '그룹코드2 입니다.',
    useStatus: 'N'
  },
  {
    groupCode: 'groupCode3',
    groupCodeName: '그룹코드3',
    groupCodeDesc: '그룹코드3 입니다.',
    useStatus: 'Y'
  }
]
const mockupCode = [
  {
    code: 'code1',
    codeName: '코드1',
    codeValue: 'code1',
    codeDesc: '코드1 입니다.',
    codeSeq: 0,
    useStatus: 'Y'
  },
  {
    code: 'code2',
    codeName: '코드2',
    codeValue: 'code2',
    codeDesc: '코드2 입니다.',
    codeSeq: 1,
    useStatus: 'Y'
  },
  {
    code: 'code3',
    codeName: '코드3',
    codeValue: 'code3',
    codeDesc: '코드3 입니다.',
    codeSeq: 2,
    useStatus: 'Y'
  },
]

const searchParamGroup = reactive<ISearchParams>({
  searchCondition: 'groupCode',
  use: 'Y',
  keyword: '',
  page: 1,
})
const searchedParamGroup = reactive<ISearchParams>({
  searchCondition: '',
  use: '',
  keyword: '',
  page: 1,
})

const searchParamCode = reactive<ISearchParamsCode>({
  groupCode: '',
  searchCondition: 'code',
  use: 'Y',
  keyword: '',
  page: 1,
})
const searchedParamCode = reactive<ISearchParamsCode>({
  groupCode: '',
  searchCondition: '',
  use: '',
  keyword: '',
  page: 1,
})
const totalGroupCode = ref(0)
const totalCode = ref(0)
const groupCodeList = ref<IGroupCode[]>([])
const codeList = ref<ICode[]>([])
const groupCodePopupSignal = ref(false)
const codePopupSignal = ref(false)
const groupCodeId = ref('')
const codeId = ref('')
const groupCodePopupMode = ref('')
const codePopupMode = ref('')

const getParams = (searchParam: ISearchParams) => {
  const params = {
    searchCondition: searchParam.searchCondition,
    use: searchParam.use,
    keyword: searchParam.keyword,
    page: searchParam.page,
  }
  return params
}

const getGroupCode = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/groupCode',
    //   params,
    // })
    groupCodeList.value = mockupGroupCode
    totalGroupCode.value = groupCodeList.value.length
  }
  catch (error) {
    console.error(error)
  }
}
const getCode = (params: ISearchParams) => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: `/code/${groupCodeId.value}`,
    //   params,
    // })
    codeList.value = mockupCode
    totalCode.value = codeList.value.length
  }
  catch (error) {
    console.error(error)
  }
}

const handleSearchGroupCode = () => {
  searchedParamGroup.searchCondition = searchParamGroup.searchCondition
  searchedParamGroup.use = searchParamGroup.use
  searchedParamGroup.keyword = searchParamGroup.keyword
  const params = getParams(searchedParamGroup)
  params.page = 1
  searchParamGroup.page = 1
  getGroupCode(params)
}
const handleSearchCode = (data: IGroupCode) => {
  groupCodeId.value = data.groupCode
  searchedParamCode.searchCondition = searchParamCode.searchCondition
  searchedParamCode.use = searchParamCode.use
  searchedParamCode.keyword = searchParamCode.keyword
  const params = getParams(searchedParamCode)
  params.page = 1
  searchParamCode.page = 1
  getCode(params)
}

const changePageGroupCode = async (newPage: number) => {
  searchedParamGroup.page = newPage
  searchParamGroup.page = newPage
  const params = getParams(searchedParamGroup)
  getGroupCode(params)
}
const changePageCode = async (newPage: number) => {
  searchedParamCode.page = newPage
  searchParamCode.page = newPage
  const params = getParams(searchedParamCode)
  getCode(params)
}

const handleResetGroupCode = () => {
  searchParamGroup.searchCondition = 'groupCode',
    searchParamGroup.use = 'Y',
    searchParamGroup.keyword = ''
}
const handleResetCode = () => {
  searchParamCode.searchCondition = 'code',
    searchParamCode.use = 'Y',
    searchParamCode.keyword = ''
}

const handleAddGroupCode = () => {
  groupCodeId.value = ''
  groupCodePopupSignal.value = true
  groupCodePopupMode.value = 'Create'
}
const handleAddCode = () => {
  codeId.value = ''
  codePopupSignal.value = true
  codePopupMode.value = 'Create'
}

const handleCancelGroupCode = () => {
  groupCodePopupSignal.value = false
}
const handleCancelCode = () => {
  codePopupSignal.value = false
}

const handleGroupCodeDetail = (data: IGroupCode) => {
  groupCodeId.value = data.groupCode
  groupCodePopupSignal.value = true
  groupCodePopupMode.value = 'Detail'
}
const handleCodeDetail = (data: ICode) => {
  codeId.value = data.code
  codePopupSignal.value = true
  codePopupMode.value = 'Detail'
}

const handleUpdateGroupCode = (data) => {
  try {
    // FIXME: api 연결
    console.log(data)
    // const res = await request({
    //   method: 'POST',
    //   url: '/user/${userId.value}',
    //   userInfo,
    // })
    console.log('수정 or 등록')
  }
  catch (error) {
    console.error(error)
  }
}
const handleUpdateCode = (data) => {
  try {
    // FIXME: api 연결
    console.log(data)
    // const res = await request({
    //   method: 'POST',
    //   url: '/user/${userId.value}',
    //   userInfo,
    // })
    console.log('수정 or 등록')
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  handleSearchGroupCode()
})

// FIXME :: 퍼블리싱 수정 영역
const searchStatusOption = [
  {
    label: '사용',
    value: 'Y'
  },
  {
    label: '사용 중지',
    value: 'N'
  },
] 
</script>
<template>
  <div class="common-code">
    <h2 class="title">
      {{ t('comm-code.title') }}
    </h2>
    <div class="common-code__wrap">
      <div class="common-code__content">
        <SearchForm use-reset @search="handleSearchGroupCode" @clear="handleResetGroupCode">
          <h3 class="title--sm">{{ t('comm-code.label.group-code') }}</h3>
          <SearchItem :label="t('common.search-bar.condition')">
            <basic-select-box v-model="searchParamGroup.searchCondition" :options="groupCodeOption" />
          </SearchItem>
          <SearchItem :label="t('common.search-bar.use')">
            <basic-select-box v-model="searchParamGroup.use" :options="searchStatusOption" />
            <!-- <el-radio-group v-model="searchParamGroup.use">
              <el-radio value="Y">
                {{ t('common.label.use-yes') }}
              </el-radio>
              <el-radio value="N">
                {{ t('common.label.use-no') }}
              </el-radio>
            </el-radio-group> -->
          </SearchItem>
          <SearchItem :label="t('common.search-bar.keyword')">
            <CustomInput v-model="searchParamGroup.keyword" :placeholder="t('common.search-bar.placeholder')" />
          </SearchItem>
        </SearchForm>
        <div class="content__box">
          <div class="table-header">
            <span class="table-header__total">
              {{ t('common.label.total') }} <em>{{ totalGroupCode }}</em>{{ t('common.label.count') }}
            </span>
            <button type="button" class="table-header__btn btn__secondary--sm" @click="handleAddGroupCode">
              {{ t('common.button.create') }}
            </button>
          </div>
          <el-table :data="groupCodeList" style="width: 100%" @row-dblclick="handleGroupCodeDetail"
            @row-click="handleSearchCode">
            <el-table-column prop="groupCode" :label="t('comm-code.label.group-code')" min-width="20" align="center" />
            <el-table-column prop="groupCodeName" :label="t('comm-code.label.group-code-name')" min-width="20"
              align="center" />
            <el-table-column prop="groupCodeDesc" :label="t('comm-code.label.description')" min-width="45" />
            <el-table-column prop="useStatus" :label="t('common.search-bar.use')" min-width="15" align="center">
              <template v-slot="scope">
                <p>
                  {{ scope.row.useStatus === 'Y' ? t('common.label.use-yes') :
        t('common.label.use-no')
                  }}
                </p>
              </template>
            </el-table-column>
          </el-table>
          <Pagination v-model="searchParamGroup.page" :total-count="totalGroupCode" :limit="10" below-limit-shown
            @update:model-value="changePageGroupCode" />
        </div>
      </div>
      <div class="common-code__content">
        <SearchForm use-reset @search="handleSearchCode" @clear="handleResetCode">
          <h3 class="title--sm">{{ t('comm-code.label.code') }}</h3>
          <SearchItem :label="t('common.search-bar.condition')">
            <basic-select-box v-model="searchParamCode.searchCondition" :options="codeOption" />
          </SearchItem>
          <SearchItem :label="t('common.search-bar.use')">
            <basic-select-box v-model="searchParamCode.use" :options="searchStatusOption" />
            <!-- <el-radio-group v-model="searchParamCode.use">
              <el-radio value="Y">
                {{ t('common.label.use-yes') }}
              </el-radio>
              <el-radio value="N">
                {{ t('common.label.use-no') }}
              </el-radio>
            </el-radio-group> -->
          </SearchItem>
          <SearchItem :label="t('common.search-bar.keyword')">
            <CustomInput v-model="searchParamCode.keyword" :placeholder="t('common.search-bar.placeholder')" />
          </SearchItem>
        </SearchForm>
        <div class="content__box">
          <div class="table-header">
            <span class="table-header__total">
              {{ t('common.label.total') }} <em>{{ totalCode }}</em>{{ t('common.label.count') }}
            </span>
            <button type="button" class="table-header__btn btn__secondary--sm" @click="handleAddCode">
              {{ t('common.button.create') }}
            </button>
          </div>
          <el-table :data="codeList" style="width: 100%" @row-dblclick="handleCodeDetail">
            <el-table-column prop="code" :label="t('comm-code.label.code')" align="center" min-width="15" />
            <el-table-column prop="codeName" :label="t('comm-code.label.code-name')" align="center" min-width="20" />
            <el-table-column prop="codeValue" :label="t('comm-code.label.code-value')" align="center" min-width="20" />
            <el-table-column prop="codeDesc" :label="t('comm-code.label.description')" min-width="20" />
            <el-table-column prop="codeSeq" :label="t('comm-code.label.sequence')" align="center" min-width="10" />
            <el-table-column prop="useStatus" :label="t('common.search-bar.use')" align="center" min-width="15">
              <template v-slot="scope">
                <p>
                  {{ scope.row.useStatus === 'Y' ? t('common.label.use-yes') :
        t('common.label.use-no')
                  }}
                </p>
              </template>
            </el-table-column>
          </el-table>
          <Pagination v-model="searchParamCode.page" :total-count="totalCode" :limit="10" below-limit-shown
            @update:model-value="changePageCode" />
        </div>
      </div>
    </div>
  </div>
  <GroupCodePopup v-model:model-value="groupCodePopupSignal" :group-code-id="groupCodeId"
    @cancel="handleCancelGroupCode" @confirm="handleUpdateGroupCode" :popup-mode="groupCodePopupMode" />
  <CodePopup v-model:model-value="codePopupSignal" :code-id="codeId" @cancel="handleCancelCode"
    @confirm="handleUpdateCode" :popup-mode="codePopupMode" />
</template>
<style></style>