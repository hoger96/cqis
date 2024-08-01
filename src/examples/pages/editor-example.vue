<script setup lang="ts">
import type { Delta } from '@vueup/vue-quill'
import { CONTENT_TYPE, THEME_TYPE } from '../../types/enums/editor'
import Editor from '../../components/Editor.vue'

const toolbar = ref<string | Array<string | Array<string>>>('full')
const theme = ref<THEME_TYPE>(THEME_TYPE.SNOW)
const readOnly = ref<boolean>(false)
const contents = ref<string | Delta>()
const contentType = ref<CONTENT_TYPE>(CONTENT_TYPE.HTML)
const handleReadOnly = (value: boolean) => {
  readOnly.value = !value
}

const toolbarTypes = ['essential', 'minimal', 'full', '', 'custom']
const toolbarOptions = ref([
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['link', 'image', 'video'],
  ['clean']])
const themes = ['snow', 'bubble']
const contentTypes = ['html', 'text', 'delta']

const onEditorChange = (value: string) => {
  contents.value = value
}

const handleContentTypeChange = (e: string) => {
  if (e === CONTENT_TYPE.TEXT) {
    contents.value = 'text content type example'
  }
  else if (e === CONTENT_TYPE.HTML) {
    contents.value
      = '<p>BOLD</p><p><em>italic</em></p><p><u>underline</u></p><p><s>line stringg</s></p><p><br></p><blockquote>인용구</blockquote><pre class="ql-syntax" spellcheck="false">codestyple </pre><h1>Heading1</h1><h2>Heading2</h2><h3>heading3</h3><h4>heading4</h4><h5>heading5</h5><h6>heading6</h6><p><br></p><ol><li>first</li><li>second</li><li>third</li></ol><p><br></p><ul><li>first</li><li>second</li><li>third</li></ul><p><br></p><p><span class="ql-font-serif">serif font style</span></p><p><br></p><p><span style="background-color: rgb(255, 255, 0);">highlight text</span></p><p><span style="color: rgb(0, 102, 204);">text color change</span></p>'
  }
  else {
    contents.value = [
      { insert: 'Delta contentType example ' },
      { insert: 'HI', attributes: { bold: true } },
      { insert: '\n' },
    ]
  }
}
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Editor
    </h2>
    <div class="my-10">
      <form class="form">
        <FormItem label="툴바 옵션">
          <el-radio-group v-model="toolbar">
            <el-radio v-for="toolbarType in toolbarTypes" :key="toolbarType" :value="toolbarType">
              {{ toolbarType || 'none' }}
            </el-radio>
          </el-radio-group>
          <!-- <div v-if="toolbar === 'custom'">
            <pre>
              {{ toolbarOptions }}
            </pre>
          </div> -->
        </FormItem>
        <FormItem label="Contents Type">
          <el-radio-group v-model="contentType" @change="handleContentTypeChange">
            <el-radio v-for="valueType in contentTypes" :key="`theme-option-${valueType}`" :value="valueType">
              {{ valueType }}
            </el-radio>
          </el-radio-group>
        </FormItem>
        <FormItem label="테마 옵션">
          <el-radio-group v-model="theme">
            <el-radio v-for="themeOption in themes" :key="`theme-option-${themeOption}`" :value="themeOption">
              {{ themeOption }}
            </el-radio>
          </el-radio-group>
        </FormItem>
        <FormItem label="Readonly">
          <div class="flex items-center">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                @click="handleReadOnly(readOnly)" />
              <span class="ml-3 text-sm font-medium text-gray-900">ReadOnly: {{ readOnly }}</span>
            </label>
          </div>
        </FormItem>
      </form>
    </div>

    <div class="mb-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Result
      </mark>
      <p> Toolbar Type : {{ toolbar }}</p>
      <p> Theme Type : {{ theme }}</p>
      <p> isReadOnly? : {{ readOnly }}</p>
      <p> contentType? : {{ contentType }}</p>
      <p> content : {{ contents }}</p>
    </div>

    <Editor v-model:content="contents" :toolbar="toolbar === 'custom' ? toolbarOptions : toolbar" :theme="theme"
      :read-only="readOnly" placeholder="내용을 입력해주세요." :content-type="contentType" @change="onEditorChange" />
  </div>
</template>
