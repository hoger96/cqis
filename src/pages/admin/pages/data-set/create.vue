<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IAnnouncementCreate } from '../types/announcement.ts'
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
const targetTableList = ref<[]>([
  {
    sourceList: [
      {
        tableName: '',
        column: '',
        description: '',
      }
    ],
    target: {
      tableName: '',
      column: '',
      description: '',
    }
  }
])

const handleGoDataSetPage = () => {
  router.push({ path: '/admin/pages/data-set' })
}

const handleCreateDataSet = () => {
  try {
    const data = {
      title: dataSet.name,
      description: dataSet.description,
      targetTableList: targetTableList.value,
      batchType: dataSet.batchType,
      batchPeriod: dataSet.batchPeriod,
      job: dataSet.job,
      playTime: dataSet.playTime
    }
    console.log('등록: ', data)
    router.push({ path: '/admin/pages/data-set' })
  } catch (error) {
    console.error(error)
  }
}

const handleAddTargetTable = () => {
  const newData = {
    sourceList: [
      {
        tableName: '',
        column: '',
        description: '',
      }
    ],
    target: {
      tableName: '',
      column: '',
      description: ''
    }
  }
  targetTableList.value.push(newData)
}

const handleAddSource = (index: number) => {
  const newData = {
    tableName: '',
    column: '',
    description: '',
  }
  targetTableList.value[index].sourceList.push(newData)
}

const handleRemoveSource = (tableIndex: number, sourceIndex: number) => {
  targetTableList.value[tableIndex].sourceList.splice(sourceIndex, 1)
}

// FIXME 개발자 : 퍼블리싱하면서 임시 추가한 영역입니다.
interface RowList {
  id: string
  tableName: string
  column: string
  description: string
}

interface SpanMethodProps {
  row: RowList
  rowIndex: number
  columnIndex: number
}

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
          <button type="button" class="btn__secondary--sm">
            {{ t('common.button.add') }}
          </button>
        </template>
        <!-- FIXME 개발자 :: 추가버튼 클릭 시 아래 div가 복제되도록 요청드립니다.
        table 형태로 변경하면서 이전 소스는 주석처리하였습니다. -->
        <div class="mb-2.5 box--f7f">
          <el-table :data="tableData" :span-method="addRowspan" style="width: 100%;" class="no-hover">
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
                  <button type="button" class="mr-2.5">
                    <icon name="plus-round__full" width="32" height="32" :alt="t('common.button.add')" />
                  </button>
                  <button type="button">
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
      <!-- <FormItem :label="t('data-set.label.target-table')" required>
        <button type="button" class="btn__secondary--sm" @click="handleAddTargetTable">
          {{ t('common.button.add') }}
        </button>

        <div v-for="(targetTable, index) in targetTableList" :key="index" class="p-3 m-5">
          <FormItem :label="t('data-set.table.source')" required>
            <div v-for="(source, sourceIndex) in targetTable.sourceList" :key="sourceIndex" class="flex">
              <CustomInput v-model="source.tableName" :placeholder="t('data-set.label.table')" />
              <CustomInput v-model="source.column" :placeholder="t('data-set.label.column')" />
              <CustomInput v-model="source.description" :placeholder="t('data-set.label.dd')" />
              <button v-if="sourceIndex === 0" type="button" class="btn__secondary--sm" @click="handleAddSource(index)">
                {{ t('common.button.add') }}
              </button>
              <button v-if="targetTable.sourceList.length > 1" type="button" class="btn__secondary--sm"
                @click="handleRemoveSource(index, sourceIndex)">
                {{ t('common.button.delete') }}
              </button>
            </div>
          </FormItem>
          <FormItem :label="t('data-set.table.target')" required>
            <CustomInput v-model="targetTable.target.tableName" :placeholder="t('data-set.label.table')" />
            <CustomInput v-model="targetTable.target.column" :placeholder="t('data-set.label.column')" />
            <CustomInput v-model="targetTable.target.description" :placeholder="t('data-set.label.dd')" />
          </FormItem>
        </div>
      </FormItem> -->
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