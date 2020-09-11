import axios from 'axios'
import { endpoint } from './constants'

export const fetchRemoveLottoFavorite = (id: number) =>
  axios.delete(endpoint.removeLottoFavorite, { data: { id } })

export const fetchRemoveLottoFavoriteNumber = (id: number) =>
  axios.delete(endpoint.removeLottoFavoriteNumber, { data: { id } })