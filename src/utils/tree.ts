/* eslint-disable @typescript-eslint/no-explicit-any */
// 组装成树形结构
export function generateTree(
  data: any[],
  {
    id = 'id',
    pid = 'pid',
  }: {
    id?: string
    pid?: string
  } = {},
) {
  const map = data.reduce((obj, item) => {
    obj[item[id]] = item
    return obj
  }, {})
  const rusult: any[] = []
  data.forEach((child) => {
    const mapItem = map[child[pid]]
    if (mapItem) {
      ;(mapItem.children || (mapItem.children = [])).push(child)
    } else {
      rusult.push(child)
    }
  })
  return rusult
}
