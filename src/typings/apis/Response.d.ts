declare interface APIResponse<T = any> {
  data: T
  code: number
  devMessage: string
}