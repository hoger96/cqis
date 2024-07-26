<script setup lang="ts">
</script>

<template>
  <main class="layout">
    <layout-sidebar />
    <div class="container">
      <layout-header />
      <div class="content">
        <router-view />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
