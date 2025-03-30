import type { App } from 'vue'
import permission from './permission'

import resize from './resize'

export default {
  install(Vue: App) {
    Vue.directive('permission', permission)
    Vue.directive('resize', resize)
  },
}
