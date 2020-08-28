import axios from 'axios'
import { endpoint } from './constants'

export const fetchForgotPassword = (data: IForgotPasswordRequest) => axios.post(endpoint.forgotPassword, data)