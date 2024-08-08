<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IUserDetail, IUserPopup } from '../types/user-mgmt.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '~/types/modal.ts'
import CustomTextarea from '~/examples/components/custom-textarea/CustomTextarea.vue'
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
  (e: 'confirm', value: { userInfo: IUserDetail }): void
}>()

const mockupData = {
  userId: 'honggildong',
  userName: '홍길동',
  mtrYn: 'Y',
  qlikUserAuthTp: 'P',
  qlikUserAuthYn: 'Y',
  useYn: 'Y',
  rsn: '',
  crteUserId: 'admin',
  crteDttm: '2024-07-01 12:23:12',
  updUserId: 'admin',
  updDttm: '2024-07-01 12:23:12'
}

const userId = ref('')
const userInfo = reactive({
  userName: '',
  mtrYn: '',
  qlikUserAuthTp: '',
  qlikUserAuthYn: '',
  useYn: '',
  rsn: ''
})

const handleCancel = () => {
  emits('cancel')
}

const getUserDetail = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'POST',
    //   url: '/user/detail',
    //   {userId: userId.value},
    // })
    return mockupData
  }
  catch (error) {
    console.error(error)
  }
}

const setUserDetail = () => {
  const data = getUserDetail()
  userInfo.userName = data.userName
  userInfo.mtrYn = data.mtrYn
  userInfo.qlikUserAuthTp = data.qlikUserAuthTp
  userInfo.qlikUserAuthYn = data.qlikUserAuthYn
  userInfo.useYn = data.useYn
  userInfo.rsn = data.rsn
}

const handleUpdateUser = () => {
  try {
    if (userInfo.rsn === '') {
      openToast({
        message: t('admin-auth.error.rsn'),
        type: IToastType.ERROR,
        showClose: false,
      })
      return
    }
    const data = {
      userID: userId.value,
      mtrYn: userInfo.mtrYn,
      qlikUserAuthTp: userInfo.qlikUserAuthTp,
      qlikUserAuthYn: userInfo.qlikUserAuthYn,
      useYn: userInfo.useYn,
      rsn: userInfo.rsn
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

  setUserDetail()
})
</script>

<template>
  <common-modal v-model="isShow" :title="t('user.popup.title')" :size="MODAL_SIZE.MEDIUM" @cancel="handleCancel">
    <template #content>
      <form class="form">
        <FormItem :label="t('common.label.name')">
          <CustomInput v-model="userInfo.userName" max-length="10" readonly />
        </FormItem>
        <FormItem :label="t('user.label.admin-state')">
          <div class="form">
            <el-radio-group v-model="userInfo.mtrYn">
              <el-radio value="N">
                {{ t('user.label.user') }}
              </el-radio>
              <el-radio value="Y">
                {{ t('user.label.admin') }}
              </el-radio>
            </el-radio-group>
          </div>
        </FormItem>
        <FormItem :label="t('user.label.qlik')">
          <div class="form">
            <el-radio-group v-model="userInfo.qlikUserAuthTp">
              <el-radio value="A">
                {{ t('user.label.analyst') }}
              </el-radio>
              <el-radio value="P">
                {{ t('user.label.professional') }}
              </el-radio>
            </el-radio-group>
          </div>
        </FormItem>
        <FormItem :label="t('user.label.allow-status')">
          <div class="form">
            <el-radio-group v-model="userInfo.qlikUserAuthYn">
              <el-radio value="Y">
                {{ t('user.label.allow') }}
              </el-radio>
              <el-radio value="N">
                {{ t('user.label.un-allow') }}
              </el-radio>
            </el-radio-group>
          </div>
        </FormItem>
        <FormItem :label="t('common.search-bar.use')">
          <div class="form">
            <el-radio-group v-model="userInfo.useYn">
              <el-radio value="Y">
                {{ t('common.label.use-yes') }}
              </el-radio>
              <el-radio value="N">
                {{ t('common.label.use-no') }}
              </el-radio>
            </el-radio-group>
          </div>
        </FormItem>
        <FormItem :label="t('common.label.reason')" required>
          <CustomTextarea v-model="userInfo.rsn" :placeholder="t('user.popup.reason-placeholder')" />
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