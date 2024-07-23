<!-- Playground 화면 Header (ChatLayout)  -->

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const movePlayground = () => {
  router.go(0)
}
const userStore = useUserStore()
const { user } = userStore
</script>

<template>
  <header class="header header--chat">
    <h1 @click="movePlayground">
      <Icon name="logo__playground" width="202" height="28" alt="ixi playground" />
    </h1>
    <div class="flex items-center">
      <template v-if="!route.meta.isPublicPath">
        <div v-if="user" class="header__user">
          <Icon name="user__circle--f3f" width="24" height="24" alt="사용자" />
          <span class="ml-1">{{ user.name }}</span>
        </div>
        <button type="button" @click="userStore.logout">
          <Icon name="logout__line--222" width="24" height="24" alt="로그아웃" />
        </button>
      </template>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '~/styles/components/header'
</style>
