import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetPlayedYeegeList = (data: ILottoRoundQuery) => axios.get(endpoint.getPlayedYeegeList(data))