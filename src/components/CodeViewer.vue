<script setup lang="ts">
import { EditorView } from '@codemirror/view'
import { Compartment, EditorState } from '@codemirror/state'
import { basicSetup } from '@codemirror/basic-setup'
import { oneDarkTheme } from '@codemirror/theme-one-dark'

// const props = defineProps<{
//     value: string
// }>()

const codemirror = ref<HTMLElement | null>(null)
let codeMirrorInstance: EditorView | undefined

onMounted(() => {
  const theme = new Compartment()
  if (codemirror.value) {
    codeMirrorInstance = new EditorView({
      state: EditorState.create({
        extensions: [
          basicSetup,
          theme.of(oneDarkTheme),
        ],
      }),
      parent: codemirror.value,
    })
  }
})

const copyToClipboard = () => {
  if (!codeMirrorInstance)
    return
  const code = codeMirrorInstance.state.doc.toString()
  navigator.clipboard.writeText(code)
    .then(() => {
      openAlert({ message: 'Code copied to clipboard!' })
    })
    .catch((error) => {
      console.error('Error copying code to clipboard:', error)
      openAlert({ message: 'Failed to copy code to clipboard!' })
    })
}
</script>

<template>
  <div class="relative">
    <div ref="codemirror" />
    <button class="copy-button" @click="copyToClipboard">
      <Icon name="summary" width="30" height="20" alt="코드 복사" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.copy-button {
  position: absolute;
  right: -15px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: #007bff;
  color: #fff;
  border: none;
}
</style>
