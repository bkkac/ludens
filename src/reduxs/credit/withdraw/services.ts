import axios from 'axios'
import { endpoint } from './constants'

export const fetchWithdrawRequest = (data: IWithdrawRequest) => axios.post(endpoint.withdrawRequest, data)