import project from 'constants/project'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'
export const RESET_PASSWORD_CANCEL = 'RESET_PASSWORD_CANCEL'

export const initialState: ReducerState<IResetPasswordSuccess> = {
  isFetching: false,
  code: 0,
  data: {},
  error: '',
}

export const endpoint = {
  resetPassword: `${project.environment[project.environmentName].api}/user/reset_password`,
}