<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IUserDetail, IUserPopup } from '../types/user-mgmt.ts'
import { useRouter } from 'vue-router'
import { MODAL_SIZE } from '../../types/modal.ts'
import CustomTextarea from '../../examples/components/custom-textarea/CustomTextarea.vue'

const props = withDefaults(defineProps<IUserPopup>(), {
  modelValue: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'close-popup'): void
}>()

const userInfo = reactive<IUserDetail>({
  name: '',
  use: '',
  reason: ''
})

const handleCancel = () => {
  emit('close-popup')
}

const setUserDetail = () => {
  try {
    // FIXME: api 연결
    // const res = await request({
    //   method: 'GET',
    //   url: '/user/${props.userId}',
    //   userInfo,
    // })
    console.log('id눈', props.userId)
    userInfo.name = props.userId
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
    const data = {
      use: userInfo.use,
      reason: userInfo.reason
    }
    console.log('수정', data)
    emit('close-popup')
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
    emit('update:modelValue', val)
  }
})

onMounted(() => {
  console.log(props)
  if (props.modelValue === true) {
    console.log(props)
    setUserDetail()
  }
})
</script>

<template>
  <common-modal v-model="isShow" title="사용자 설정" :size="MODAL_SIZE.MEDIUM" @cancel="handleCancel">
    <template #content>
      <div>
        <form>
          <div class="popup-form">
            <label class="form__label">이름</label>
            <CustomInput v-model="userInfo.name" max-length="10" readonly />
          </div>
          <div class="popup-form">
            <label class="form__label">사용 여부</label>
            <div class="form">
              <el-radio-group v-model="userInfo.use">
                <el-radio value="Y">
                  사용
                </el-radio>
                <el-radio value="N">
                  사용중지
                </el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="popup-form">
            <label class="form__label">사유</label>
            <CustomTextarea v-model="userInfo.reason" max-length="20" />
          </div>
        </form>
      </div>
    </template>
    <template #footer>
      <button type="button" class="btn__negative--md" @click="handleCancel">
        취소
      </button>
      <button type="button" class="btn__secondary--md" @click="handleUpdateUser">
        저장
      </button>
    </template>
  </common-modal>
</template>
<style></style>