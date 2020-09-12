import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetLottoFavorite = (id: number) =>
  axios.get(endpoint.getLottoFavorite(id))
