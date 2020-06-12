import axios from 'axios'
import { endpoint } from './constants'

export const fetchYeegeSum = (query: IGetYeegeSum) => axios.get(endpoint.getAllYeegeGame(query))