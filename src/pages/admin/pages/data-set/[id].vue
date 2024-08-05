<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'

const router = useRouter()
const { t } = useI18n()
const updateMode = ref(false)

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
    tableName: '소스테이블1',
    column: '소스컬럼1',
    description: '소스설명1'
  },
  {
    id: 'Source',
    tableName: '소스테이블1-2',
    column: '소스컬럼1-2',
    description: '소스설명1-2'
  },
  {
    id: 'Target',
    tableName: '타겟테이블1',
    column: '타겟컬럼1',
    description: '타겟설명1'
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

const handleGetDataset = async () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: `/dataset/${datasetId.value}`
    // })
    const res = await {
      name: '데이터셋1',
      description: '데이터셋1 입니다.',
      batchType: 'type1',
      batchPeriod: '주 3회',
      job: '선행 job',
      playTime: '2시간'
    }
    return res
  }
  catch (error: Error) {
    console.error(error)
  }
}

const handleSetDataset = async () => {
  try {
    const data = await handleGetDataset()
    dataSet
      .name = data.name
    dataSet
      .description = data.description
    dataSet
      .batchType = data.batchType
    dataSet
      .batchPeriod = data.batchPeriod
    dataSet
      .job = data.job
    dataSet
      .playTime = data.playTime
    targetTable.value = [tableData]
  }
  catch (error) {
    console.error(error)
  }
}

const handleUpdateDataset = () => {
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
    console.log('수정: ', data)
    router.push({ path: '/admin/pages/data-set' })
  }
  catch (error) {
    console.error(error)
  }
}

const handleGoDatasetPage = () => {
  router.push({ path: '/admin/pages/data-set' })
}

const handleChangeMode = () => {
  updateMode.value = false
  handleSetDataset()
}

const handleUpdateMode = () => {
  updateMode.value = true
}

onMounted(() => {
  handleSetDataset()
})
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('data-set.title') }} {{ t('common.label.detail') }}
    </h2>
    <form class="form content__box">
      <FormItem :label="t('data-set.label.data-set')" :required="updateMode">
        <CustomInput v-model="dataSet.name" :placeholder="t('data-set.placeholder.name')" :readonly="!updateMode" />
      </FormItem>
      <FormItem :label="t('data-set.label.description')" :required="updateMode">
        <CustomTextarea v-model="dataSet.description" :placeholder="t('data-set.placeholder.description')"
          :readonly="!updateMode" />
      </FormItem>

      <FormItem :label="t('data-set.label.target-table')" :required="updateMode" form-col use-btn>
        <template #label-btn>
          <button v-if="updateMode" type="button" class="btn__secondary--sm" @click="addTargetTable">
            {{ t('common.button.add') }}
          </button>
        </template>
        <div v-for="(table, tableIndex) in targetTable" :key="tableIndex" class="mb-2.5 box--f7f">
          <el-table :data="table" :span-method="addRowspan" style="width: 100%;" class="no-hover">
            <el-table-column prop="id" align="center" min-width="15" />
            <el-table-column prop="tableName" :label="t('data-set.label.table')" min-width="25">
              <template #default="scope">
                <CustomInput v-model="scope.row.tableName" :placeholder="t('data-set.label.table')"
                  :readonly="!updateMode" />
              </template>
            </el-table-column>
            <el-table-column prop="column" :label="t('data-set.label.column')" min-width="25">
              <template #default="scope">
                <CustomInput v-model="scope.row.column" :placeholder="t('data-set.label.column')"
                  :readonly="!updateMode" />
              </template>
            </el-table-column>
            <el-table-column prop="description" :label="t('data-set.label.dd')" min-width="25">
              <template #default="scope">
                <CustomInput v-model="scope.row.description" :placeholder="t('data-set.label.dd')"
                  :readonly="!updateMode" />
              </template>
            </el-table-column>
            <el-table-column v-if="updateMode" align="center" label="row" min-width="10">
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
      <FormItem :label="t('data-set.label.batch')" :required="updateMode" use-group>
        <basic-select-box v-model="dataSet.batchType" :options="batchTypeOptions"
          :placeholder="t('data-set.placeholder.batch-type')" :readonly="!updateMode" />
        <CustomInput v-model="dataSet.batchPeriod" :placeholder="t('data-set.placeholder.name')"
          :readonly="!updateMode" />
      </FormItem>
      <FormItem :label="t('data-set.label.first-job')" :required="updateMode">
        <CustomInput v-model="dataSet.job" :placeholder="t('data-set.placeholder.first-job')" :readonly="!updateMode" />
      </FormItem>
      <FormItem :label="t('data-set.label.batch-time')" :required="updateMode">
        <CustomInput v-model="dataSet.playTime" :placeholder="t('data-set.placeholder.batch-time')"
          :readonly="!updateMode" />
      </FormItem>
    </form>
    <div class="content__btns">
      <button v-if="!updateMode" type="button" class="btn__secondary--lg" @click="handleGoDatasetPage">
        {{ t('common.button.cancel') }}
      </button>
      <button v-if="!updateMode" type="button" class="btn__primary--lg" @click="handleUpdateMode">
        {{ t('common.button.update') }}
      </button>
      <button v-if="updateMode" type="button" class="btn__secondary--lg" @click="handleChangeMode">
        {{ t('common.button.cancel') }}
      </button>
      <button v-if="updateMode" type="button" class="btn__primary--lg" @click="handleUpdateDataset">
        {{ t('common.button.save') }}
      </button>
    </div>
  </div>
</template>
<style></style>