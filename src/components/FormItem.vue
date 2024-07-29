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
})
</script>

<template>
  <div class="form__item">
    <label class="form__label" :class="{ 'is-required': required }">{{ props.label }}</label>
    <slot />
  </div>
</template>
