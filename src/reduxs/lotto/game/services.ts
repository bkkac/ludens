import axios from 'axios'
import { endpoint } from './constants'

export const fetchLottoGame = (slugName: TLottoSlug) => axios.get(endpoint.getLottoGame(slugName))