<script setup lang="ts">
const form = {
  checkbox1: 'Y',
  checkbox2: '',
  radio: 'A',
}
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Selector
    </h2>

    <!-- checkbox -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        checkbox
      </mark>
      <div class="form">
        <label class="form__label">Basic</label>
        <el-checkbox v-model="form.checkbox1" true-value="Y" false-value="N">
          A
        </el-checkbox>
        <el-checkbox v-model="form.checkbox2" true-value="Y" false-value="N">
          B
        </el-checkbox>
      </div>
      <div class="form">
        <label class="form__label">Disabled</label>
        <el-checkbox v-model="form.checkbox1" true-value="Y" false-value="N" disabled>
          A
        </el-checkbox>
        <el-checkbox v-model="form.checkbox2" true-value="Y" false-value="N" disabled>
          B
        </el-checkbox>
      </div>
    </div>
    <hr>

    <!-- radio -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        radio
      </mark>
      <div class="form">
        <label class="form__label">Basic</label>
        <el-radio-group v-model="form.radio">
          <el-radio value="A">
            A
          </el-radio>
          <el-radio value="B">
            B
          </el-radio>
        </el-radio-group>
      </div>
      <div class="form">
        <label class="form__label">Disabled</label>
        <el-radio-group v-model="form.radio" disabled>
          <el-radio value="A">
            A
          </el-radio>
          <el-radio value="B">
            B
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
