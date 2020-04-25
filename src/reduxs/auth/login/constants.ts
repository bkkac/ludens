import project from 'constants/project'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_CANCEL = 'LOGIN_CANCEL'

export const initialState: ILoginState = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}

const develop = 'dev'

export const endpoint = {
  login: `${project.environment[develop].api}/auth/login`,
}