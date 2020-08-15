import axios from 'axios'
import { endpoint } from './constants'

export const fetchYeegeSum = (query: ILottoRoundQuery) => axios.get(endpoint.getAllYeegeGame(query))