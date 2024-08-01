<script setup lang="ts">
// const value1 = ref('')

const { t } = useI18n()
const anncForm = reactive<IAnnouncementDetail>({
  title: '',
  createUser: '',
  createDate: '',
  updateUser: '',
  updateDate: '',
  file: '',
  postingPeriod: '',
})
const setAnncDetail = () => {
  const data = getAnncDetail()
  const period = [data.startDate, data.endDate]
  anncForm.title = data.title
  anncForm.createUser = data.createUser
  anncForm.createDate = data.createDate
  anncForm.updateUser = data.updateUser ? data.updateUser : '-'
  anncForm.updateDate = data.updateDate ? data.updateDate : '-'
  anncForm.postingPeriod = period
}
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Datepicker
    </h2>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        RangeDatepicker
      </mark>
      <form class="form">
        <FormItem label="Basic">
          <el-date-picker v-model="anncForm.postingPeriod" type="daterange" value-format="YYYY-MM-DD"
            :start-placeholder="t('common.label.start-date')" :end-placeholder="t('common.label.end-date')" />
        </FormItem>
        <FormItem label="Disabled">
          <el-date-picker v-model="anncForm.postingPeriod" type="daterange" value-format="YYYY-MM-DD"
            :start-placeholder="t('common.label.start-date')" :end-placeholder="t('common.label.end-date')" disabled />
        </FormItem>
        <FormItem label="Readonly">
          <el-date-picker v-model="anncForm.postingPeriod" type="daterange" value-format="YYYY-MM-DD"
            :start-placeholder="t('common.label.start-date')" :end-placeholder="t('common.label.end-date')" readonly />
        </FormItem>
      </form>
    </div>
    <hr>
    <!-- <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Datepicker
      </mark>
      <div class="my-10">
        <div class="form">
          <label class="form__label">Default</label>
          <el-date-picker v-model="value1" type="date" placeholder="시작일" />
        </div>
      </div>
    </div> -->
  </div>
</template>
