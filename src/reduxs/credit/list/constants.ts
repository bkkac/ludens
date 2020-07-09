import project from 'constants/project'

export const GET_CREDIT_INFO_LIST_REQUEST = 'GET_CREDIT_INFO_LIST_REQUEST'
export const GET_CREDIT_INFO_LIST_SUCCESS = 'GET_CREDIT_INFO_LIST_SUCCESS'
export const GET_CREDIT_INFO_LIST_FAILURE = 'GET_CREDIT_INFO_LIST_FAILURE'
export const GET_CREDIT_INFO_LIST_CANCEL = 'GET_CREDIT_INFO_LIST_CANCEL'

export const initialState: ReducerState<ICredit[]> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}

export const endpoint = {
  getCreditInfo: `${project.environment[project.environmentName].api}/credit/me`,
}