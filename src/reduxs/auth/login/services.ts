import axios from 'axios'
import { endpoint } from './constants'

export const fetchLogin = (data: ILoginRequest) => axios.post(endpoint.login, data)