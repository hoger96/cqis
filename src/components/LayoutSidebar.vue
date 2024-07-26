<script setup lang="ts">
const menuList = reactive([
  {
    menuId: '공지사항(관리자)',
    menuName: '공지사항(관리자)',
    menuIndex: '0',
    menuUrl: 'admin/annc',
    disabled: false,
  },
  {
    menuId: 'FAQ(관리자)',
    menuName: 'FAQ(관리자)',
    menuIndex: '1',
    menuUrl: 'admin/faq',
    disabled: false,
  },
  {
    menuId: 'Q&A(관리자)',
    menuName: '사용자 관리',
    menuIndex: '2',
    menuUrl: 'admin/user-mgmt',
  },
  {
    menuId: 'Q&A(관리자)',
    menuName: 'Q&A(관리자)',
    menuIndex: '3',
    menuUrl: '/admin/qna',
  },
  {
    menuId: '2depth',
    menuName: '2depth',
    menuIndex: '4',
    menuUrl: '/admin/qna',
    children: [
      {
        menuId: 'synonym',
        menuName: '동의어',
        menuIndex: '4-1',
        menuUrl: '/mgmt/word-mgmt/synonym',
      },
      {
        menuId: 'userDictionary',
        menuName: '사용자 사전',
        menuIndex: '4-2',
        menuUrl: '/mgmt/word-mgmt/user-dictionary',
      },
    ],
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
