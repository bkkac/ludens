import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetTransactionList = () => axios.get(endpoint.getTransactionList)