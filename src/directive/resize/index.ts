export type Size = {
  width: number
  height: number
}
export type ResizeBinding = (size: Size) => void

const map: WeakMap<object, ResizeBinding> = new WeakMap()

const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target)
    if (handler)
      handler({
        width: entry.borderBoxSize[0].inlineSize,
        height: entry.borderBoxSize[0].blockSize,
      })
  }
})

export default {
  mounted(el: HTMLElement, binding: { value: ResizeBinding }) {
    ob.observe(el)
    map.set(el, binding.value)
  },
  unmounted(el: HTMLElement) {
    ob.unobserve(el)
    map.delete(el)
  },
}
