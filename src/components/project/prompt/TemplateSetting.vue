<script setup lang="ts">
import HighlightTextarea from './HighlightTextarea.vue';

// TODO: type
const props = defineProps<{
  modelValue: any
}>()

// TODO: type
const emit = defineEmits<{
  (e: 'change', value: any): void
}>()

const dragged = ref()

// TODO: type
const templateSetting = ref<any>(props.modelValue)

interface ITemplateData {
  id: number
  click?: boolean
}

const extractText = (str: string) => {
  const regex = /\{(.*?)\}/gm
  const matches = []
  let match
  while ((match = regex.exec(str)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex++
    }
    matches.push(match[1])
  }
  return matches
}

watchEffect(() => {
  templateSetting.value = props.modelValue
})

watch(templateSetting, () => {
  const extractedList = templateSetting.value.sections.map((item: { content: string }) => {
    return extractText(item.content)
  })
  emit('change', extractedList)
}, { deep: true })

const templateOptions = [
  {
    label: '시스템',
    value: 'system',
  },
  {
    label: '사용자',
    value: 'user',
  },
  {
    label: '어시스턴트',
    value: 'assistant',
  },
]

const roleTypeOptions = {
  system: [
    {
      label: 'TEXT 직접 입력',
      value: 'TEXT',
    },
    {
      label: 'SESSION 불러오기',
      value: 'SESSION',
    },
  ],
  user: [
    {
      label: 'TEXT 직접 입력',
      value: 'TEXT',
    },
    {
      label: 'USER_QUERY 불러오기',
      value: 'USER_QUERY',
    },
  ],
  assistant: [
    {
      label: 'TEXT 직접 입력',
      value: 'TEXT',
    },
  ],
}

//주어진 인덱스의 섹션을 템플릿에서 삭제합니다.
const handleDeleteToTemplate = (index: number) => {
  templateSetting.value.sections = templateSetting.value.sections.filter((_, idx) => idx !== index)
}

//주어진 인덱스에 해당하는 템플릿 섹션을 반환합니다.
const findTemplateByIndex = (index: number): ITemplateData | undefined => {
  return templateSetting.value.sections[index]
}

//드래그를 시작할 때 호출되며, 드래그된 항목의 인덱스를 저장하고 클릭 상태를 true로 설정합니다.
const onDragStart = (index: number) => {
  dragged.value = index
  const draggedItem = findTemplateByIndex(index)
  if (draggedItem)
    draggedItem.click = true
}

//드래그를 종료할 때 호출되며, 드래그된 항목의 인덱스를 초기화하고 클릭 상태를 false로 설정합니다.
const onDragEnd = (index: number) => {
  dragged.value = null
  const draggedItem = findTemplateByIndex(index)
  if (draggedItem)
    draggedItem.click = false
}

//드래그된 항목을 드롭할 때 호출되며, 드롭된 위치로 항목을 이동시킵니다.
const onDrop = (targetIndex: number) => {
  if (targetIndex === 0)
    return
  const draggedIndex = dragged.value
  if (draggedIndex !== null && targetIndex !== draggedIndex) {
    const draggedItem = templateSetting.value.sections[draggedIndex]
    templateSetting.value.sections.splice(draggedIndex, 1)
    templateSetting.value.sections.splice(targetIndex, 0, draggedItem)
    draggedItem.click = false
  }
}

//새로운 템플릿 섹션을 추가합니다.
const handleAddTemplate = () => {
  templateSetting.value.sections.push(
    {
      name: '',
      role: 'system',
      type: 'TEXT',
      content: '',
    },
  )
}

//주어진 역할에 따라 선택 옵션의 색상을 반환합니다.
const handleTemplateOptionsColor = (target: string) => {
  if (target === 'system')
    return 'el-select--purple'
  if (target === 'user')
    return 'el-select--green'
  if (target === 'assistant')
    return 'el-select--pink'
}

//선택한 타입을 변경할 때 호출되며, 컨텐츠를 초기화합니다.
const handleChangeSelectType = (target: any) => {
  target.content = ''
}

//템플릿을 초기화하고 각 섹션의 내용을 추출하여 이벤트로 전파합니다.
const init = () => {
  const extractedList = templateSetting.value.sections.map((item: { content: string }) => {
    return extractText(item.content)
  })
  emit('change', extractedList)
}

onMounted(() => {
  init()
})
</script>

<template>
  <ul class="relative">
    <button type="button" class="absolute top-[-42px] right-0  btn__secondary--sm" @click="handleAddTemplate">
      <icon name="plus__line--fff" width="24" height="24" alt="" />
      Prompt 추가하기
    </button>
    <li v-for="(item, index) in templateSetting.sections" class="prompt__box--purple"
      :class="{ 'is-active': item.click, 'is-default': item.id }" @drop="onDrop(index, item.id)" @dragover.prevent>
      <div class="flex justify-between">
        <basic-select-box v-model="item.role" :options="templateOptions" class="input--250" :disabled="index === 0"
          :class="handleTemplateOptionsColor(item.role)" />
        <div class="flex items-center">
          <button v-if="index !== 0" type="button" @click="handleDeleteToTemplate(index)" @mousedown.prevent
            @touchstart.prevent>
            <icon name="trash__line--555" width="24" height="24" alt="삭제" />
          </button>
          <button v-if="index !== 0" type="button" draggable="true"
            :class="item.click ? 'btn__move--active' : 'btn__move'" @dragstart="onDragStart(index)"
            @dragend="onDragEnd(index)" />
        </div>
      </div>
      <div class="flex flex-wrap ">
        <div class="mt-2.5 form">
          <label class="form__label">역할 타입</label>
          <basic-select-box v-model="item.type" @change="handleChangeSelectType(item)"
            :options="roleTypeOptions[item.role]" class="input--200" :disabled="index === 0" />
        </div>
        <div class="!mt-2.5 form">
          <label class="form__label">역할 명</label>
          <CustomInput v-model="item.name" width="345px" placeholder="해당 역할에 이름을 정해주세요." />
        </div>
      </div>
      <div class="mt-2.5">
        <HighlightTextarea v-if="item.type === 'TEXT'" v-model="item.content" max-length="2000"
          placeholder="시스템에게 역할을 부여해주세요. 제한 2000자" />
        <HighlightTextarea v-if="item.type === 'USER_QUERY'" v-model="item.content" disabled max-length="2000"
          placeholder="시스템에게 역할을 부여해주세요. 제한 2000자" />
        <HighlightTextarea v-if="item.type === 'SESSION'" v-model="item.content" disabled readonly max-length="2000"
          placeholder="SESSION은 사용자와 어시스턴트 간의 대화를 불러옵니다" />
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '~/styles/mgmt/pages/prompt.scss';
</style>