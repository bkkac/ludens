declare interface IOTPRequestState {
  isFetching?: boolean
  data?: IOTP
  error?: string
  code?: number | string
}

declare interface IOTPValidateState {
  isFetching?: boolean
  data?: boolean
  error?: string
  code?: number | string
}

declare interface IOTPState {
  request: IOTPRequestState
  validate: IOTPValidateState
}