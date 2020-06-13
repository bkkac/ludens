import axios from 'axios'
import { endpoint } from './constants'

export const fetchYeegePlay = (data: IYeegePlayRequest) => axios.post(endpoint.playYeege, data)