<script setup lang="ts">
import { MODAL_SIZE } from '~/types/modal'

const props = withDefaults(defineProps(), {
  title: '',
  size: MODAL_SIZE.MEDIUM,
  closeOnClickModal: true,
  confirmText: '확인',
  cancelText: '취소',
})
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

const modalShow = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

// const calculateModalWidth = computed(() => {
//   if (props.size === MODAL_SIZE.SMALL)
//     return 'var(--modal-sm-width)'
//   else if (props.size === MODAL_SIZE.MEDIUM)
//     return 'var(--modal-md-width)'
//   else if (props.size === MODAL_SIZE.LARGE)
//     return 'var(--modal-lg-width)'
//   else if (props.size === MODAL_SIZE.XLARGE)
//     return 'var(--modal-xl-width)'
//   else if (props.size === MODAL_SIZE.XXLARGE)
//     return 'var(--modal-2xl-width)'
//   else return 'var(--modal-md-width)'
// })
const calculateModalWidth = computed(() => {
  if (props.size === MODAL_SIZE.SMALL)
    return '360px'
  else if (props.size === MODAL_SIZE.MEDIUM)
    return '600px'
  else if (props.size === MODAL_SIZE.LARGE)
    return '700px'
  else if (props.size === MODAL_SIZE.XLARGE)
    return '820px'
  else if (props.size === MODAL_SIZE.XXLARGE)
    return '1270px'
  else return '600px'
})

const cancel = () => {
  emit('cancel')
}

const confirm = () => {
  emit('confirm')
}
</script>

<template>
  <el-dialog v-model="modalShow" :width="calculateModalWidth" align-center :before-close="cancel"
    :close-on-click-modal="closeOnClickModal" destroy-on-close>
    <template v-if="title.length" #header>
      <h1>{{ title }}</h1>
    </template>
    <slot name="content" />

    <template #footer>
      <slot name="footer">
        <button type="button" class="btn__negative--md" @click="cancel">
          {{ props.cancelText }}
        </button>
        <button type="button" class="btn__secondary--md" @click="confirm">
          {{ props.confirmText }}
        </button>
      </slot>
    </template>
  </el-dialog>
</template>

<style scoped></style>
