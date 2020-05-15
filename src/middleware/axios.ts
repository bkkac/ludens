import axios from 'axios'
import { MiddlewareAPI, Dispatch } from 'redux'

const axiosMiddleware = ({ getState }: MiddlewareAPI<Dispatch, RootReducers>) => (next: Dispatch) => (action: any) => {
  const token = getState().ludens.user.token.accessToken
  axios.defaults.headers.common.token = token
  return next(action)
}

export default axiosMiddleware