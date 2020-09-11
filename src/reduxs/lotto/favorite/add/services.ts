import axios from 'axios'
import { endpoint } from './constants'

export const fetchAddLottoFavorite = (title: string) => axios.post(endpoint.addLottoFavorite, { title })

export const fetchAddLottoFavoriteNumber = (data: IFavoriteNumberRequest) =>
  axios.post(endpoint.addLottoFavoriteNumber, data)