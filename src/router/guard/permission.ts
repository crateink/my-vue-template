import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import usePermission from '@/hooks/permission'
import appRoutes from '../appRoutes'
import { NOT_FOUND } from '../constants'
export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const permission = usePermission()
    NProgress.done()
    const allow = permission.accessRouter(to)
    if (allow) next()
    else {
      const destination = permission.findFirstPermissionRoute(appRoutes) || NOT_FOUND
      next(destination)
    }
  })
}
