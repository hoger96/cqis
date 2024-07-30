<script setup lang="ts">
import CustomInput from '../../components/CustomInput.vue'
import CustomTextarea from '../components/custom-textarea/CustomTextarea.vue'

// select
import type { IOptions } from '../types/select-box'
import BasicSelectBox from '../../components/BasicSelectBox.vue'
import mockOptions from '../mock/options.js'

const form = {
  input: 'Hi~ this is example',
  textarea: 'Hi~ this is example',
}
// select
const options = ref<IOptions[]>(mockOptions)
const noData = ref()
const initData = ref(3)
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      TextField
    </h2>
    <!-- input -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Input
      </mark>
      <form class="form">
        <FormItem label="Basic">
          <CustomInput v-model="noData" max-length="10" placeholder="10글자 내로 입력하세요." />
        </FormItem>
        <FormItem label="size=&quot;sm&quot;">
          <CustomInput v-model="form.input" size="sm" />
        </FormItem>
        <FormItem label="size=&quot;lg&quot;">
          <CustomInput v-model="form.input" size="lg" />
        </FormItem>
        <FormItem label="Use delete btn">
          <CustomInput v-model="form.input" use-delete />
        </FormItem>
        <FormItem label="Disabled">
          <CustomInput v-model="form.input" disabled />
        </FormItem>
        <FormItem label="Readonly">
          <CustomInput v-model="form.input" readonly />
        </FormItem>
        <FormItem label="Error">
          <CustomInput v-model="form.input" valid-message="입력하신 내용을 확인해주세요." />
        </FormItem>
      </form>
    </div>
    <hr>

    <!-- textarea -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Textarea
      </mark>
      <form class="form">
        <FormItem label="Basic">
          <CustomTextarea v-model="noData" placeholder="20자 내로 설명을 입력해주세요." />
        </FormItem>
        <FormItem label="Disabled">
          <CustomTextarea v-model="form.textarea" disabled />
        </FormItem>
        <FormItem label="Readonly">
          <CustomTextarea v-model="form.textarea" readonly />
        </FormItem>
        <FormItem label="Error">
          <CustomTextarea v-model="form.textarea" valid-message="입력하신 내용을 확인해주세요." />
        </FormItem>
      </form>
    </div>
    <hr>

    <!-- select -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Select-box
      </mark>
      <form class="form">
        <FormItem label="Basic">
          <basic-select-box v-model="noData" :options="options" placeholder="선택하세요" />
        </FormItem>
        <FormItem label="size=&quot;sm&quot;">
          <basic-select-box v-model="noData" :options="options" size="sm" placeholder="선택하세요" />
        </FormItem>
        <FormItem label="size=&quot;lg&quot;">
          <basic-select-box v-model="initData" :options="options" size="lg" />
        </FormItem>
        <FormItem label="Disabled">
          <basic-select-box v-model="initData" :options="options" disabled />
        </FormItem>
        <FormItem label="Readonly">
          <basic-select-box v-model="initData" :options="options" readonly />
        </FormItem>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
