import project from 'constants/project'

export const GET_LOTTO_LIST_REQUEST = 'GET_LOTTO_LIST_REQUEST'
export const GET_LOTTO_LIST_SUCCESS = 'GET_LOTTO_LIST_SUCCESS'
export const GET_LOTTO_LIST_FAILURE = 'GET_LOTTO_LIST_FAILURE'
export const GET_LOTTO_LIST_CANCEL = 'GET_LOTTO_LIST_CANCEL'

export const initialState: ReducerState<ILotto[]> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}

export const endpoint = {
  getAllLotter: `${project.environment[project.environmentName].api}/lotter/all`,
}