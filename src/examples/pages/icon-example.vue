<script setup lang="ts">
import Icon from '../../components/Icon.vue'

const icons = [
  { fileName: 'arrow-l__line--555' },
  { fileName: 'arrow-b__line--555' },
  { fileName: 'arrow-b__line--999' },
  { fileName: 'reset__line--fb4' },
  { fileName: 'search__line--fff' },
  { fileName: 'logout__line--333' },
  { fileName: 'user__full--fff' },
]
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      icon list
    </h2>
    <ul class="flex flex-wrap gap-5 my-10">
      <li v-for="ic in icons" :key="`pages-${ic.fileName}`" class="example__icon">
        <div class="example__icon-image">
          <Icon :name="`${ic.fileName}`" width="100" height="100" class="p-2" />
        </div>
        <div class="example__icon-name">
          <span>
            {{ ic.fileName }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.example {
  &__icon {
    overflow: hidden;
    width: 140px;
    border: 1px solid #c7c7c7;
    border-radius: 10px;

    &-image {
      @apply flex items-center justify-center;
      width: 100%;
      padding: 10px;
      background: #075617;
    }

    &-name {
      @apply flex items-center justify-center;
      min-height: 60px;
      padding: 5px;
      border-top: 1px solid #c7c7c7;
      word-break: break-all;
      font-weight: 500;
    }
  }
}
</style>
