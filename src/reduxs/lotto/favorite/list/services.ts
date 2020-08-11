import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetLottoFavoriteList = () => axios.get(endpoint.getLottoFavoriteList)