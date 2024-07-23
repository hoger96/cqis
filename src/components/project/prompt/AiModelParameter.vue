<script setup lang="ts">
import type { IParameter } from '~/types';

const props = defineProps<{
  modelValue: IParameter
  refreshParameter: any
}>()

const emit = defineEmits<{
  (e: 'change', value: IParameter): void
}>()

const { projectDetail } = useProjectStore()
const { aiModelName } = useAiModel(projectDetail.modelConfig.id)
const parameter = ref<any>()

parameter.value = ref(props.modelValue).value

const refreshData = computed(() => {
  return props.refreshParameter
})

watchEffect(() => {
  parameter.value = props.modelValue
})

watch(refreshData, () => {
  if (!refreshData.value) {
    parameter.value = props.modelValue
  }
})
const initialized = ref(false)
setTimeout(() => {
  initialized.value = true
}, 1000)
watch(parameter, () => {
  if (initialized.value) {
    emit('change', parameter.value)
  }
}, { deep: true })
</script>

<template>
  <div>
    <CustomInput v-model="aiModelName" disabled />
    <div class="el-slider__form-wrap">
      <div class="el-slider__form">
        <div class="el-slider__label">
          <div class="flex items-center">
            <label>Temperature(정확도 제어)</label>
            <el-tooltip effect="dark" content="" placement="top-start">
              <template #content>
                0에 가까울 수록 정확도가 높은 단어로 우선 답변합니다.
              </template>
              <Icon name="tooltip" width="20" height="20 " alt="" class="ml-[5px]" />
            </el-tooltip>
          </div>
          <CustomInput v-model="parameter.temperature" type="number" width="70px" />
        </div>
        <el-slider v-model="parameter.temperature" :max="2" :step="0.01" :show-tooltip="false" />
      </div>
      <div class="el-slider__form">
        <div class="el-slider__label">
          <div class="flex items-center">
            <label>Maximum Token(토큰수 제어)</label>
            <el-tooltip effect="dark" content="" placement="top-start">
              <template #content>
                AI 모델을 사용할 때 산정되는 토큰 수의 최대값을 설정합니다.
              </template>
              <Icon name="tooltip" width="20" height="20 " alt="" class="ml-[5px]" />
            </el-tooltip>
          </div>
          <CustomInput v-model="parameter.max_tokens" type="number" width="70px" />
        </div>
        <el-slider v-model="parameter.max_tokens" :max="4096" :show-tooltip="false" />
      </div>
      <div class="el-slider__form">
        <div class="el-slider__label">
          <div class="flex items-center">
            <label>Presence Penalty(변칙 제어)</label>
            <el-tooltip effect="dark" content="" placement="top-start">
              <template #content>
                주제를 바꿀 확률 제어, 0에 가까울 수록 주제를 바꿀 확률을 줄입니다.
              </template>
              <Icon name="tooltip" width="20" height="20 " alt="" class="ml-[5px]" />
            </el-tooltip>
          </div>
          <CustomInput v-model="parameter.presence_penalty" type="number" width="70px" />
        </div>
        <el-slider v-model="parameter.presence_penalty" :min="-2" :max="2" :step="0.01" :show-tooltip="false" />
      </div>
      <div class="el-slider__form">
        <div class="el-slider__label">
          <div class="flex items-ceter">
            <label>Frequency Penalty(반복 제어)</label>
            <el-tooltip effect="dark" content="" placement="top-start">
              <template #content>
                동일한 문장 반복할 확률 제어, 0에 가까울 수록 같은 말을 반복할 확률을 줄입니다.
              </template>
              <Icon name="tooltip" width="20" height="20 " alt="" class="ml-[5px]" />
            </el-tooltip>
          </div>
          <CustomInput v-model="parameter.frequency_penalty" type="number" width="70px" />
        </div>
        <el-slider v-model="parameter.frequency_penalty" :min="-2" :max="2" :step="0.01" :show-tooltip="false" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/styles/mgmt/pages/prompt.scss';
</style>
