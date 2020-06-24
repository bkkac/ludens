import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetCreditInfo = () => axios.get(endpoint.getCreditInfo)