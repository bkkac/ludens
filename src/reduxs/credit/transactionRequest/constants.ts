import project from 'constants/project'

export const GET_TRANSACTION_REQUEST = 'GET_TRANSACTION_REQUEST'
export const GET_TRANSACTION_REQUEST_SUCCESS = 'GET_TRANSACTION_REQUEST_SUCCESS'
export const GET_TRANSACTION_REQUEST_FAILURE = 'GET_TRANSACTION_REQUEST_FAILURE'
export const GET_TRANSACTION_REQUEST_CANCEL = 'GET_TRANSACTION_REQUEST_CANCEL'

export const SIGN_TRANSACTION_REQUEST = 'SIGN_TRANSACTION_REQUEST'
export const SIGN_TRANSACTION_REQUEST_SUCCESS = 'SIGN_TRANSACTION_REQUEST_SUCCESS'
export const SIGN_TRANSACTION_REQUEST_FAILURE = 'SIGN_TRANSACTION_REQUEST_FAILURE'
export const SIGN_TRANSACTION_REQUEST_CANCEL = 'SIGN_TRANSACTION_REQUEST_CANCEL'

export const initialState: ReducerState<ITransactionRequest> = {
  isFetching: false,
  code: 0,
  data: {},
  error: '',
}

export const endpoint = {
  transactionRequest: `${project.environment[project.environmentName].api}/finance/pre_wallet_transaction`,
}