import axios from 'axios'

export const fetchLottoList = () => axios.get('../mock/lotto-list.json')
