import type { Router, LocationQueryRaw } from 'vue-router'
import NProgress from 'nprogress'
export default function setupUserInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    const userStore = useUserStore()
    if (userStore.loggedIn) {
      if (userStore.isInitUserInfo) {
        next()
      } else {
        try {
          await userStore.initUserInfo()
          next()
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          next({
            name: 'Login',
            query: {
              redirect: to.name,
            } as LocationQueryRaw,
          })
        }
      }
    } else {
      if (to.name === 'Login') {
        next()
        return
      }
      next({
        name: 'Login',
        query: {
          redirect: to.name,
        } as LocationQueryRaw,
      })
    }
  })
}
