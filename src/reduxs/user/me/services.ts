import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetMe = () => axios.get(endpoint.getMe)
