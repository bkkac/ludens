import project from 'constants/project'

export const GET_OTP_REQUEST = 'GET_OTP_REQUEST'
export const GET_OTP_SUCCESS = 'GET_OTP_SUCCESS'
export const GET_OTP_FAILURE = 'GET_OTP_FAILURE'
export const GET_OTP_CANCEL = 'GET_OTP_CANCEL'

export const initialState: IOTPRequestState = {
  isFetching: false,
  code: 0,
  data: {
    id: 0,
    otp: '',
    count: 0,
    createAt: '',
    phoneNumber: '',
  },
  error: '',
}

const develop = 'dev'

export const endpoint = {
  getOTP: `${project.environment[develop].api}/otp`,
}