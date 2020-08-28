import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetTransactionRequest = () => axios.get(endpoint.transactionRequest)

export const fetchSignTransactionRequest = (data: ISignTransactionRequest) =>
  axios.post(endpoint.transactionRequest, data)

export const fetchCancelingTransactionRequest = (transactionRequestId: number) =>
  axios.delete(endpoint.transactionRequest, { data: { id: transactionRequestId } })