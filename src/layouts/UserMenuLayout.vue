<script setup lang="ts">
import { menuAll } from '~/menus';
import type { IMenu } from '~/types/menu'

const sidebarMenuList = shallowRef<readonly IMenu[]>([])
const sideMenusById = (menu: IMenu): readonly IMenu[] => {
  const filterMenu = (mid: string) => menuAll.find((x) => x.menuId === mid)?.children ?? menuAll
  if (menu.menuId === 'ixiSolutionIntro' || menu.menuUrl?.includes('/ixi-solution-intro')) {
    return filterMenu('ixiSolutionIntro')
  } else if (menu.menuId === 'solutionQuestion' || menu.menuUrl?.includes('/solution-question')) {
    return filterMenu('solutionQuestion')
  } else if (menu.menuId === 'ixi-studio' || menu.menuUrl?.includes('/ixi-studio')) {
    return filterMenu('ixiStudio')
  }
  return menuAll
}

const setSidebarMenuList = (selectedHeaderMenuInfo: IMenu) => {
  sidebarMenuList.value = sideMenusById(selectedHeaderMenuInfo)
}

const contentDivRef = ref<HTMLDivElement | null>(null)

const router = useRouter()
router.beforeEach(async (to, from, next) => {
  next()
  if (from.fullPath !== to.fullPath) {
    await nextTick()
    if (contentDivRef.value)
      contentDivRef.value.scrollTop = 0
  }
})
</script>

<template>
  <div class="user-menu-layout">
    <header-user-menu-header :menu-list="menuAll" @selected-menu-info="setSidebarMenuList" />
    <div class="user-menu__container">
      <sidebar-user-menu-sidebar v-if="!isEmpty(sidebarMenuList)" :side-menu-list="sidebarMenuList" />
      <div class="user-menu__container-wrap">
        <div ref="contentDivRef" class="user-menu__content">
          <router-view />
        </div>
        <div class="copyright">
          Copyrights&#40;C&#41; 2024 <em>LG U&#43; ixi Solution.</em> All rights Reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
