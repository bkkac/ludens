import axios from 'axios'
import { endpoint } from './constants'

export const fetchAffilateMember = (date: string) => axios.get(endpoint.affilateMember(date))