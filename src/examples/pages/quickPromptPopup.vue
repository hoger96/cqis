<script setup lang="ts">
import PromptSettingPopup from '~/mgmt/playground/components/PromptSettingPopup.vue';

const show = ref(false)

const openModal = () => {
  show.value = true
}

const handleCancel = () => {
  show.value = false
}

</script>

<template>
  <button type="button" class="btn__primary--sm" @click="openModal">
    basic
  </button>
  <PromptSettingPopup v-model="show" @cancel="handleCancel"></PromptSettingPopup>
</template>


<style scoped></style>