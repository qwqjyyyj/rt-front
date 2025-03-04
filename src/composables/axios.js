import axios from 'axios'
import { useUserStore } from '@/stores/user'

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API,
})

// Axios 攔截器，interceptors.request(請求設定 =>{})
apiAuth.interceptors.request.use((config) => {
  const user = useUserStore()
  config.headers.Authorization = 'Bearer ' + user.token
  return config
})

// 攔截器，interceptors.response(成功處理,失敗處理)
apiAuth.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response) {
      // 是登入過期，而且不是舊換新
      if (error.response.data.message === '登入過期' && error.config.url !== '/user/refresh') {
        const user = useUserStore()
        try {
          // 傳送舊換新請求
          const { data } = await apiAuth.patch('/user/refresh')
          // 更新store的token
          user.token = data.result
          // 修改發生錯誤的請求設定，換成新的token
          error.config.headers.Authorization = 'Bearer ' + user.token
          // 用新的設定重新傳送一次原本的請求
          return axios(error.config)
        } catch (error) {
          console.log(error)
          // 舊換新錯誤，登出
          user.logout()
        }
      }
    }
    // 回傳原本的錯誤
    return Promise.reject(error)
  },
)

export const useAxios = () => {
  return { api, apiAuth }
}
