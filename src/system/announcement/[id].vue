<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const anncId = ref(route.params.id)

const anncForm = reactive<IAnnouncementDetail>({
  anncId: '',
  title: '',
  createUser: '',
  createDate: '',
  detail: '',
  file: [],
})

onMounted(() => {
  console.log(anncId.value)
})
</script>

<template>
  <div>
    <h1>MENU</h1>
  </div>
</template>

<style scoped></style>
