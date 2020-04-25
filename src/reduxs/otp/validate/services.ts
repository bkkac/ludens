import axios from 'axios'
import { endpoint } from './constants'

export const fetchOTPValidate = (data: { phoneNumber: string; otp: string }) =>
  axios.post(endpoint.validateOTP, data)