<script setup lang="ts">
import { ref, reactive } from 'vue'
const { t } = useI18n()

const keyword = ref('')

// tree
const defaultProps = {
  children: 'children',
  label: 'label',
}
const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]

const menuForm = reactive({
  id: '',
  name: '',
  url: '',
  desc: '',
  useStates: 'Y',
})

// apiTable
interface RowList {
  apiName: string
  url: string
}

const tableData: RowList[] = [
  {
    apiName: '',
    url: ''
  }
]

const apiTable = ref<[]>([])

const deleteSource = (tableIndex: number, rowIndex: number) => {
  apiTable.value[tableIndex].splice(rowIndex, 1)
}

const addapiTable = () => {
  const newTable = [
    {
      apiName: '',
      url: ''
    }
  ]
  apiTable.value.push(newTable)
}

onMounted(() => {
  apiTable.value = [tableData]
})
</script>
<template>
  <div class="menu-admin">
    <div class="menu-admin__title">
      <h2 class="title">{{ t('menu-admin.title') }}</h2>
      <div class="flex">
        <button type="button" class="btn__negative-line--md">{{ t('common.button.delete') }}</button>
        <button type="button" class="btn__secondary--md">{{ t('common.button.create') }}</button>
        <button type="button" class="btn__secondary--md">{{ t('common.button.saveAll') }}</button>
      </div>
    </div>
    <SearchForm>
      <SearchItem>
        <CustomInput v-model="keyword" :placeholder="t('menu-admin.menu-placeholder')" />
      </SearchItem>
    </SearchForm>
    <div class="menu-admin__content flex">
      <div class="content__box">
        <el-tree style="max-width: 600px" :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]" :props="defaultProps" />
      </div>
      <form class="form content__box">
        <FormItem :label="t('menu-admin.label.menu-id')">
          <CustomInput v-model="menuForm.id" />
        </FormItem>
        <FormItem :label="t('menu-admin.label.menu-name')">
          <CustomInput v-model="menuForm.name" />
        </FormItem>
        <FormItem :label="t('menu-admin.label.menu-url')">
          <CustomInput v-model="menuForm.url" />
        </FormItem>
        <FormItem :label="t('menu-admin.label.menu-desc')">
          <CustomInput v-model="menuForm.desc" />
        </FormItem>
        <FormItem :label="t('menu-admin.label.use')">
          <el-radio-group v-model="menuForm.useStates">
            <el-radio value="Y">
              Yes
            </el-radio>
            <el-radio value="N">
              No
            </el-radio>
          </el-radio-group>
        </FormItem>
        <FormItem form-col use-btn :label="t('menu-admin.label.api')">
          <template #label-btn>
            <button type="button" class="btn__secondary--sm" @click="addapiTable">
              {{ t('common.button.add') }}
            </button>
          </template>
          <div v-for="(table, tableIndex) in apiTable" :key="tableIndex" class="mb-2.5 box--f7f">
            <el-table :data="table" :span-method="addRowspan" style="width: 100%;" class="no-hover">
              <el-table-column prop="apiName" :label="t('menu-admin.label.api-name')" min-width="30">
                <template #default="scope">
                  <CustomInput v-model="scope.row.tableName" />
                </template>
              </el-table-column>
              <el-table-column prop="url" :label="t('menu-admin.label.url')" min-width="60">
                <template #default="scope">
                  <CustomInput v-model="scope.row.column" />
                </template>
              </el-table-column>
              <el-table-column align="center" :label="t('common.button.delete')" min-width="10">
                <template #default="scope">
                  <button type="button" @click="deleteSource(tableIndex, scope.$index)">
                    <icon name="minus-round__full" width="32" height="32" :alt="t('common.button.delete')" />
                  </button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </FormItem>
      </form>
    </div>
  </div>
</template>

<route lang="yaml">
  name: menu-example
  meta:
    isPublicPath: true
    layout: default
  </route>