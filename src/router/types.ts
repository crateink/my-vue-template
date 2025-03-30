import { defineComponent } from 'vue'
import type { RouteMeta, NavigationGuard } from 'vue-router'

export type Component<T = unknown> = ReturnType<typeof defineComponent> | (() => Promise<T>)

export interface AppRouteRecordRaw {
  path?: string
  name?: string | symbol
  meta?: RouteMeta
  redirect?: string
  component: Component | string
  children?: AppRouteRecordRaw[]
  beforeEnter?: NavigationGuard | NavigationGuard[]
  fullPath?: string
}
