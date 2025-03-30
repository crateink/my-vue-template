import { defineStore } from 'pinia'

export default defineStore('app', () => {
  const menuFromServer = ref(false) // 是否使用后端返回的菜单
  const appAsyncMenus = ref([]) // 是否使用后端返回的菜单

  return { menuFromServer, appAsyncMenus }
})
