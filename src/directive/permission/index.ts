import type { DirectiveBinding } from 'vue'
import { useUserStore } from '@/store'

const nodeWeakMap = new WeakMap<HTMLElement, ParentNode>()

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding
  const userStore = useUserStore()

  if (Array.isArray(value)) {
    if (value.length > 0) {
      const permissionValues = value

      const hasPermission = userStore.roles.some((role) => {
        return permissionValues.includes(role)
      })

      if (!hasPermission) {
        if (el.parentNode) {
          nodeWeakMap.set(el, el.parentNode)
          el.parentNode.removeChild(el)
        }
      } else {
        const parentNode = nodeWeakMap.get(el)
        if (parentNode) {
          parentNode.appendChild(el)
          nodeWeakMap.delete(el)
        }
      }
    }
  } else {
    throw new Error(`Need roles, Example: v-permission="['admin','user']"`)
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
}
