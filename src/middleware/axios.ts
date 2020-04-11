import axios from 'axios'


const axiosMiddleware = ({ getState }: any) => (next: any) => (action: any) => {
  // getAccessToken((token: string)=> {
    axios.defaults.headers.common.Authorization = `Bearer ${'token'}` || ''
    return next(action)
  // })
}

export default axiosMiddleware