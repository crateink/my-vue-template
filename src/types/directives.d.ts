import type { Directive } from 'vue'
import type { ResizeBinding } from '@/directive/resize'

// 全局指令类型声明
declare module 'vue' {
  interface ComponentCustomProperties {
    vResize: Directive<HTMLElement, ResizeBinding>
  }
}
