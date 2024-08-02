<script setup lang="ts">
const menuList = reactive([
  {
    menuId: 'Example',
    menuName: 'Example',
    menuIndex: '0',
    menuUrl: '/examples',
    disabled: false,
  },
  {
    menuId: '공지사항(관리자)',
    menuName: '공지사항(관리자)',
    menuIndex: '1',
    menuUrl: '/system/announcement/admin-index',
    disabled: false,
  },
  {
    menuId: 'FAQ(관리자)',
    menuName: 'FAQ(관리자)',
    menuIndex: '2',
    menuUrl: '/system/faq/admin-index',
    disabled: false,
  },
  // {
  //   menuId: 'Q&A(관리자)',
  //   menuName: 'Q&A(관리자)',
  //   menuIndex: '3',
  //   menuUrl: '/system/qna/admin-index',
  // },
  {
    menuId: '공지사항(사용자)',
    menuName: '공지사항(사용자)',
    menuIndex: '4',
    menuUrl: '/system/announcement',
    disabled: false,
  },
  {
    menuId: 'FAQ(사용자)',
    menuName: 'FAQ(사용자)',
    menuIndex: '5',
    menuUrl: '/system/faq',
    disabled: false,
  },
  // {
  //   menuId: 'Q&A(사용자)',
  //   menuName: 'Q&A(사용자)',
  //   menuIndex: '6',
  //   menuUrl: '/system/qna',
  // },
  {
    menuId: '사용자 관리',
    menuName: '사용자 관리',
    menuIndex: '7',
    menuUrl: '/admin/pages/user-mgmt',
  },
  {
    menuId: '사용자 권한 관리',
    menuName: '사용자 권한 관리',
    menuIndex: '8',
    menuUrl: '/admin/pages/user-auth',
  },
  {
    menuId: '데이터 셋 관리',
    menuName: '데이터 셋 관리',
    menuIndex: '9',
    menuUrl: '/admin/pages/data-set',
  },
  {
    menuId: '데이터 시각화 관리',
    menuName: '데이터 시각화 관리',
    menuIndex: '10',
    menuUrl: '/admin/pages/data-visual',
  },
  {
    menuId: '배치 관리',
    menuName: '배치 관리',
    menuIndex: '11',
    menuUrl: '/admin/pages/batch-mgmt',
  },
  {
    menuId: '배치 이력 관리',
    menuName: '배치 이력 관리',
    menuIndex: '12',
    menuUrl: '/admin/pages/batch-history',
  },
  {
    menuId: 'Globe',
    menuName: 'Globe',
    menuIndex: '13',
    menuUrl: '/globe',
  },
  {
    menuId: 'FlatMap',
    menuName: 'FlatMap',
    menuIndex: '14',
    menuUrl: '/Flatmap',
  },
])

const router = useRouter()

const movePage = (menuUrl: string) => {
  const newWebPageUrlRegex = /http(s)?:\/\/.+/
  if (newWebPageUrlRegex.test(menuUrl))
    window.open(menuUrl)
  else
    router.push(menuUrl)
}
</script>

<template>
  <aside class="sidebar">
    <h1 class="logo">
      <a href="#">CQIS</a>
    </h1>
    <el-menu>
      <template v-for="menu in menuList" :key="`mgmt-sidebar-${menu.menuId}`">
        <el-sub-menu v-if="menu.children" :index="menu.menuIndex">
          <template #title>
            <span>{{ menu.menuName }}</span>
          </template>
          <!-- 2depth -->
          <el-menu-item-group>
            <el-menu-item v-for="lowerMenu in menu.children" :key="`mgmt-sidebar-menu-lower-${lowerMenu.menuId}`"
              :index="lowerMenu.menuIndex" @click="movePage(lowerMenu.menuUrl!)">
              <span>{{ lowerMenu.menuName }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.menuIndex" @click="movePage(menu.menuUrl!)">
          <template #title>
            <span>{{ menu.menuName }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>

<style lang="scss"></style>
