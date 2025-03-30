import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
export default function usePermission() {
  const userStore = useUserStore()
  return {
    /**
     * 检查是否有权限访问指定路由
     * @param {RouteLocationNormalized | RouteRecordRaw} route - 要检查的路由
     * @returns {boolean} - 如果有权限访问则返回 true，否则返回 false
     */
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      // 如果路由不需要认证，直接返回 true
      return (
        !route.meta?.requiresAuth ||
        // 如果路由角色包含 '*'，表示所有角色都可访问，返回 true
        (Array.isArray(route?.meta?.roles) && route.meta.roles.includes('*')) ||
        // 如果路由角色包含当前用户的角色，返回 true
        (Array.isArray(route?.meta?.roles) &&
          route.meta.roles.some((role: string) => userStore.roles.includes(role)))
      )
    },
    /**
     * 查找第一个具有权限的路由
     * @param {any} routers - 路由列表
     * @returns {Object | null} - 如果找到具有权限的路由，则返回包含路由名称的对象；否则返回 null
     */
    findFirstPermissionRoute(
      routers: RouteRecordRaw[],
    ): RouteLocationNormalized | RouteRecordRaw | null {
      // 遍历路由列表
      for (const route of routers) {
        // 如果路由没有子路由，检查当前路由是否有权限访问
        if (!route.children || route.children.length === 0) {
          console.log(route)

          if (
            // 如果路由角色包含 '*'，表示所有角色都可访问，返回 true
            (Array.isArray(route?.meta?.roles) && route.meta.roles.includes('*')) ||
            // 如果路由角色包含当前用户的角色，返回 true
            (Array.isArray(route?.meta?.roles) &&
              route.meta.roles.some((role: string) => userStore.roles.includes(role)))
          ) {
            return { name: route.name } as RouteLocationNormalized
          }
        } else {
          // 如果路由有子路由，递归检查子路由
          const childRoute = this.findFirstPermissionRoute(route.children)
          if (childRoute) {
            return childRoute
          }
        }
      }
      // 如果没有找到具有权限的路由，返回 null
      return null
    },
  }
}
