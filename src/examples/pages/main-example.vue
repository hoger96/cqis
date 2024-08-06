<script setup lang="ts">
const anncTable = [
  {
    title: '[보안공지] 전사 보안규정/지침/가이드 안내',
    date: '2024-04-29',
  },
  {
    title: '[보안공지] 전사 보안규정/지침/가이드 안내',
    date: '2024-04-29',
  },
  {
    title: '[보안공지] 전사 보안규정/지침/가이드 안내',
    date: '2024-04-29',
  },
  {
    title: '[보안공지] 전사 보안규정/지침/가이드 안내',
    date: '2024-04-29',
  },
  {
    title: '[보안공지] 전사 보안규정/지침/가이드 안내',
    date: '2024-04-29',
  },
]
const batchTable = [
  {
    code: 'B003',
    name: '배치이름1',
    state: '실패',
    startDate: '2024-04-29 12:34:56',
    endDate: '',
    count: '',
  },
  {
    code: 'B003',
    name: '배치이름1',
    state: '실패',
    startDate: '2024-04-29 12:34:56',
    endDate: '',
    count: '',
  },
  {
    code: 'B003',
    name: '배치이름1',
    state: '실패',
    startDate: '2024-04-29 12:34:56',
    endDate: '',
    count: '',
  },
]
</script>
<template>
  <div class="home">
    <div class="home__table-wrap">
      <div class="home__table content__box">
        <h2 class="title--sm"><a href="/system/announcement/admin-index">공지사항</a></h2>
        <el-table :data="anncTable" style="width: 100%;">
          <el-table-column type="index" label="번호" min-width="60" align="center" />
          <el-table-column prop="title" label="제목" min-width="60" />
          <el-table-column prop="date" align="center" label="등록일" />
        </el-table>
      </div>
      <div class="home__table content__box">
        <h2 class="title--sm"><a href="#">미승인 사용자</a></h2>
        <el-table :data="anncTable" style="width: 100%;">
          <el-table-column type="index" label="번호" min-width="60" align="center" />
          <el-table-column prop="title" label="제목" min-width="60" />
          <el-table-column prop="date" align="center" label="등록일" />
        </el-table>
      </div>
    </div>
    <div class="home__table content__box">
      <h2 class="title--sm"><a href="#">배치 실행 이력</a></h2>
      <el-table :data="batchTable" style="width: 100%;">
        <el-table-column type="index" label="번호" align="center" />
        <el-table-column prop="code" label="배치코드" align="center" />
        <el-table-column prop="name" label="배치이름" />
        <el-table-column prop="state" label="배치상태" />
        <el-table-column prop="startDate" label="작업 시작 일시" align="center" />
        <el-table-column prop="endDate" label="작업 종료 일시" align="center" />
        <el-table-column prop="count" label="작업건수" align="center" />
        <el-table-column prop="redo" label="재실행">
          <template #default="scope">
            <div class="flex justify-center">
              <button type="button" class="btn__primary-line--md">
                재실행
              </button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<route lang="yaml">
  name: main-example
  meta:
    isPublicPath: true
    layout: default
  </route>