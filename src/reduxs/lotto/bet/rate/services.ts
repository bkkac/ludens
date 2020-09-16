import axios, { AxiosResponse } from 'axios'
import { get, map } from 'lodash'
import { endpoint } from './constants'

export const fetchGetBetRate = () => axios.get(endpoint.getBetRate)

export const fetchGetBetNumberRate = (querys: IBetNumberRateRequest[]) => {
    const promises = map<IBetNumberRateRequest, Promise<IBetNumberRateRequest & { rate: string }>>(querys, (query) =>
        axios.get(endpoint.getNumberRate(query))
            .then((response: AxiosResponse<APIResponse<{ rate: string }>>) => {
                const rate = get(response, 'data.data.rate', '0')
                return Promise.resolve({ ...query, rate })
            })
            .catch(Promise.reject))

    return Promise.all<IBetNumberRateRequest & { rate: string }>(promises)
}