import axios from 'axios'
import { endpoint } from './constants'

export const fetchLottoList = () => axios.get(endpoint.getAllLotter)