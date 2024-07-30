<script setup lang="ts">
import CustomInput from '../../components/CustomInput.vue'

// select
import type { IOptions } from '../types/select-box'
import BasicSelectBox from '../../components/BasicSelectBox.vue'
import mockOptions from '../mock/options.js'

const { t } = useI18n()

const form = {
  input: 'Hi~ this is example',
  checkbox1: ['A'],
  radio: 'A',
}

// select
const options = ref<IOptions[]>(mockOptions)

const initData = ref(3)

const handleSearch = () => { }
const handleReset = () => { }
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Form
    </h2>
    <!-- Form row -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Form row(Basic)
      </mark>
      <!-- 복사영역 -->
      <form class="form">
        <FormItem label="Basic">
          <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." />
        </FormItem>
        <FormItem label="Required" required>
          <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." />
        </FormItem>
        <FormItem label="Basic (radio)">
          <el-radio-group v-model="form.radio">
            <el-radio value="A">
              A
            </el-radio>
            <el-radio value="B">
              B
            </el-radio>
          </el-radio-group>
        </FormItem>
        <FormItem label="Basic (checkbox)">
          <el-checkbox-group v-model="form.checkbox1">
            <el-checkbox label="A" value="A" />
            <el-checkbox label="B" value="B" />
          </el-checkbox-group>
        </FormItem>
        <FormItem label="&quot;use-group&quot;" use-group>
          <basic-select-box v-model="initData" :options="options" />
          <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." />
        </FormItem>
      </form>
      <!-- // -->
    </div>
    <hr>

    <!-- Search Form -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Search Form
      </mark>
      <SearchForm use-reset @search="handleSearch" @clear="handleReset">
        <SearchItem :label="t('common.search-bar.condition')">
          <basic-select-box v-model="initData" :options="options" />
        </SearchItem>
        <SearchItem :label="t('common.search-bar.keyword')">
          <CustomInput v-model="form.input" :placeholder="t('common.search-bar.placeholder')"
            @keyup.enter="handleSearch" />
        </SearchItem>
      </SearchForm>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
