// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const account = ref('')
    const role = ref(UserRole.USER)
    // cart還要再改過，根據controllers>user.js>login>result
    const cart = ref(0)

    const isLoggedIn = computed(() => {
      return token.value.length > 0
    })

    const isAdmin = computed(() => {
      return role.value === UserRole.ADMIN
    })

    const login = (data) => {
      if (data.token) {
        token.value = data.token
      }
      account.value = data.account
      role.value = data.role
      // 待改cart
      cart.value = data.cart
    }

    const logout = () => {
      token.value = ''
      account.value = ''
      role.value = UserRole.USER
      // 待改cart
      cart.value = 0
    }

    return {
      token,
      account,
      role,
      cart,
      isLoggedIn,
      isAdmin,
      login,
      logout,
    }
  },
  {
    persist: {
      // local storage存的資料
      key: 'simulator-user',
      pick: ['token'],
    },
  },
)
