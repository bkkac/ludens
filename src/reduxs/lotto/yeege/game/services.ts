import axios from 'axios'
import { endpoint } from './constants'

export const fetchLottoGame = (query: ILottoRoundQuery) => axios.get(endpoint.getLottoGame(query))