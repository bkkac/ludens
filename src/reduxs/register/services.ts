import axios from 'axios'
import { endpoint } from './constants'

export const fetchRegister = (data: IRegisterRequest) => axios.post(endpoint.register, data)