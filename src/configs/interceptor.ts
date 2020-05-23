import axios, {
  AxiosRequestConfig,
  AxiosTransformer,
  AxiosResponse,
  AxiosError,
} from 'axios'
import { Store } from 'redux'
import { transformer } from 'utils'

const transformResponse: AxiosTransformer = transformer.camelcaseTransform
const transformRequest: AxiosTransformer = (data) => JSON.stringify(transformer.snakecaseTransform(data))

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return {
    ...config,
    headers: {
      ...config.headers,
    },
    transformResponse,
    transformRequest,
    url: config.url?.replace(/([^:])(\/\/)/g, '$1/'),
  }
}

const errorRequestHandler = (error: any) => Promise.reject(error)

const responseInterceptor = (response: AxiosResponse<any>): AxiosResponse<any> => response

const errorResponseHandler = (_: Store) => (error: AxiosError<AxiosResponse<any>>) => {
  return Promise.reject(error)
}

const initService = (config: any, store: any) => {
  // Axios globals configuration
  // axios.defaults.baseURL = config.baseURL || ''
  axios.defaults.responseType = 'json'
  axios.defaults.headers['Content-Type'] = 'application/json'
  axios.interceptors.request.use(requestInterceptor, errorRequestHandler)
  axios.interceptors.response.use(responseInterceptor, errorResponseHandler(store))
  axios.defaults.timeout = 60000

}

export default initService