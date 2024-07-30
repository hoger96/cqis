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
  useGroup: {
    type: Boolean,
    required: false,
  },
})
</script>

<template>
  <div class="form__item">
    <label class="form__label" :class="{ 'is-required': required }">{{ props.label }}</label>
    <div v-if="useGroup" class="form__group">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>
