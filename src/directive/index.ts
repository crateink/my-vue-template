import type { App } from 'vue'
import resize from './resize'

export default {
  install(Vue: App) {
    Vue.directive('resize', resize)
  },
}
