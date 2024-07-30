<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IAnnouncementCreate } from '../types/announcement.ts'
import { useRouter } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const updateMode = ref(false)
const datasetId = ref(route.params.id)

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

const dataset = reactive({
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

const handleGetDataset = () => {
  try {
    // const res = await request({
    //   method: 'GET',
    //   url: `/dataset/${datasetId.value}`
    // })
    const res = {
      name: '데이터셋1',
      description: '데이터셋1 입니다.',
      targetTableList: [
        {
          sourceList: [
            {
              tableName: '소스테이블1',
              column: '소스컬럼1',
              description: '소스설명1'
            },
            {
              tableName: '소스테이블2',
              column: '소스컬럼2',
              description: '소스설명2'
            }
          ],
          target: {
            tableName: '타겟테이블1',
            column: '타겟컬럼1',
            description: '타겟설명1'
          }
        },
        {
          sourceList: [
            {
              tableName: '소스테이블1',
              column: '소스컬럼1',
              description: '소스설명1'
            },
            {
              tableName: '소스테이블2',
              column: '소스컬럼2',
              description: '소스설명2'
            }
          ],
          target: {
            tableName: '타겟테이블1',
            column: '타겟컬럼1',
            description: '타겟설명1'
          }
        }
      ],
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

const handleSetDataset = () => {
  const data = handleGetDataset()
  dataset.name = data.name
  dataset.description = data.description
  targetTableList.value = data.targetTableList
  dataset.batchType = data.batchType
  dataset.batchPeriod = data.batchPeriod
  dataset.job = data.job
  dataset.playTime = data.playTime
}

const handleUpdateDataset = () => {
  try {
    const data = {
      title: dataset.name,
      description: dataset.description,
      targetTableList: targetTableList.value,
      batchType: dataset.batchType,
      batchPeriod: dataset.batchPeriod,
      job: dataset.job,
      playTime: dataset.playTime
    }
    console.log('수정: ', data)
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

const handleChangeMode = () => {
  updateMode.value = false
}

const handleUpdateMode = () => {
  updateMode.value = true
}

const handleGoDatasetPage = () => {
  router.push({ path: '/admin/pages/data-set' })
}

onMounted(() => {
  if (datasetId) {
    handleSetDataset()
  }
})
</script>

<template>
  <div class="document">
    <div class="mb-4">
      <h2 class="mgmt__title">
        {{ t('data-set.title') }} {{ t('common.label.detail') }}
      </h2>
    </div>
    <div>
      <div class="form">
        <label class="form__label--required">{{ t('data-set.label.data-set') }}</label>
        <CustomInput v-model="dataset.name" :placeholder="t('data-set.placeholder.name')" :readonly="!updateMode" />
      </div>
      <div class="form">
        <label class="form__label--required">{{ t('data-set.label.description') }}</label>
        <CustomTextarea v-model="dataset.description" :placeholder="t('data-set.placeholder.description')"
          :readonly="!updateMode" />
      </div>
      <div>
        <label class="form__label--required">{{ t('data-set.label.target-table') }}</label>
        <button v-if="updateMode" type="button" class="btn__secondary--sm" @click="handleAddTargetTable">
          {{ t('common.button.add') }}
        </button>
        <div v-for="(targetTable, index) in targetTableList" :key="index" class="p-3 m-5">
          <div class="flex">
            <div class="form">
              <label class="form__label--required">{{ t('data-set.table.source') }}</label>
              <div>
                <div>
                  <div v-for="(source, sourceIndex) in targetTable.sourceList" :key="sourceIndex" class="flex">
                    <CustomInput v-model="source.tableName" :placeholder="t('data-set.label.table')"
                      :readonly="!updateMode" />
                    <CustomInput v-model="source.column" :placeholder="t('data-set.label.column')"
                      :readonly="!updateMode" />
                    <CustomInput v-model="source.description" :placeholder="t('data-set.label.dd')"
                      :readonly="!updateMode" />
                    <button v-if="sourceIndex === 0 && updateMode" type="button" class="btn__secondary--sm"
                      @click="handleAddSource(index)">
                      {{ t('common.button.add') }}
                    </button>
                    <button v-if="targetTable.sourceList.length > 1 && updateMode" type="button"
                      class="btn__secondary--sm" @click="handleRemoveSource(index, sourceIndex)">
                      {{ t('common.button.delete') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form">
            <label class="form__label--required">{{ t('data-set.table.target') }}</label>
            <CustomInput v-model="targetTable.target.tableName" :placeholder="t('data-set.label.table')"
              :readonly="!updateMode" />
            <CustomInput v-model="targetTable.target.column" :placeholder="t('data-set.label.column')"
              :readonly="!updateMode" />
            <CustomInput v-model="targetTable.target.description" :placeholder="t('data-set.label.dd')"
              :readonly="!updateMode" />
          </div>
        </div>
      </div>
      <div class="form">
        <label class="form__label--required">{{ t('data-set.label.batch') }}</label>
        <basic-select-box v-model="dataset.batchType" :options="batchTypeOptions"
          :placeholder="t('data-set.placeholder.batch-type')" :readonly="!updateMode" />
        <CustomInput v-model="dataset.batchPeriod" :placeholder="t('data-set.placeholder.name')"
          :readonly="!updateMode" />
      </div>
      <div class="form">
        <label class="form__label--required">{{ t('data-set.label.first-job') }}</label>
        <CustomInput v-model="dataset.job" :placeholder="t('data-set.placeholder.first-job')" :readonly="!updateMode" />
      </div>
      <div class="form">
        <label class="form__label--required">{{ t('data-set.label.batch-time') }}</label>
        <CustomInput v-model="dataset.playTime" :placeholder="t('data-set.placeholder.batch-time')"
          :readonly="!updateMode" />
      </div>
    </div>
    <div class="mgmt__btn">
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