<template>
  <v-app-bar
    style="background-color: rgba(255, 255, 255, 0.5); backdrop-filter: blur(3px)"
    :elevation="0"
  >
    <v-container class="d-flex justify-center">
      <v-btn to="/" :active="false">首頁</v-btn>
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn v-bind="props">呼吸器模擬 ⌵</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="page in filteredPages" :key="page.to" :to="page.to">
            <v-list-item-title>{{ page.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn v-bind="props">小遊戲 ⌵</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="page2 of page2s" :key="page2.to" :to="page2.to">
            <v-list-item-title>{{ page2.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-for="nav of navs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon">{{ nav.text }}</v-btn>
      </template>
      <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-account-arrow-right" @click="logout">{{
        '登出'
      }}</v-btn>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
  <v-footer class="bg-grey-lighten-1">
    <v-row justify="left" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="mx-2"
        color=""
        rounded="xl"
        variant="text"
        :active="false"
        >{{ link.text }}</v-btn
      >
      <v-col class="text-right mt-4" cols="12">yyOuOyy</v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import router from '@/router'

const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

// 導覽列
const navs = computed(() => {
  return [
    { to: '/contact', text: '聯絡', icon: '', show: true },
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLoggedIn },
    { to: '/login', text: '登入', icon: 'mdi-account-arrow-left', show: !user.isLoggedIn },
    {
      to: '/person',
      text: '個人檔案',
      icon: 'mdi-account',
      show: user.isLoggedIn,
    },
  ]
})

const pages = computed(() => {
  return [
    { to: '/simulator_ins', title: '操作說明', if: true },
    { to: '/simulator_visitor', title: '遊客介面', if: !user.isLoggedIn },
    { to: '/simulator', title: '介面', if: user.isLoggedIn },
  ]
})

const filteredPages = computed(() => {
  return pages.value.filter((page) => page.if) // 只回傳符合條件的項目
})

const page2s = computed(() => {
  return [
    { to: '/game_ins', title: '遊玩說明' },
    { to: '/game', title: '遊戲區' },
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
  } catch (error) {
    console.log(error)
  }
  user.logout()
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'green',
    },
  })
  router.push('/')
}

// 算動態的嗎?待確認或改寫
const links = computed(() => {
  return [
    { to: '/', text: '首頁' },
    { to: '/simulator_ins', text: '呼吸器模擬' },
    { to: '/game_ins', text: '小遊戲' },
    { to: '/contact', text: '聯絡' },
  ]
})
</script>
