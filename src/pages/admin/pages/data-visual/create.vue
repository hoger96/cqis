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
const tableList = ref<[]>([''])

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
  tableList.value.push('')
}

const handleRemoveSource = (index: number) => {
  if (tableList.value.length > 1) {
    tableList.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      {{ t('data-set.title') }} {{ t('common.button.create') }}
    </h2>
    <div class="my-10">
      <form class="form">
        <FormItem :label="t('data-visual.label.app-name')" required>
          <CustomInput v-model="dataSet.name" :placeholder="t('data-visual.placeholder.app-name')" />
        </FormItem>
        <FormItem :label="t('data-visual.label.app-description')" required>
          <CustomTextarea v-model="dataSet.description" :placeholder="t('data-visual.placeholder.app-description')" />
        </FormItem>
        <div>
          <FormItem :label="t('data-visual.label.table')" required>
            <div v-for="(table, index) in tableList" :key="index" class="flex">
              <CustomInput v-model="tableList[index]" :placeholder="t('data-visual.label.table')" />
              <button v-if="index === 0" type="button" class="btn__secondary--sm" @click="handleAddTable(index)">
                {{ t('common.button.add') }}
              </button>
              <button v-if="tableList.length > 1" type="button" class="btn__secondary--sm"
                @click="handleRemoveTable(index)">
                {{ t('common.button.delete') }}
              </button>
            </div>
          </FormItem>
        </div>
        <FormItem :label="t('common.search-bar.use')">
          <el-radio-group v-model="dataSet.use">
            <el-radio value="Y">
              {{ t('common.label.use-yes') }}
            </el-radio>
            <el-radio value="N">
              {{ t('common.label.use-no') }}
            </el-radio>
          </el-radio-group>
        </FormItem>
      </form>
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