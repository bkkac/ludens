import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetMeConfig = () => axios.get(endpoint.getMeConfig)