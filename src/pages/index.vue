<script setup lang="ts">
const { t } = useI18n()

</script>

<template>
  <div>
    <h1>MENU</h1>
    {{ t('common.hello') }}
    <router-link to="/examples" class="mr-5">Example</router-link>
    <router-link to="/system/announcement" class="mr-5">공지사항(사용자)</router-link>
    <router-link to="/faq" class="mr-5">FAQ(사용자)</router-link>
    <router-link to="/qna" class="mr-5">Q&A(사용자)</router-link>
    <router-link to="/map" class="mr-5">MAP</router-link>
    <router-link to="/globe" class="mr-5">Globe</router-link>
    <router-link to="/system/announcement/admin-index" class="mr-5">공지사항(관리자)</router-link>
    <router-link to="/admin/faq" class="mr-5">FAQ(관리자)</router-link>
    <router-link to="/admin/qna" class="mr-5">Q&A(관리자)</router-link>
    <router-link to="/admin/user-mgmt" class="mr-5">사용자 관리</router-link>
  </div>
</template>

<style scoped></style>
