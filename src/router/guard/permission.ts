import type { Router } from 'vue-router'
import NProgress from 'nprogress'
export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.done()
    next()
  })
}
