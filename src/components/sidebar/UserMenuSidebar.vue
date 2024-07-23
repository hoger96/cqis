<!-- 랜딩페이지 서브메뉴 화면 Sidebar (UserMenuLayout) -->
<script setup lang="ts">
import type { ElTree, MenuInstance, TreeInstance } from 'element-plus';
import { menuTreeProps } from "~/menus";
import type { IMenu, IMenuSetting } from '~/types/menu';

const props = withDefaults(defineProps<IMenuSetting>(), {
  sideMenuList: () => [],
  menuBackgroundColor: '', // 메뉴 배경색 지정
  menuActiveTextColor: '', // 메뉴 활성화 text 색상 지정
  menuTextColor: '', // 메뉴 text 색상 지정
})

const router = useRouter()
const menuList = ref<readonly IMenu[]>(props.sideMenuList)

watch(() => props.sideMenuList, (newSideMenuList) => {
  menuList.value = newSideMenuList
})

const route = useRoute()
const getActiveMenu = () => {
  let activeMenu = ''
  const activeMenuInfo = findActiveMenuInfo(menuList.value, route.path)

  if (isEmpty(activeMenuInfo))
    activeMenu = ''
  else
    activeMenu = activeMenuInfo!.menuUrl!

  return activeMenu
}

const moveNewWebSide = (twoDepthMenuInfo: IMenu) => {
  if (!isEmpty(twoDepthMenuInfo.menuUrl))
    window.open(twoDepthMenuInfo.menuUrl)
}

const movePage = (menuUrl: string) => {
  const newWebPageUrlRegex = /http(s)?:\/\/.+/
  if (newWebPageUrlRegex.test(menuUrl))
    window.open(menuUrl)
  else
    router.push(menuUrl)
}

const handleClickNode = (node: IMenu) => {
  if (node.menuUrl && !node.disabled)
    movePage(node.menuUrl)
}

const menuRef = ref<MenuInstance | null>(null)
const treeRef = ref<TreeInstance[] | null>(null)

const activateCurrMenu = () => {
  if (menuRef.value) {
    if (route.path.includes('/ixi-solution-intro/') && !route.path.includes('overview')) {
      menuRef.value.open('/ixi-solution-intro/api-reference')
    }
  }
}

onMounted(activateCurrMenu)

const isTreeAvail = computed(() => !!treeRef.value && treeRef.value.length > 0)

const getCurrentKey = () => {
  return route.path
}
const handleChangeCurrentNode = (data: IMenu, node: any) => {
  // console.log("handleChangeCurrentNode: ", node.disabled)
  if (isTreeAvail.value && treeRef.value) {
    const t = treeRef.value[0]
    t.setCurrentKey(getCurrentKey())
  }
}

watch(() => route.path, async () => {
  nextTick(() => {
    activateCurrMenu()
  })

  if (treeRef.value && route.path === '/ixi-solution-intro/overview') {
    treeRef.value[0].setCurrentKey(undefined)
  }
})

</script>

<template>
  <div class="sidebar sidebar--user">
    <!-- 메뉴 -->
    <el-menu ref="menuRef" :default-active="getActiveMenu()" :background-color="menuBackgroundColor" :router="true"
      :unique-opened="true" :collapse="false" :collapse-transition="false" :active-text-color="menuActiveTextColor"
      :text-color="menuTextColor" :default-openeds="[route.path]">
      <template v-for="menu in menuList" :key="`user-sidebar-${menu.menuId}`">
        <template v-if="menu.children && !menu.isSubMenuCustom">
          <el-sub-menu :index="menu.menuUrl ?? menu.menuId"
            :class="{ 'el-menu-item__link': menu.menuId === 'ixiBestPractices' }"
            @click="() => menu.menuUrl && movePage(menu.menuUrl)">
            <template #title>
              <Icon :name="menu.icon" width="24" height="24" alt="" class="icon--basic" />
              <Icon :name="menu.iconHover" width="24" height="24" alt="" class="icon--hover" />
              <span>{{ menu.menuName }}</span>
            </template>
          </el-sub-menu>
          <el-tree ref="treeRef" :data="menu.children" :props="menuTreeProps" highlight-current
            @node-click="handleClickNode" node-key="menuUrl" :current-node-key="getCurrentKey()"
            @current-change="handleChangeCurrentNode">
            <template #default="{ node: _node, data }">
              <span :class="{
      'disabled-tree-item': data.disabled,
      // 'enabled-tree-item': !data.disabled,
      // 'unClickable-tree-item': !data.menuUrl || data.menuUrl.length < 1,
    }">
                {{ data.menuName }}
              </span>
            </template>
          </el-tree>
        </template>
        <!-- <el-sub-menu v-if="menu.children && !menu.isSubMenuCustom && !menu.isNotCollapse"
          :index="menu.menuUrl ?? menu.menuId" :class="{ 'el-menu-item__link': menu.menuId === 'ixiBestPractices' }"
          @click="() => menu.menuUrl && movePage(menu.menuUrl)">
          <template #title>
            <Icon :name="menu.icon" width="24" height="24" alt="" class="icon--basic" />
            <Icon :name="menu.iconHover" width="24" height="24" alt="" class="icon--hover" />
            <span>{{ menu.menuName }} </span>
          </template>
          <el-tree ref="treeRef" :data="menu.children" :props="menuTreeProps" highlight-current
            @node-click="handleClickNode" node-key="menuUrl" :current-node-key="getCurrentKey()"
            @current-change="handleChangeCurrentNode">
            <template #default="{ node: _node, data }">
              <span :class="{
                // 'disabled-tree-item': data.disabled,
                // 'enabled-tree-item': !data.disabled,
                'unClickable-tree-item': !data.menuUrl || data.menuUrl.length < 1,
              }">
                {{ data.menuName }}
              </span>
            </template>
          </el-tree>
        </el-sub-menu> -->

        <!-- <el-menu-item-group>
            <div v-for="lowerMenu in menu.children">
              <el-menu-item v-if="!lowerMenu.children || lowerMenu.children.length < 1"
                :key="`user-sidebar-menu-lower-${lowerMenu.menuId}`" :index="lowerMenu.menuUrl"
                class="el-menu-item__link" @click="movePage(lowerMenu.menuUrl!)">
                <span>{{ lowerMenu.menuName }}</span>
              </el-menu-item>
              <div v-else>
                <el-tree :data="lowerMenu.children" :props="menuTreeProps" @node-click="handleClickNode" />
              </div>
            </div>
          </el-menu-item-group> -->
        <template v-else-if="menu.children && menu.isSubMenuCustom">
          <!-- 두번째 뎁스 메뉴 닫히는것 없고, 하위까지 전부 보이는 경우 사용 -->
          <el-menu-item :index="menu.menuUrl" :class="{ 'el-menu-item__link': menu.menuId === 'ixiBestPractices' }"
            @click="() => menu.menuUrl && movePage(menu.menuUrl)">
            <template #title>
              <Icon :name="menu.icon" width="24" height="24" alt="" class="icon--basic" />
              <Icon :name="menu.iconHover" width="24" height="24" alt="" class="icon--hover" />
              <span>{{ menu.menuName }}</span>
            </template>
          </el-menu-item>
          <div v-for="twoDepthMenu in menu.children" :key="`user-sidebar-menu-two-depth-${twoDepthMenu.menuId}`"
            class="el-menu-item__link--depth cursor-pointer" @click="moveNewWebSide(twoDepthMenu)">
            {{ twoDepthMenu.menuName }}
          </div>
        </template>

        <el-menu-item v-else :index="menu.menuUrl" :class="{ 'el-menu-item__link': menu.menuId === 'ixiStudioGo' }"
          @click="movePage(menu.menuUrl!)">
          <template #title>
            <Icon :name="menu.icon" width="24" height="24" alt="" class="icon--basic" />
            <Icon :name="menu.iconHover" width="24" height="24" alt="" class="icon--hover" />
            <span>{{ menu.menuName }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>

    <button type="button" class="sidebar__btn">
      <icon name="info__full--c5c" width="20" height="20" alt="" />
      Help
    </button>
  </div>
</template>

<style lang="scss">
@import '~/styles/components/sidebar';

.disabled-tree-item {
  color: $gray-90 !important;
  // cursor: not-allowed;
}
</style>
