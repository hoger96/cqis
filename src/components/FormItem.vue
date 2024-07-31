<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  useBtn: {
    type: Boolean,
    required: false,
  },
  useGroup: {
    type: Boolean,
    required: false,
  },
  formCol: {
    type: Boolean,
    required: false,
  },
})
</script>

<template>
  <div class="form__item" :class="{ 'form--col': formCol }">
    <div class="form__label-wrap">
      <label v-if="label" class="form__label" :class="{ 'is-required': required }">{{ label }}</label>
      <slot v-if="useBtn" name="label-btn" />
    </div>
    <div v-if="useGroup" class="form__group">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>
