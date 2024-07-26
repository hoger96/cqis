<script setup lang="ts">
const props = defineProps({
  useReset: {
    type: Boolean,
    default: false,
  },
  resetText: {
    type: String,
    default: '초기화',
  },
  searchText: {
    type: String,
    default: '검색',
  },
})
const emit = defineEmits(['clear', 'search'])
</script>

<template>
  <div class="search-form">
    <div class="search-form__form-area">
      <div class="search-form__items">
        <slot />
      </div>
    </div>
    <div class="search-form__btn-area">
      <button v-if="useReset" type="button" class="btn__primary-line--md" @click="emit('clear')">
        <!-- <Icon name="reset__line--9e4" width="24" height="24" alt="" /> -->
        {{ resetText }}
      </button>
      <button type="button" class="btn__primary--md" @click="emit('search')">
        <!-- <Icon name="search__line--fff" width="24" height="24" alt="" /> -->
        {{ searchText }}
      </button>
      <slot name="search-form__btn" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
