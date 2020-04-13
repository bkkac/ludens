import axios from 'axios'

export const fetchLottoList = () => axios.get('lotto-list.json')