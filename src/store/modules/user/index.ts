import { defineStore } from 'pinia'

export default defineStore('user', () => {
  const loggedIn = ref(true) // 是否登录

  const isInitUserInfo = ref(false) // 是否初始化用户信息

  async function initUserInfo() {
    loggedIn.value = true
    isInitUserInfo.value = true
  }

  return { loggedIn, isInitUserInfo, initUserInfo }
})
