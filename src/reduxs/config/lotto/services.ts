import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetLottoSchedule = () => axios.get(endpoint.getLottoSchedule)