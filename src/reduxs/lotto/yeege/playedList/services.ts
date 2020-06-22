import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetPlayedYeegeList = (data: IGetYeegeSum) => axios.get(endpoint.getPlayedYeegeList(data))