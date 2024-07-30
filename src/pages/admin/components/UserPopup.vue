<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IUserDetail, IUserPopup } from '../types/user-mgmt.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '~/types/modal.ts'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'


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

const mockupData = {
  name: '홍길동',
  adminState: 'admin',
  qlik: 'professional',
  state: 'lock',
  use: 'Y',
  reason: ''
}

const userId = ref('')
const userInfo = reactive<IUserDetail>({
  name: '',
  adminState: '',
  qlik: '',
  state: '',
  use: '',
  reason: ''
})

const handleCancel = () => {
  emits('cancel')
}

const getUserDetail = () => {
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

const setUserDetail = () => {
  const data = getUserDetail()
  userInfo.name = data.name
  userInfo.adminState = data.adminState
  userInfo.qlik = data.qlik
  userInfo.state = data.state
  userInfo.use = data.use
  userInfo.reason = data.reason
}

const handleUpdateUser = () => {
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
</script>

<template>
  <common-modal v-model="isShow" :title="t('user.popup.title')" :size="MODAL_SIZE.MEDIUM" @cancel="handleCancel">
    <template #content>
      <form class="form">
        <FormItem :label="t('common.label.name')">
          <CustomInput v-model="userInfo.name" max-length="10" readonly />
        </FormItem>
        <FormItem :label="t('user.label.admin-state')">
          <div class="form">
            <el-radio-group v-model="userInfo.adminState">
              <el-radio value="user">
                {{ t('user.label.user') }}
              </el-radio>
              <el-radio value="admin">
                {{ t('user.label.admin') }}
              </el-radio>
            </el-radio-group>
          </div>
        </FormItem>
        <FormItem :label="t('user.label.qlik')">
          <div class="form">
            <el-radio-group v-model="userInfo.qlik">
              <el-radio value="analyst">
                {{ t('user.label.analyst') }}
              </el-radio>
              <el-radio value="professional">
                {{ t('user.label.professional') }}
              </el-radio>
            </el-radio-group>
          </div>
        </FormItem>
        <FormItem :label="t('user.label.state')">
          <div class="form">
            <el-radio-group v-model="userInfo.state">
              <el-radio value="lock">
                {{ t('user.label.lock') }}
              </el-radio>
              <el-radio value="active">
                {{ t('user.label.active') }}
              </el-radio>
            </el-radio-group>
          </div>
        </FormItem>
        <FormItem :label="t('common.search-bar.use')">
          <div class="form">
            <el-radio-group v-model="userInfo.use">
              <el-radio value="Y">
                {{ t('common.label.use-yes') }}
              </el-radio>
              <el-radio value="N">
                {{ t('common.label.use-no') }}
              </el-radio>
            </el-radio-group>
          </div>
        </FormItem>
        <FormItem :label="t('common.label.reason')">
          <CustomTextarea v-model="userInfo.reason" max-length="20" :placeholder="t('user.popup.reason-placeholder')" />
        </FormItem>
      </form>
    </template>
    <template #footer>
      <button type="button" class="btn__negative--md" @click="handleCancel">
        {{ t('common.button.cancel') }}
      </button>
      <button type="button" class="btn__secondary--md" @click="handleUpdateUser">
        {{ t('common.button.save') }}
      </button>
    </template>
  </common-modal>
</template>
<style></style>