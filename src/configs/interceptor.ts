import axios from 'axios'

const requestInterceptor = (config: any) => {
  const configMod = {
    ...config,
    headers: {
      ...config.headers,
    },
    url: config.url.replace(/([^:])(\/\/)/g, '$1/'),
  }
  return configMod
}

// const responseInterceptor = (response: any): AxiosResponse => response

// const errorResponseHandler = ({ dispatch }: any) => (error: AxiosError) => {
//   const errorResponse = get(error, 'response.data')
//   if (isEmpty(errorResponse)) {
//     return Promise.reject({ Message: error, Code: 400 })
//   }
//   return Promise.reject(errorResponse)
// }

const errorRequestHandler = (error: any) => Promise.reject(error)

const initService = (config: any, store: any) => {
  // Axios globals configuration
  // axios.defaults.baseURL = config.baseURL || ''
  axios.defaults.responseType = 'json'
  axios.defaults.headers['Content-Type'] = 'application/json'
  axios.interceptors.request.use(requestInterceptor, errorRequestHandler)
  // axios.interceptors.response.use(responseInterceptor, errorResponseHandler(store))
  axios.defaults.timeout = 60000

}

export default initService