import axios from 'axios'
import { endpoint } from './constants'

export const fetchResetPassword = (data: IResetPasswordRequest) => axios.post(endpoint.resetPassword, data)