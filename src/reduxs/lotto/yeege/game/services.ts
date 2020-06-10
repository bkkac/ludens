import axios from 'axios'
import { endpoint } from './constants'

export const fetchYeegeGameList = () => axios.get(endpoint.getAllYeegeGame)