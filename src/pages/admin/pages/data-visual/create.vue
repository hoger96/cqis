<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
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

const handleRemoveTable = (index: number) => {
  if (tableList.value.length > 1) {
    tableList.value.splice(index, 1)
  }
}
</script>

<template>
  <div>
    <h2 class="title">
      {{ t('data-set.title') }} {{ t('common.button.create') }}
    </h2>
    <form class="form content__box">
      <FormItem :label="t('data-visual.label.app-name')" required>
        <CustomInput v-model="dataSet.name" :placeholder="t('data-visual.placeholder.app-name')" />
      </FormItem>
      <FormItem :label="t('data-visual.label.app-description')" required>
        <CustomTextarea v-model="dataSet.description" :placeholder="t('data-visual.placeholder.app-description')" />
      </FormItem>
      <FormItem :label="t('data-visual.label.table')" required use-col-group :list="tableList">
        <template #default="{ row, index }">
          <CustomInput v-model="tableList[index]" :placeholder="t('data-visual.placeholder.table')" />
          <button v-if="index === 0" type="button" @click="handleAddTable(index)">
            <icon name="plus-round__full" width="32" height="32" :alt="t('common.button.add')" />
          </button>
          <button v-if="tableList.length > 1" type="button" @click="handleRemoveTable(index)">
            <icon name="minus-round__full" width="32" height="32" :alt="t('common.button.delete')" />
          </button>
        </template>
      </FormItem>
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