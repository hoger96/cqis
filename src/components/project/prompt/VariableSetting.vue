<script setup lang="ts">
import CustomTextarea from '~/example/components/custom-textarea/CustomTextarea.vue';

const props = defineProps<{
  modelValue: any,
  promptVariables: any
}>()

const emit = defineEmits<{
  (e: 'copy', value: any): void
  (e: 'change', value: any): void
}>()

const documentForm = ref('XML')
const promptVariableList = ref(props.promptVariables)
const variableSetting = ref(props.modelValue)

let copyVariablesList = ref<any[]>([]);
let copyOriginVariablesList = ref<any[]>([]);


watchEffect(() => {
  variableSetting.value = props.modelValue
  promptVariableList.value = props.promptVariables
});

//여러 배열을 병합하여 중복된 이름을 가진 객체를 제거합니다. 마지막에 나타나는 객체가 우선순위를 가집니다.
const mergeArrays = (arrays: any) => {
  let mergedObjects = {};
  arrays.forEach((arr: any) => {
    arr.forEach((obj: { name: any; }) => {
      const name = obj.name;
      mergedObjects[name] = obj;
    });
  });
  return Object.values(mergedObjects);
}

//`variableSetting`을 감시하여 변경 사항이 발생하면 처리합니다.
watch(variableSetting, (newValue: any, _oldValue: any[]) => {
  copyVariablesList.value.push(newValue)
  const result = mergeArrays(copyVariablesList.value)
  copyOriginVariablesList.value = result
  emit('copy', copyOriginVariablesList.value)
  emit('change', variableSetting.value)
}, { deep: true });

const variableValueOptions = [
  {
    label: 'TEXT 직접 입력',
    value: 'TEXT',
  },
  {
    label: 'USER_QUERY 불러오기',
    value: 'USER_QUERY',
  },
  {
    label: 'DOCUMENT 불러오기',
    value: 'DOCUMENT',
  },
  {
    label: 'SESSION 불러오기',
    value: 'SESSION',
  },
]

const documentFormOptions = [
  {
    label: 'XML',
    value: 'XML',
  },
]

const handleChangeSelectType = (target: any) => {
  target.value = ''
}

const handleVariablePlaceholder = (target: string): string => {
  if (target === 'TEXT') {
    return '원하는 변수 값을 직접 입력합니다. 2000자 제한';
  }
  if (target === 'DOCUMENT') {
    return `문서 리스트를 XML 형식으로 불러옵니다.
    예시) 
    <tocalCount>{doc.total_count}</tocalCount>
    <documents>
        <document>
            <id>{doc.index}</id>
            <answer>{doc.answer}</answer>
            <fileName>{doc.file_name}</fileName>
            <fileUri>{doc.file_uri}</fileUri>
            <startPage>{doc.start_page}</startPage>
            <endPage>{doc.end_page}</endPage>
            <thumbnailUri>{doc.thumbnail_uri}</thumbnailUri>
            <score>{doc.score}</score>
        </document>
    </documents>`;
  }
  if (target === 'SESSION') {
    return `사용자와 어시스턴트간의 대화를 XML 형식으로 불러옵니다.
    예시)
    <role>{session.role}</role>
    <content>{session.content}</role>
`;
  }
  return '';
};

</script>

<template>
  <ul>
    <li class="prompt__box--purple">
      <div class="prompt__cont-var">
        <div class="flex flex-wrap items-center gap-2.5 mb-2.5">
          <div class="form">
            <label class="form__label">변수 명</label>
            <CustomInput v-model="promptVariableList[0].name" width="250px" readonly />
          </div>
          <div class="form">
            <label class="form__label">변수 값</label>
            <basic-select-box v-model="promptVariableList[0].type" :options="variableValueOptions" class="input--250"
              disabled />
          </div>
          <div class="form">
            <template v-if="promptVariableList[0].type === 'DOCUMENT'">
              <label class="form__label">형식</label>
              <basic-select-box v-model="documentForm" :options="documentFormOptions" class="input--250" disabled />
            </template>
            <p v-if="promptVariableList[0].type === 'USER_QUERY'">USER_QUERY에 저장된 값을 불러옵니다.</p>
          </div>
        </div>
      </div>
      <CustomTextarea v-if="promptVariableList[0].type !== 'USER_QUERY'" v-model="promptVariableList[0].value" disabled
        max-length="2000" class="mt-2.5" :disabled="promptVariableList[0].type !== 'TEXT'" />
    </li>
    <li v-for="item in variableSetting" class="prompt__box--purple">
      <div class="prompt__cont-var">
        <div class="flex flex-wrap items-center gap-2.5 mb-2.5">
          <div class="form">
            <label class="form__label">변수 명</label>
            <CustomInput v-model="item.name" width="250px" readonly />
          </div>
          <div class="form">
            <label class="form__label">변수 값</label>
            <basic-select-box v-model="item.type" :options="variableValueOptions" class="input--250"
              @change="handleChangeSelectType(item)" />
          </div>
          <div class="form">
            <template v-if="item.type === 'DOCUMENT'">
              <label class="form__label">형식</label>
              <basic-select-box v-model="documentForm" :options="documentFormOptions" class="input--250" disabled />
            </template>
            <p v-if="item.type === 'USER_QUERY'">USER_QUERY에 저장된 값을 불러옵니다.</p>
          </div>
        </div>
      </div>
      <CustomTextarea v-if="item.type !== 'USER_QUERY'" v-model="item.value" max-length="2000" class="mt-2.5"
        :disabled="item.type !== 'TEXT'" :placeholder="handleVariablePlaceholder(item.type)" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '~/styles/mgmt/pages/prompt.scss';
</style>