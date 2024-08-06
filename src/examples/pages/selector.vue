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
    <div class="flex flex-col gap-2 mt-10 p-10 bg-white rounded-3xl">
      <p><em class="font-bold">el-checkbox-group</em> 사용 시, <em class="font-bold">수직 정렬</em>됩니다.
      </p>
    </div>

    <!-- checkbox -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        checkbox
      </mark>
      <form class="form">
        <FormItem label="Basic">
          <el-checkbox v-model="form.checkbox1" true-value="Y" false-value="N">
            A
          </el-checkbox>
          <el-checkbox v-model="form.checkbox2" true-value="Y" false-value="N">
            B
          </el-checkbox>
        </FormItem>
        <FormItem label="Disabled">
          <el-checkbox v-model="form.checkbox1" true-value="Y" false-value="N" disabled>
            A
          </el-checkbox>
          <el-checkbox v-model="form.checkbox2" true-value="Y" false-value="N" disabled>
            B
          </el-checkbox>
        </FormItem>
        <FormItem label="el-checkbox-group">
          <el-checkbox-group v-model="form.checkbox1">
            <el-checkbox true-value="Y" false-value="N">
              A
            </el-checkbox>
            <el-checkbox true-value="Y" false-value="N">
              B
            </el-checkbox>
          </el-checkbox-group>
        </FormItem>
      </form>
    </div>
    <hr>

    <!-- radio -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        radio
      </mark>
      <form class="form">
        <FormItem label="Basic">
          <el-radio-group v-model="form.radio">
            <el-radio value="A">
              A
            </el-radio>
            <el-radio value="B">
              B
            </el-radio>
          </el-radio-group>
        </FormItem>
        <FormItem label="Disabled">
          <el-radio-group v-model="form.radio" disabled>
            <el-radio value="A">
              A
            </el-radio>
            <el-radio value="B">
              B
            </el-radio>
          </el-radio-group>
        </FormItem>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
