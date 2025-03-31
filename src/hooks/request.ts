// 拉取数据策略
import type { AxiosResponse } from 'axios'
import useLoading from './loading'

interface HttpResponse<T = unknown> {
  status: number
  msg: string
  code: number
  data: T
}

export default function useRequest<T>(
  api: () => Promise<AxiosResponse<HttpResponse>>,
  defaultResponse = [] as T,
  isLoading: boolean = true,
) {
  const { loading, setLoading } = useLoading(isLoading)
  const response = ref<T>(defaultResponse)

  api()
    .then((res) => (response.value = res.data as T))
    .finally(() => {
      setLoading(false)
    })

  return {
    loading,
    response,
  }
}
