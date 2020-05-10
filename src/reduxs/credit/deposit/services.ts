import axios from 'axios'
import { endpoint } from './constants'

export const fetchDepositRequest = (data: IDepositRequest) => axios.post(endpoint.depositRequest, data)