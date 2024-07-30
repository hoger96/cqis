<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IAnnouncementCreate } from '../types/announcement.ts'
import { useRouter } from 'vue-router'
import type { Delta } from '@vueup/vue-quill'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'

const router = useRouter()
const { t } = useI18n()

const dataSet = reactive({
  name: '',
  description: '',
  use: 'Y'
})
const tableList = ref<[]>([])

const handleGoDataSetPage = () => {
  router.push({ path: '/admin/pages/data-visual' })
}

const handleCreateDataSet = () => {
  try {
    const data = {
      name: dataSet.name,
      description: dataSet.description,
      tableList: tableList.value,
      use: dataSet.use,
    }
    console.log('등록: ', data)
    router.push({ path: '/admin/pages/data-visual' })
  } catch (error) {
    console.error(error)
  }
}

const handleAddTable = (index: number) => {
  const newData = {
    tableName: '',
  }
  tableList.push(newData)
}

const handleRemoveSource = (index: number) => {
  tableList.splice(sourceIndex, 1)
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
        <label class="form__label--required">{{ t('data-visual.label.app-name') }}</label>
        <CustomInput v-model="dataSet.name" :placeholder="t('data-visual.placeholder.app-name')" />
      </div>
      <div class="form">
        <label class="form__label--required">{{ t('data-visual.label.app-description') }}</label>
        <CustomTextarea v-model="dataSet.description" :placeholder="t('data-visual.placeholder.app-description')" />
      </div>
      <div>
        <label class="form__label--required">{{ t('data-visual.label.table') }}</label>
        <div v-for="(table, index) in tableList" :key="index" class="flex">
          <CustomInput v-model="dataSet.name" :placeholder="t('data-visual.label.table')" />
          <button v-if="sourceIndex === 0" type="button" class="btn__secondary--sm" @click="handleAddSource(index)">
            {{ t('common.button.add') }}
          </button>
          <button v-if="targetTable.sourceList.length > 1" type="button" class="btn__secondary--sm"
            @click="handleRemoveSource(index)">
            {{ t('common.button.delete') }}
          </button>
        </div>
      </div>
      <div div class="form">
        <label class="form__label">{{ t('common.search-bar.use') }}</label>
        <div class="form">
          <el-radio-group v-model="dataSet.use">
            <el-radio value="Y">
              {{ t('common.label.use-yes') }}
            </el-radio>
            <el-radio value="N">
              {{ t('common.label.use-no') }}
            </el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="mgmt__btn">
      <button type="button" class="btn__secondary--lg" @click="handleCreateLineage">
        {{ t('data-visual.label.lineage') }}
      </button>
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