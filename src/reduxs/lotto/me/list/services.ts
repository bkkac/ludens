import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetBetHistory= () => axios.get(endpoint.getBetHistory)