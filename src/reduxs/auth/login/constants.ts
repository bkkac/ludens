import project from 'constants/project'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_CANCEL = 'LOGIN_CANCEL'

export const initialState: ReducerState<{ token: string }> = {
  isFetching: false,
  code: 0,
  data: { token: '' },
  error: '',
}

export const endpoint = {
  login: `${project.environment[project.environmentName].api}/auth/login`,
}