<script setup lang="ts">
import { ISelectProps } from '../types/select-box'
import { ITreeData } from '../example/types/select-box'

const props = withDefaults(defineProps<ISelectProps<ITreeData>>(), {
  options: () => [],
  size: 'md',
  clearable: false,
  multiple: false,
  disabled: false,
  placeholder: '',
  readonly: false,
  modelValue: '',
})

const emit = defineEmits([
  'update:modelValue',
  'change',
])

const selectBoxRef = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

</script>

<template>
  <el-select v-model="selectBoxRef" :placeholder="props.placeholder" :clearable="props.clearable"
    :multiple="props.multiple" :disabled="props.disabled || props.readonly"
    :class="{ 'el-select--sm': size === 'sm', 'el-select--lg': size === 'lg', 'is-readonly': props.readonly }"
    @change="(value) => emit('change', value)">
    <el-option v-for=" item in props.options " :key="item.value" :label="item.label" :value="item.value"
      :disabled="item.disabled">
      <p v-if="!multiple">
        {{ item.label }}
      </p>
      <!-- FIXME 개발자 :: 미사용히여 임시 주석처리하였습니다. -->
      <!-- <el-checkbox v-else v-model="selectBoxRef" :value="item.value" :disabled="item.disabled"
        @click="(e: any) => e.preventDefault()">
        {{ item.label }}
      </el-checkbox> -->
    </el-option>
  </el-select>
</template>

<style lang="scss"></style>
