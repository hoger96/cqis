<script setup lang="ts">
const { t } = useI18n()

const props = defineProps({
  useReset: {
    type: Boolean,
    default: false,
  },
  resetText: {
    type: String,
    default: () => {
      const { t } = useI18n()
      return t('common.button.reset')
    },
  },
  searchText: {
    type: String,
    default: () => {
      const { t } = useI18n()
      return t('common.button.search')
    },
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
      <button v-if="useReset" type="button" class="btn__primary-line--md has-icon" @click="emit('clear')">
        <Icon name="reset__line--9e4" width="24" height="24" alt="" area-hidden="true" />
        {{ resetText }}
      </button>
      <button type="button" class="btn__primary--md has-icon" @click="emit('search')">
        <Icon name="search__line--fff" width="24" height="24" alt="" area-hidden="true" />
        {{ searchText }}
      </button>
      <slot name="search-form__btn" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
