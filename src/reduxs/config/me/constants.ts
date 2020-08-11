import project from 'constants/project'

export const GET_ME_CONFIG_REQUEST = 'GET_ME_CONFIG_REQUEST'
export const GET_ME_CONFIG_SUCCESS = 'GET_ME_CONFIG_SUCCESS'
export const GET_ME_CONFIG_FAILURE = 'GET_ME_CONFIG_FAILURE'
export const GET_ME_CONFIG_CANCEL = 'GET_ME_CONFIG_CANCEL'

export const initialState: ReducerState<IWebConfig> = {
  isFetching: false,
  code: 0,
  data: {
    id: 0,
    textRunner: '',
    contactUrl: '',
    contactLine: '',
    contactPhoneNumber: '',
    updatedAt: '',
  },
  error: '',
}

export const endpoint = {
  getMeConfig: `${project.environment[project.environmentName].api}/config/web/me`,
}