<script setup lang="ts">
const props = defineProps({
  formCol: {
    type: Boolean,
    required: false,
  },
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
  useColGroup: {
    type: Boolean,
    required: false,
  },

  list: {
    type: Array,
    required: false,
    default: () => [],
  },
})
</script>

<template>
  <div class="form__item" :class="{ 'form--col': formCol }">
    <div class="form__label-wrap">
      <label v-if="label" class="form__label" :class="{ 'is-required': required }">{{ label }}</label>
      <slot v-if="useBtn && formCol" name="label-btn" />
    </div>
    <div v-if="useGroup" class="form__group">
      <slot />
    </div>
    <div v-else-if="useColGroup && list" class="form__group--col">
      <template v-for="(row, index) in list" :key="`row-${row.id}`">
        <div class="form__group">
          <slot :row="row" :index="index" />
        </div>
      </template>
    </div>
    <slot v-else />
  </div>
</template>
