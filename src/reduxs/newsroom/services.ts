import axios from 'axios'
import { endpoint } from './constants'

export const fetchGetNewsroom = () => axios.get(endpoint.getNewsroom)