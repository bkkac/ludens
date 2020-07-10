import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetBetRate = () => axios.get(endpoint.getBetRate)