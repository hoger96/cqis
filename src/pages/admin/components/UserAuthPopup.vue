<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IUserAuthDetail, IUserAuthPopup } from '../types/user-auth.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '../../../types/modal.ts'
import CustomTextarea from '../../../examples/components/custom-textarea/CustomTextarea.vue'


const { t } = useI18n()
const props = defineProps<{
  modelValue: boolean
  userId: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel'): void
  (e: 'confirm', value: { userInfo: IUserDetail }): void
}>()

const mockupAuth = ref([
  {
    value: 'admin',
    label: '관리자'
  },
  {
    value: 'user',
    label: '사용자'
  },
  {
    value: 'visitor',
    label: '방문자'
  },
  {
    value: 'robot',
    label: '로봇'
  },
])
const userId = ref('')
const userInfo = reactive<IUserDetail>({
  name: '',
  auth: [],
  reason: ''
})
const authOptions = ref<[]>([])

const handleCancel = () => {
  emits('cancel')
}

const setAuthOption = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/user/auth',
    // })
    authOptions.value = mockupAuth.value
  }
  catch (error) {
    console.error(error)
  }
}

const setUserDetail = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/user/${props.userId}',
    //   userInfo,
    // })
    const auth = ['admin', 'user', 'robot']
    userInfo.name = '홍길동'
    userInfo.auth = auth
    userInfo.reason = '그냥'
  }
  catch (error) {
    console.error(error)
  }
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
    emits('confirm', { userInfo })
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
  userId.value = props.userId
  if (!userId.value) {
    return
  }
  setUserDetail()
})

onMounted(() => {
  setAuthOption()
})
</script>

<template>
  <common-modal v-model="isShow" :title="t('user-auth.popup.title')" :size="MODAL_SIZE.MEDIUM" @cancel="handleCancel">
    <template #content>
      <div>
        <form>
          <div div class="form">
            <label class="form__label">{{ t('common.label.name') }}</label>
            <CustomInput v-model="userInfo.name" max-length="10" readonly />
          </div>
          <div div class="form">
            <label class="form__label">{{ t('user-auth.popup.auth') }}</label>
            <div class="form">
              <el-checkbox-group v-model="userInfo.auth">
                <el-checkbox v-for="(auth, index) in authOptions" :key="auth.value" :value="auth.value">
                  {{ auth.label }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div div class="form">
            <label class="form__label--required">{{ t('common.label.reason') }}</label>
            <CustomTextarea v-model="userInfo.reason" max-length="20" />
          </div>
        </form>
      </div>
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