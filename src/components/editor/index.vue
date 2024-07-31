<script setup lang="ts">
import { nextTick, reactive, watchEffect } from 'vue'
import type { Delta } from '@vueup/vue-quill'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import type { IEditorProps } from '../../types/editor.ts'
import { CONTENT_TYPE, EDITOR_MODE, THEME_TYPE, TOOLBAR_TYPE } from '../../types/enums/editor.ts'

const props = withDefaults(defineProps<IEditorProps>(), {
  toolbar: TOOLBAR_TYPE.NONE,
  theme: THEME_TYPE.SNOW,
  mode: EDITOR_MODE.EDIT,
  placeholder: '',
  contentType: CONTENT_TYPE.HTML,
})

const emit = defineEmits<{
  (e: 'change', value: string | Delta): void
}>()

const editorConfig = reactive({
  show: true,
  toolbar: props.toolbar,
  theme: props.theme,
  readOnly: false,
  content: props.content,
  placeholder: props.placeholder,
  contentType: props.contentType,
})
const quiEditorRef = ref()

const setToolbar = (toolbar: TOOLBAR_TYPE | ObjectConstructor | ArrayConstructor) => {
  editorConfig.toolbar = toolbar
}
const setTheme = (theme: THEME_TYPE) => {
  editorConfig.theme = theme
}
const setReadOnly = (readonly: boolean) => {
  editorConfig.readOnly = readonly
}
const setContentType = (contentType: CONTENT_TYPE) => {
  editorConfig.contentType = contentType
}

const setContent = (content: string | Delta) => {
  editorConfig.content = content
}

const onEditorBlur = (quill: undefined) => {
  console.log('editor blur', quill)
}

const onEditorFocus = (quill: undefined) => {
  console.log('editor focus', quill)
}

const onEditorReady = (quill: undefined) => {
  //console.log('editor ready', quill)
}

const onEditorChange = (quill: undefined) => {
  //console.log('editor change', quill)
}

const onUpdateContent = (quill: string) => {
  emit('change', quill)
}

watch(props, () => {
  setContent(props.content ?? '')
})

watchEffect(() => {
  editorConfig.show = false
  setReadOnly(props.readOnly)
  setToolbar(props.toolbar)
  setContentType(props.contentType)
  if (props.readOnly)
    setTheme(THEME_TYPE.BUBBLE)
  else
    setTheme(props.theme)

  nextTick().then(() => {
    editorConfig.show = true
  })
})
</script>

<template>
  <div class="editor">
    <QuillEditor v-if="editorConfig.show" ref="quiEditorRef" v-model:content="editorConfig.content"
      :theme="editorConfig.theme" :toolbar="editorConfig.toolbar" :read-only="editorConfig.readOnly"
      :placeholder="editorConfig.placeholder" :content-type="editorConfig.contentType" @blue="onEditorBlur"
      @focus="onEditorFocus" @ready="onEditorReady" @text-change="onEditorChange" @update:content="onUpdateContent" />
  </div>
</template>

<style scoped></style>
