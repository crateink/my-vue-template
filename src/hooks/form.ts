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
  api: (arg: unknown) => Promise<AxiosResponse<HttpResponse>>,
  { initFormData = [] as T } = {},
) {
  const { loading, setLoading } = useLoading(false)
  const formData = ref(initFormData)

  const handleSubmit = () => {
    setLoading(true)
    api(formData.value)
      .then((res) => {
        console.log(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    loading,
    formData,
    handleSubmit,
  }
}
