import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetBankList = () => axios.get(endpoint.getBankList)