<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

const uiComponentData = reactive<any[]>([
  {
    name: 'common-code-example',
    desc: '공통코드관리 에제',
  },
  {
    name: 'button',
    desc: 'button',
  },
  {
    name: 'datepicker',
    desc: 'Range Datepicker',
  },
  {
    name: 'editor-example',
    desc: 'Editor Example',
  },
  {
    name: 'form',
    desc: 'Form / SearchForm / File',
  },
  {
    name: 'textfield',
    desc: 'input / textarea / select',
  },
  {
    name: 'selector',
    desc: 'checkbox / radio',
  },
  {
    name: 'table',
    desc: 'table / Pagination',
  },
  {
    name: 'popup',
    desc: 'Popup',
  },
  {
    name: 'tree',
    desc: 'Tree',
  },
  // {
  //   name: 'chart',
  //   desc: ' line  / bar  / pie  / tree',
  // },
  // {
  //   name: 'chart-js',
  //   desc: 'chartjs example',
  // },
  {
    name: 'icon-example',
    desc: 'Icon Image Example',
  },
])

const movePage = (target: any) => {
  router.push(`/examples/${target.name}`)
}
</script>

<template>
  <div class="p-20 examples">
    <h1 class="mb-10 text-3xl font-semibold">
      UI Examples
    </h1>
    <div class="p-10 bg-white rounded-3xl">
      <el-table :data="uiComponentData" row-class-name="cursor-pointer" @row-click="movePage">
        <el-table-column type="index" width="'5%'" />
        <el-table-column property="name" label="Name" width="'20%'" />
        <el-table-column property="desc" label="Description" width="'75%'" />
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
name: ui-examples
meta:
  isPublicPath: true
  layout: empty
</route>
