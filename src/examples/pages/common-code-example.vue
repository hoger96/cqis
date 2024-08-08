<script setup lang="ts">
import { ref } from 'vue'
const keyword = ref('')
const useStates = ref('Y')
const groupCode = ref('1')
const groupCodeOption = [
  {
    value: '1',
    label: '그룹 코드',
  },
  {
    value: '2',
    label: '그룹 코드 명',
  },
]
const totalCount = ref(1)

const groupCodeList = [
  {
    code: 'Alfreds',
    codeName: 'Futterkiste',
    desc: 'AlfredsAlfredsAlfredsAlfredsAlfreds',
    useStatus: '사용',
  },
]
const codeList = [
  {
    code: 'Alfreds',
    codeName: 'Futterkiste',
    codeValue: 'Futterkiste',
    desc: 'AlfredsAlfredsAlfredsAlfredsAlfreds',
    sequence: '20',
    useStatus: '사용',
  }
]

const handleSearch = () => { }
const handleReset = () => { }
</script>
<template>
  <div class="common-code">
    <h2 class="title">공통 코드 관리</h2>
    <div class="common-code__wrap">
      <div class="common-code__content">
        <SearchForm use-reset @search="handleSearch" @clear="handleReset">
          <h3 class="title--sm">그룹 코드 검색</h3>
          <SearchItem label="사용여부">
            <el-radio-group v-model="useStates">
              <el-radio value="Y">
                사용
              </el-radio>
              <el-radio value="N">
                사용 중지
              </el-radio>
            </el-radio-group>
          </SearchItem>
          <SearchItem>
            <basic-select-box v-model="groupCode" :options="groupCodeOption" />
            <CustomInput v-model="keyword" placeholder="검색어를 입력하세요" />
          </SearchItem>
        </SearchForm>
        <div class="content__box">
          <div class="table-header">
            <span class="table-header__total">
              총<em>{{ totalCount }}</em>건
            </span>
            <button type="button" class="table-header__btn btn__secondary--sm">
              그룹 코드 등록
            </button>
          </div>
          <el-table :data="groupCodeList" style="width: 100%">
            <el-table-column prop="code" label="그룹코드" min-width="20" />
            <el-table-column prop="codeName" label="그룹코드명" min-width="20" />
            <el-table-column prop="desc" label="설명" min-width="45" />
            <el-table-column prop="useStatus" label="사용여부" min-width="15" align="center" />
          </el-table>
          <Pagination v-model="totalCount" />
        </div>
      </div>
      <div class="common-code__content">
        <SearchForm use-reset @search="handleSearch" @clear="handleReset">
          <h3 class="title--sm">코드 검색</h3>
          <SearchItem label="사용여부">
            <el-radio-group v-model="useStates">
              <el-radio value="Y">
                사용
              </el-radio>
              <el-radio value="N">
                사용 중지
              </el-radio>
            </el-radio-group>
          </SearchItem>
          <SearchItem>
            <basic-select-box v-model="groupCode" :options="groupCodeOption" />
            <CustomInput v-model="keyword" placeholder="검색어를 입력하세요" />
          </SearchItem>
        </SearchForm>
        <div class="content__box">
          <div class="table-header">
            <span class="table-header__total">
              총<em>{{ totalCount }}</em>건
            </span>
            <button type="button" class="table-header__btn btn__secondary--sm">
              코드 등록
            </button>
          </div>
          <el-table :data="codeList" style="width: 100%">
            <el-table-column prop="code" label="코드" min-width="15" />
            <el-table-column prop="codeName" label="코드명" min-width="20" />
            <el-table-column prop="codeValue" label="코드값" min-width="20" />
            <el-table-column prop="desc" label="설명" min-width="20" />
            <el-table-column prop="sequence" label="순서" min-width="10" align="center" />
            <el-table-column prop="useStatus" label="사용여부" min-width="15" align="center" />
          </el-table>
          <Pagination v-model="totalCount" />
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
  name: common-code-example
  meta:
    isPublicPath: true
    layout: default
  </route>