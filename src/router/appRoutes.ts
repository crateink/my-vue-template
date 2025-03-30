import type { RouteRecordRaw } from 'vue-router'
import type { AppRouteRecordRaw } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withAutoName = (loader: () => Promise<any>, name: string) => {
  return () =>
    loader().then((component) => {
      component.default.name = name
      return component
    })
}

const views = import.meta.glob('../views/**/index.vue', { eager: false })
const pages: Record<
  string,
  {
    default: AppRouteRecordRaw
  }
> = import.meta.glob('../views/**/index.json', {
  eager: true,
})
const appRoutes: RouteRecordRaw[] = []
const routesMap = new Map()

const routesLevelMap = new Map<string, string>()
Object.keys(pages).forEach((key) => {
  const path = key.replace('/index.json', '').replace('../views', '')
  const uris = path.split('/').filter(Boolean)
  let parentPath = ''
  uris.forEach((uri) => {
    const currentPath = `${parentPath}/${uri}`
    routesLevelMap.set(currentPath, parentPath)
    parentPath = currentPath
  })
})

routesLevelMap.forEach((parentPath, path) => {
  const name = path
    .split('/')
    .filter(Boolean)
    .map((uri: string) => uri.replace(/^\S/, (s) => s.toUpperCase()))
    .join('')

  const route = {
    path,
    name,
    ...pages[`../views${path}/index.json`]?.default,
  }
  const view = views[`../views${path}/index.vue`]
  if (view) {
    route.component = withAutoName(view, name)
  } else if (parentPath === '') {
    route.component = () => import('@/layout/index.vue')
  }
  if (parentPath === '') {
    appRoutes.push(route as RouteRecordRaw)
  } else {
    const parentRoute = routesMap.get(parentPath)
    if (parentRoute) {
      if (!parentRoute.children) {
        parentRoute.children = []
      }
      parentRoute.children.push(route)
    }
  }

  routesMap.set(path, route)
})

export default appRoutes
