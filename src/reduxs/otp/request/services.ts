import axios from 'axios'
import { endpoint } from './constants'

export const fetchOTPRequest = (phoneNumber: string) => axios.post(endpoint.getOTP, { phoneNumber })