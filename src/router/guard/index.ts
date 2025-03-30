import type { Router } from 'vue-router'
import { setRouteEmitter } from '@/utils/routeListener'
import setupPermissionGuard from './permission'
import setupUserInfoGuard from './userInfo'

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    setRouteEmitter(to)
  })
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router)
  setupUserInfoGuard(router)
  setupPermissionGuard(router)
}
