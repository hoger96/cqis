<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'

const router = useRouter()
const { t } = useI18n()
const batchTypeOptions = ref([
  {
    value: 'type1',
    label: 'type1'
  },
  {
    value: 'type2',
    label: 'type2'
  },
])
const dataSet = reactive({
  name: '',
  description: '',
  batchType: '',
  batchPeriod: '',
  job: '',
  playTime: ''
})
const targetTable = ref<[]>([])

const addRowspan = ({
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (columnIndex === 0) {
    const currentId = tableData[rowIndex].id;
    if (currentId === 'Source') {
      if (rowIndex === 0 || tableData[rowIndex - 1].id !== 'Source') {
        let rowspan = 1;
        for (let i = rowIndex + 1; i < tableData.length; i++) {
          if (tableData[i].id === 'Source') {
            rowspan++;
          } else {
            break;
          }
        }
        return {
          rowspan,
          colspan: 1,
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    }
  }
}

const tableData: RowList[] = [
  {
    id: 'Source',
    tableName: '',
    column: '',
    description: ''
  },
  {
    id: 'Target',
    tableName: '',
    column: '',
    description: ''
  },
]

const addSource = (tableIndex: number) => {
  const newSource = {
    id: 'Source',
    tableName: '',
    column: '',
    description: ''
  }
  const targetIndex = targetTable.value[tableIndex].findIndex(i => i.id === 'Target')
  targetTable.value[tableIndex].splice(targetIndex, 0, newSource)
}


const deleteSource = (tableIndex: number, rowIndex: number) => {
  targetTable.value[tableIndex].splice(rowIndex, 1)
}

const addTargetTable = () => {
  const newTable = [
    {
      id: 'Source',
      tableName: '',
      column: '',
      description: ''
    },
    {
      id: 'Target',
      tableName: '',
      column: '',
      description: ''
    },
  ]
  targetTable.value.push(newTable)
}

const handleCreateDataSet = () => {
  try {
    const data = {
      datasetName: dataSet.name,
      datasetDescription: dataSet.description,
      targetTableList: targetTable.value,
      batchType: dataSet.batchType,
      batchPeriod: dataSet.batchPeriod,
      job: dataSet.job,
      playTime: dataSet.playTime
    }
    // const res = await request({
    //   method: 'POST',
    //   url: `/dataset`,
    //   data
    // })
    console.log('등록: ', data)
    router.push({ path: '/admin/pages/data-set' })
  }
  catch (error) {
    console.error(error)
  }
}

const handleGoDataSetPage = () => {
  router.push({ path: '/admin/pages/data-set' })
}

onMounted(() => {
  targetTable.value = [tableData]
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('data-set.title') }} {{ t('common.button.create') }}
    </h2>
    <form class="form content__box">
      <FormItem :label="t('data-set.label.data-set')" required>
        <CustomInput v-model="dataSet.name" :placeholder="t('data-set.placeholder.name')" />
      </FormItem>
      <FormItem :label="t('data-set.label.description')" required>
        <CustomTextarea v-model="dataSet.description" :placeholder="t('data-set.placeholder.description')" />
      </FormItem>

      <FormItem :label="t('data-set.label.target-table')" required form-col use-btn>
        <template #label-btn>
          <button type="button" class="btn__secondary--sm" @click="addTargetTable">
            {{ t('common.button.add') }}
          </button>
        </template>
        <div v-for="(table, tableIndex) in targetTable" :key="tableIndex" class="mb-2.5 box--f7f">
          <el-table :data="table" :span-method="addRowspan" style="width: 100%;" class="no-hover">
            <el-table-column prop="id" align="center" min-width="15" />
            <el-table-column prop="tableName" :label="t('data-set.label.table')" min-width="25">
              <template #default="scope">
                <CustomInput v-model="scope.row.tableName" :placeholder="t('data-set.label.table')" />
              </template>
            </el-table-column>
            <el-table-column prop="column" :label="t('data-set.label.column')" min-width="25">
              <template #default="scope">
                <CustomInput v-model="scope.row.column" :placeholder="t('data-set.label.column')" />
              </template>
            </el-table-column>
            <el-table-column prop="description" :label="t('data-set.label.dd')" min-width="25">
              <template #default="scope">
                <CustomInput v-model="scope.row.description" :placeholder="t('data-set.label.dd')" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="row" min-width="10">
              <template #default="scope">
                <div v-if="scope.row.id === 'Source'" class="flex justify-center">
                  <button v-if="scope.$index === 0" type="button" class="mr-2.5" @click="addSource(tableIndex)">
                    <icon name="plus-round__full" width="32" height="32" :alt="t('common.button.add')" />
                  </button>
                  <button type="button" @click="deleteSource(tableIndex, scope.$index)">
                    <icon name="minus-round__full" width="32" height="32" :alt="t('common.button.delete')" />
                  </button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <p>&#8251; Sorce 테이블을 추가 하시려면 &#39;&#43;&#39; 버튼을 클릭해주세요.</p>
          <p class="mt-1">&#8251; Target Table 이 여러 개 일경우 &#39;추가&#39; 버튼을 클릭해주세요.</p>
        </div>
      </FormItem>
      <FormItem :label="t('data-set.label.batch')" required use-group>
        <basic-select-box v-model="dataSet.batchType" :options="batchTypeOptions"
          :placeholder="t('data-set.placeholder.batch-type')" />
        <CustomInput v-model="dataSet.batchPeriod" :placeholder="t('data-set.placeholder.name')" />
      </FormItem>
      <FormItem :label="t('data-set.label.first-job')" required>
        <CustomInput v-model="dataSet.job" :placeholder="t('data-set.placeholder.first-job')" />
      </FormItem>
      <FormItem :label="t('data-set.label.batch-time')" required>
        <CustomInput v-model="dataSet.playTime" :placeholder="t('data-set.placeholder.batch-time')" />
      </FormItem>
    </form>
    <div class="content__btns">
      <button type="button" class="btn__secondary--lg" @click="handleGoDataSetPage">
        {{ t('common.button.cancel') }}
      </button>
      <button type="button" class="btn__primary--lg" @click="handleCreateDataSet">
        {{ t('common.button.save') }}
      </button>
    </div>
  </div>
</template>
<style></style>