<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '../../../types/modal.ts'
import CustomTextarea from '../../../examples/components/custom-textarea/CustomTextarea.vue'
import { ICorDetail } from '../types/corporation.ts'


const { t } = useI18n()
const props = defineProps<{
  modelValue: boolean
  corId: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel'): void
  (e: 'confirm', value: { corInfo: ICorDetail }): void
}>()

const mockupContinent = ref([
  {
    value: 'asia',
    label: '아시아'
  },
  {
    value: 'africa',
    label: '아프리카'
  },
  {
    value: 'northAmerica',
    label: '북아메리카'
  },
  {
    value: 'southAmerica',
    label: '남아메리카'
  },
  {
    value: 'southPole',
    label: '남극'
  },
  {
    value: 'Europe',
    label: '유럽'
  },
  {
    value: 'oceania',
    label: '오세아니아'
  },
])
const mockupState = ref([
  {
    value: 'sale',
    label: '판매'
  },
  {
    value: 'product',
    label: '생산'
  },
])
const mockupData = {
  name: '법인1',
  continent: 'northAmerica',
  country: '캐나다',
  city: '토론토',
  latitude: 43.6532,
  longitude: -79.3832,
  corState: 'produce',
  useElectric: '120v',
  machine: '전자레인지',
}

const corId = ref('')
const corInfo = reactive<ICorDetail>({
  name: '',
  continent: 'asia',
  country: '',
  city: '',
  latitude: 0,
  longitude: 0,
  corState: 'sale',
  useElectric: '',
  machine: '',
})
const continentOptions = ref<[]>([])
const stateOptions = ref<[]>([])

const handleCancel = () => {
  emits('cancel')
}

const setOptions = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/user/auth',
    // })
    continentOptions.value = mockupContinent.value
    stateOptions.value = mockupState.value
  }
  catch (error) {
    console.error(error)
  }
}

const getCorDetail = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/user/${props.userId}',
    //   userInfo,
    // })
    return mockupData
  }
  catch (error) {
    console.error(error)
  }
}

const setCorDetail = () => {
  const data = getCorDetail();
  corInfo.name = data.name
  corInfo.continent = data.continent
  corInfo.country = data.country
  corInfo.city = data.city
  corInfo.latitude = data.latitude
  corInfo.longitude = data.longitude
  corInfo.corState = data.corState
  corInfo.useElectric = data.useElectric
  corInfo.machine = data.machine
}

const handleUpdateUserAuth = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/user/${props.userId}',
    //   userInfo,
    // })
    // const data = {
    //   use: userInfo.use,
    //   reason: userInfo.reason
    // }
    // console.log('수정', data)
    emits('confirm', corInfo)
    emits('cancel')
  }
  catch (error) {
    console.error(error)
  }
}

const isShow = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

watchEffect(() => {
  corId.value = props.corId
  if (!corId.value) {
    return
  }
  setCorDetail()
})

onMounted(() => {
  setOptions()
})
</script>

<template>
  <common-modal v-model="isShow" :title="t('corporation.title')" :size="MODAL_SIZE.MEDIUM" @cancel="handleCancel">
    <template #content>
      <form class="form">
        <FormItem :label="t('corporation.label.name')">
          <CustomInput v-model="corInfo.name" :placeholder="t('corporation.placeholder.name')" />
        </FormItem>
        <FormItem :label="t('corporation.label.continent')">
          <basic-select-box v-model="corInfo.continent" :options="continentOptions" />
        </FormItem>
        <FormItem :label="t('corporation.label.country')">
          <CustomInput v-model="corInfo.country" :placeholder="t('corporation.placeholder.country')" />
        </FormItem>
        <FormItem :label="t('corporation.label.city')">
          <CustomInput v-model="corInfo.city" :placeholder="t('corporation.placeholder.city')" />
        </FormItem>
        <FormItem :label="t('corporation.label.latitude')">
          <CustomInput v-model="corInfo.latitude" :placeholder="t('corporation.placeholder.latitude')" />
        </FormItem>
        <FormItem :label="t('corporation.label.longitude')">
          <CustomInput v-model="corInfo.longitude" :placeholder="t('corporation.placeholder.longitude')" />
        </FormItem>
        <FormItem :label="t('corporation.label.cor-state')">
          <basic-select-box v-model="corInfo.corState" :options="stateOptions" />
        </FormItem>
        <FormItem :label="t('corporation.label.electricity')">
          <CustomInput v-model="corInfo.useElectric" :placeholder="t('corporation.placeholder.electricity')" />
        </FormItem>
        <FormItem :label="t('corporation.label.machine')">
          <CustomTextarea v-model="corInfo.machine" :placeholder="t('corporation.placeholder.machine')" />
        </FormItem>
      </form>
    </template>
    <template #footer>
      <button type="button" class="btn__negative--md" @click="handleCancel">
        {{ t('common.button.cancel') }}
      </button>
      <button type="button" class="btn__secondary--md" @click="handleUpdateUserAuth">
        {{ t('common.button.save') }}
      </button>
    </template>
  </common-modal>
</template>
<style></style>