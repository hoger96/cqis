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

const userId = ref('')
const userInfo = reactive<IUserDetail>({
  name: '',
  use: '',
  reason: ''
})

const handleCancel = () => {
  emits('cancel')
}

const setUserDetail = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/user/${props.userId}',
    //   userInfo,
    // })
    userInfo.name = '홍길동'
    userInfo.use = 'Y'
    userInfo.reason = '그냥'
  }
  catch (error) {
    console.error(error)
  }
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
          <CustomTextarea v-model="userInfo.reason" max-length="20" />
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