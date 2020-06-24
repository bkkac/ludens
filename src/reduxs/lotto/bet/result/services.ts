import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetBetResult = (data: IBetResultRequest) => axios.get(endpoint.getBetResult(data))