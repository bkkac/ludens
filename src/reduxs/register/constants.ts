import project from 'constants/project'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const REGISTER_CANCEL = 'REGISTER_CANCEL'

export const initialState: IRegisterState = {
  isFetching: false,
  code: 0,
  data: {},
  error: '',
}

export const endpoint = {
  register: `${project.environment[project.environmentName].api}/register`,
}