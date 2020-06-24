import axios from 'axios'
import { endpoint } from './constants'

export const fetchMakingBetLotto = (data: ILottoNumber[]) => axios.post(endpoint.makingBetLotto, data)