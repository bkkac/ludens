import project from 'constants/project'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const LOGOUT_CANCEL = 'LOGOUT_CANCEL'

export const initialState: ReducerState = {
  code: 0,
  data: '',
  error: '',
}

export const endpoint = {
  logout: `${project.environment[project.environmentName].api}/auth/logout`,
}