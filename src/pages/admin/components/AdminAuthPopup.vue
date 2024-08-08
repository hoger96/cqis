<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IAdminAuthDetail } from '../types/admin-auth.ts'
import { MODAL_SIZE } from '../../../types/modal.ts'
import CustomTextarea from '../../../examples/components/custom-textarea/CustomTextarea.vue'
import { openToast } from '../../../composables/utils.ts'
import { IToastType } from '../../../types/modal.ts'


const { t } = useI18n()
const props = defineProps<{
  modelValue: boolean
  userId: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel'): void
  (e: 'confirm', value: { adminInfo }): void
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
const mockupData = {
  userId: 'honggildong',
  userName: '홍길동',
  setYn: 'Y',
  roleGroupList: ['admin', 'robot'],
  useYn: 'Y',
  rsn: '',
  crteUserId: 'admin',
  crteDttm: '2024-07-01 12:23:12',
  updUserId: 'admin',
  updDttm: '2024-07-01 12:23:12'
}

const userId = ref('')
const adminInfo = reactive({
  userName: '',
  roleGroupList: [],
  rsn: ''
})
const authOptions = ref<[]>([])

const handleCancel = () => {
  emits('cancel')
}

const setAuthOption = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/mtrRole/list',
    // })
    // authOptions.value = res.data.map(i => ({
    //  value: i.mtrRoleId,
    //  label: i.mtrRoleName
    // }))
    authOptions.value = mockupAuth.value
  }
  catch (error) {
    console.error(error)
  }
}

const getAdminDetail = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/mtrRoleMpp/detail',
    //   {userId},
    // })
    return mockupData
  }
  catch (error) {
    console.error(error)
  }
}

const setAdminDetail = () => {
  const data = getAdminDetail()
  adminInfo.userName = data.userName
  adminInfo.roleGroupList = data.roleGroupList
  adminInfo.rsn = data.rsn
}

const handleUpdateAdminAuth = () => {
  try {
    if (adminInfo.rsn === '') {
      openToast({
        message: t('admin-auth.error.rsn'),
        type: IToastType.ERROR,
        showClose: false,
      })
      return
    }
    const data = {
      userId: userId.value,
      rsn: adminInfo.rsn,
      mtrRoleList: Array.from(adminInfo.roleGroupList)
    }
    emits('confirm', data)
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
          <CustomInput v-model="adminInfo.userName" max-length="10" readonly />
        </FormItem>
        <FormItem :label="t('user-auth.popup.auth')">
          <el-checkbox-group v-model="adminInfo.roleGroupList">
            <el-checkbox v-for="(auth, index) in authOptions" :key="auth.value" :value="auth.value">
              {{ auth.label }}
            </el-checkbox>
          </el-checkbox-group>
        </FormItem>
        <FormItem :label="t('common.label.reason')" required>
          <CustomTextarea v-model="adminInfo.rsn" :placeholder="t('user.popup.reason-placeholder')" />
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