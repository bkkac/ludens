import project from 'constants/project'

export const GET_ME_REQUEST = 'GET_ME_REQUEST'
export const GET_ME_SUCCESS = 'GET_ME_SUCCESS'
export const GET_ME_FAILURE = 'GET_ME_FAILURE'
export const GET_ME_CANCEL = 'GET_ME_CANCEL'

export const initialState: IGetMeState = {
  isFetching: false,
  code: 0,
  data: {},
  error: '',
}

const develop = 'dev'

export const endpoint = {
  getMe: `${project.environment[develop].api}/user/me`,
}