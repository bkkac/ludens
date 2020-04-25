declare interface APISuccessResponse<T = any> {
  data: T
  code: number
  devMessage: string
}