<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

const uiComponentData = reactive<any[]>([
  {
    name: 'button',
    desc: 'button',
  },
  {
    name: 'chart',
    desc: ' line  / bar  / pie  / tree',
  },
  {
    name: 'datepicker',
    desc: 'vue-date-picker example',
  },
  {
    name: 'editor-example',
    desc: 'Editor Example',
  },
  {
    name: 'file',
    desc: 'File',
  },
  {
    name: 'form',
    desc: 'input / textarea / select / checkbox / radio',
  },
  {
    name: 'grid',
    desc: 'Grid / Pagination',
  },
  {
    name: 'popup',
    desc: 'Popup',
  },
  {
    name: 'tree',
    desc: 'Tree',
  },
  {
    name: 'chart-js',
    desc: 'chartjs example',
  },
  {
    name: 'icon-example',
    desc: 'Icon Image Example',
  },
])

const movePage = (target: any) => {
  router.push(`/example/${target.name}`)
}
</script>

<template>
  <div class="p-20 examples">
    <h1 class="mb-10 text-3xl font-semibold">
      UI Examples
    </h1>

    <el-table :data="uiComponentData" row-class-name="cursor-pointer" @row-click="movePage">
      <el-table-column type="index" width="'5%'" />
      <el-table-column property="name" label="Name" width="'20%'" />
      <el-table-column property="desc" label="Description" width="'75%'" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
name: ui-examples
meta:
  isPublicPath: true
</route>
