import project from 'constants/project'

export const VALIDATE_OTP_REQUEST = 'VALIDATE_OTP_REQUEST'
export const VALIDATE_OTP_SUCCESS = 'VALIDATE_OTP_SUCCESS'
export const VALIDATE_OTP_FAILURE = 'VALIDATE_OTP_FAILURE'
export const VALIDATE_OTP_CANCEL = 'VALIDATE_OTP_CANCEL'

export const initialState: IOTPValidateState = {
  isFetching: false,
  code: 0,
  data: false,
  error: '',
}

const develop = 'dev'

export const endpoint = {
  validateOTP: `${project.environment[develop].api}/otp/validate`,
}