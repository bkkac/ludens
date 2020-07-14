import project from 'constants/project'

export const GET_TRANSACTION_LIST_REQUEST = 'GET_TRANSACTION_LIST_REQUEST'
export const GET_TRANSACTION_LIST_SUCCESS = 'GET_TRANSACTION_LIST_SUCCESS'
export const GET_TRANSACTION_LIST_FAILURE = 'GET_TRANSACTION_LIST_FAILURE'
export const GET_TRANSACTION_LIST_CANCEL = 'GET_TRANSACTION_LIST_CANCEL'

export const initialState: ReducerState<ITransaction[]> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}

export const endpoint = {
  getTransactionList: `${project.environment[project.environmentName].api}/finance/me`,
}