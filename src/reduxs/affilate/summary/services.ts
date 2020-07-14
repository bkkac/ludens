import axios from 'axios'
import { endpoint } from './constants'

export const fetchAffilateSummary = () => axios.get(endpoint.affilateSummary)