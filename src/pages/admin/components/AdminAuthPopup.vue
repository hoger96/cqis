<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IAdminAuthDetail } from '../types/admin-auth.ts'
import { adminouter } from 'vue-router'
import { MODAL_SIZE } from '../../../types/modal.ts'
import CustomTextarea from '../../../examples/components/custom-textarea/CustomTextarea.vue'


const { t } = useI18n()
const props = defineProps<{
  modelValue: boolean
  adminId: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel'): void
  (e: 'confirm', value: { adminInfo: IAdminDetail }): void
}>()

const mockupAuth = ref([
  {
    value: 'admin',
    label: '관리자 그룹1'
  },
  {
    value: 'user',
    label: '관리자 그룹2'
  },
  {
    value: 'visitor',
    label: '관리자 그룹3'
  },
  {
    value: 'robot',
    label: '관리자 그룹4'
  },
])
const adminId = ref('')
const adminInfo = reactive<IAdminDetail>({
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
    //   url: '/admin/auth',
    // })
    authOptions.value = mockupAuth.value
  }
  catch (error) {
    console.error(error)
  }
}

const setAdminDetail = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/admin/${props.adminId}',
    //   adminInfo,
    // })
    const auth = ['admin', 'user', 'robot']
    adminInfo.name = '홍길동'
    adminInfo.auth = auth
    adminInfo.reason = '그냥'
  }
  catch (error) {
    console.error(error)
  }
}

const handleUpdateAdminAuth = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/admin/${props.adminId}',
    //   adminInfo,
    // })
    // const data = {
    //   use: adminInfo.use,
    //   reason: adminInfo.reason
    // }
    // console.log('수정', data)
    emits('confirm', { adminInfo })
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
  adminId.value = props.adminId
  if (!adminId.value) {
    return
  }
  setAdminDetail()
})

onMounted(() => {
  setAuthOption()
})
</script>

<template>
  <common-modal v-model="isShow" :title="t('admin-auth.title')" :size="MODAL_SIZE.MEDIUM" @cancel="handleCancel">
    <template #content>
      <form class="form">
        <FormItem :label="t('common.label.name')">
          <CustomInput v-model="adminInfo.name" max-length="10" readonly />
        </FormItem>
        <FormItem :label="t('user-auth.popup.auth')">
          <el-checkbox-group v-model="adminInfo.auth">
            <el-checkbox v-for="(auth, index) in authOptions" :key="auth.value" :value="auth.value">
              {{ auth.label }}
            </el-checkbox>
          </el-checkbox-group>
        </FormItem>
        <FormItem :label="t('common.label.reason')">
          <CustomTextarea v-model="adminInfo.reason" max-length="20" />
        </FormItem>
      </form>
    </template>
    <template #footer>
      <button type="button" class="btn__negative--md" @click="handleCancel">
        {{ t('common.button.cancel') }}
      </button>
      <button type="button" class="btn__secondary--md" @click="handleUpdateAdminAuth">
        {{ t('common.button.save') }}
      </button>
    </template>
  </common-modal>
</template>
<style></style>