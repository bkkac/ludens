import project from 'constants/project'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE'
export const FORGOT_PASSWORD_CANCEL = 'FORGOT_PASSWORD_CANCEL'

export const initialState: ReducerState<IForgotPassword> = {
  isFetching: false,
  code: 0,
  data: {
    id: 0,
    otp: 0,
    userId: 0,
    reqCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  error: '',
}

export const endpoint = {
  forgotPassword: `${project.environment[project.environmentName].api}/user/forgot_password`,
}