import { createRouter, createWebHistory } from 'vue-router'
import appRoutes from './appRoutes'
import createRouteGuard from './guard'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    ...appRoutes,
  ],
})

createRouteGuard(router)

export default router
