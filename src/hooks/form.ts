// 表单提交策略
import type { AxiosResponse } from 'axios'
import useLoading from './loading'

interface HttpResponse<T = unknown> {
  list: T
  page: number
  pageSize: number
  total: number
}

export default function useForm<T>(
  api: () => Promise<AxiosResponse<HttpResponse>>,
  { initData = [] as T, initPage = 1, initPageSize = 10, initTotal = 0 } = {},
) {
  const { loading, setLoading } = useLoading(true)
  const list = ref<T>(initData)
  const page = ref(initPage)
  const pageSize = ref(initPageSize)
  const total = ref(initTotal)

  api()
    .then((res) => {
      page.value = res.data.page || initPage
      pageSize.value = res.data.pageSize || initPageSize
      total.value = res.data.total || initTotal
      list.value = res.data.list || initData
    })
    .finally(() => {
      setLoading(false)
    })

  return {
    loading,
    list,
    page,
    pageSize,
    total,
  }
}
