import { defineStore } from 'pinia'

export default defineStore('app', () => {
  // 是否使用后端返回的菜单
  const appAsyncMenus = ref(false)

  return { appAsyncMenus }
})
