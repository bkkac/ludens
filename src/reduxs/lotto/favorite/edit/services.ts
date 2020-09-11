import axios from 'axios'
import { endpoint } from './constants'

export const fetchEditLottoFavorite = (data: { id: number; title: string }) =>
  axios.put(endpoint.editLottoFavorite, data)

export const fetchEditLottoFavoriteNumber = (data: IFavoriteNumberRequest) =>
  axios.put(endpoint.editLottoFavoriteNumber, data)