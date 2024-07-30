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
</script>

<template>
  <div class="document">
    <div class="mb-4">
      <h2 class="mgmt__title">
        {{ t('data-set.title') }} {{ t('common.button.create') }}
      </h2>
    </div>
    <div>
      <div class="form">
        <label class="form__label--required">{{ t('data-set.label.data-set') }}</label>
        <CustomInput v-model="dataSet.name" :placeholder="t('data-set.placeholder.name')" />
      </div>
      <div class="form">
        <label class="form__label--required">{{ t('data-set.label.description') }}</label>
        <CustomTextarea v-model="dataSet.description" :placeholder="t('data-set.placeholder.description')" />
      </div>
      <div>
        <label class="form__label--required">{{ t('data-set.label.target-table') }}</label>
        <button type="button" class="btn__secondary--sm" @click="handleAddTargetTable">
          {{ t('common.button.add') }}
        </button>
        <div v-for="(targetTable, index) in targetTableList" :key="index" class="p-3 m-5">
          <div class="flex">
            <div class="form">
              <label class="form__label--required">{{ t('data-set.table.source') }}</label>
              <div>
                <div>
                  <div v-for="(source, sourceIndex) in targetTable.sourceList" :key="sourceIndex" class="flex">
                    <CustomInput v-model="source.tableName" :placeholder="t('data-set.label.table')" />
                    <CustomInput v-model="source.column" :placeholder="t('data-set.label.column')" />
                    <CustomInput v-model="source.description" :placeholder="t('data-set.label.dd')" />
                    <button v-if="sourceIndex === 0" type="button" class="btn__secondary--sm"
                      @click="handleAddSource(index)">
                      {{ t('common.button.add') }}
                    </button>
                    <button v-if="targetTable.sourceList.length > 1" type="button" class="btn__secondary--sm"
                      @click="handleRemoveSource(index, sourceIndex)">
                      {{ t('common.button.delete') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form">
            <label class="form__label--required">{{ t('data-set.table.target') }}</label>
            <CustomInput v-model="targetTable.target.tableName" :placeholder="t('data-set.label.table')" />
            <CustomInput v-model="targetTable.target.column" :placeholder="t('data-set.label.column')" />
            <CustomInput v-model="targetTable.target.description" :placeholder="t('data-set.label.dd')" />
          </div>
        </div>
      </div>
      <div class="form">
        <label class="form__label--required">{{ t('data-set.label.batch') }}</label>
        <basic-select-box v-model="dataSet.batchType" :options="batchTypeOptions"
          :placeholder="t('data-set.placeholder.batch-type')" />
        <CustomInput v-model="dataSet.batchPeriod" :placeholder="t('data-set.placeholder.name')" />
      </div>
      <div class="form">
        <label class="form__label--required">{{ t('data-set.label.first-job') }}</label>
        <CustomInput v-model="dataSet.job" :placeholder="t('data-set.placeholder.first-job')" />
      </div>
      <div class="form">
        <label class="form__label--required">{{ t('data-set.label.batch-time') }}</label>
        <CustomInput v-model="dataSet.playTime" :placeholder="t('data-set.placeholder.batch-time')" />
      </div>
    </div>
    <div class="mgmt__btn">
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