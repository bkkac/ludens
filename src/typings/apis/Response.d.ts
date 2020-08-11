declare interface APIResponse<T = any> {
  data: T
  code: number
  devMessage: string
}

declare interface APIPagination<T = any> {
  page: number
  limit: number
  total: number
  dataList: T[]
}