<!-- 랜딩페이지 서브메뉴 화면 Header (UserMenuLayout) -->
<script setup lang="ts">
import type { IMenu } from '~/types/menu'

const props = withDefaults(defineProps<{
  menuList: readonly IMenu[]
}>(), {})

const emit = defineEmits<{
  (e: 'selectedMenuInfo', value: IMenu): void
}>()

const router = useRouter()
const moveHomePage = () => {
  router.push('/')
}

const moveNewWebSide = (twoDepthMenuInfo: IMenu) => {
  if (!isEmpty(twoDepthMenuInfo.menuUrl))
    window.open(twoDepthMenuInfo.menuUrl)
}

const route = useRoute()

const selectedMenuInfo: IMenu = reactive({
  menuId: '',
  menuName: '',
  menuIndex: '',
  menuUrl: '',
  children: [],
})

const getActiveMenu = () => {
  let activeMenu = ''
  const activeMenuInfo = findActiveMenuInfo(props.menuList, route.path)

  if (isEmpty(activeMenuInfo)) {
    Object.assign(selectedMenuInfo, props.menuList[0])
    activeMenu = ''
  }
  else if (activeMenuInfo && activeMenuInfo.menuUrl) {
    Object.assign(selectedMenuInfo, activeMenuInfo)
    activeMenu = activeMenuInfo.menuUrl
  }

  emit('selectedMenuInfo', selectedMenuInfo)

  return activeMenu
}

const movePage = (menuUrl: string) => {
  const newWebPageUrlRegex = /http(s)?:\/\/.+/
  if (newWebPageUrlRegex.test(menuUrl))
    window.open(menuUrl)
  else
    router.push(menuUrl)
}
</script>

<template>
  <header class="header">
    <h1 @click="moveHomePage">
      <Icon name="logo--purple" width="158" height="38" alt="ixi Solusion" />
    </h1>
    <el-menu mode="horizontal" :ellipsis="false" :default-active="getActiveMenu()" :popper-offset="0">
      <template v-for="menu in menuList" :key="`user-sidebar-${menu.menuId}`">
        <!-- 메뉴가 여러 뎁스로 있는 경우 사용 -->
        <el-sub-menu v-if="menu.children" :index="menu.menuIndex" popper-class="header-menu">
          <template #title>
            <!-- TODO: icon 필요할때 사용 -->
            <!-- <Icon :name="menu.icon" width="20" height="20" /> -->
            <span>{{ menu.menuName }}</span>
          </template>
          <el-menu-item-group>
            <template v-for="twoDepthMenu in menu.children" :key="`user-sidebar-menu-two-depth-${twoDepthMenu.menuId}`">
              <el-menu-item :index="twoDepthMenu.menuIndex"
                :class="{ 'el-menu-item__link': twoDepthMenu.menuId === 'ixiStudioGo' || twoDepthMenu.menuId === 'ixiBestPractices' }"
                @click="movePage(twoDepthMenu.menuUrl!)">
                <template #title>
                  <span>{{ twoDepthMenu.menuName }}</span>
                </template>
              </el-menu-item>

              <template v-if="twoDepthMenu.children && twoDepthMenu.menuId !== 'apiReference'">
                <ul class="el-menu-item__two-depth">
                  <li v-for="threeDepthMenu in twoDepthMenu.children"
                    :key="`user-header-menu-three-depth-${threeDepthMenu.menuId}`"
                    @click="moveNewWebSide(threeDepthMenu)">
                    {{ threeDepthMenu.menuName }}
                  </li>
                </ul>
              </template>
            </template>
          </el-menu-item-group>
        </el-sub-menu>
        <!-- 메뉴가 1뎁스 인 경우 사용 -->
        <el-menu-item v-else :index="menu.menuIndex" @click="movePage(menu.menuUrl!)">
          <!-- TODO: icon 필요할때 사용 -->
          <!-- <Icon :name="menu.icon" width="20" height="20" /> -->

          <template #title>
            <span>{{ menu.menuName }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </header>
</template>

<style lang="scss">
@import '~/styles/components/header'
</style>
