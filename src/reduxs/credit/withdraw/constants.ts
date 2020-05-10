import project from 'constants/project'

export const WITHDRAW_REQUEST = 'WITHDRAW_REQUEST'
export const WITHDRAW_SUCCESS = 'WITHDRAW_SUCCESS'
export const WITHDRAW_FAILURE = 'WITHDRAW_FAILURE'
export const WITHDRAW_CANCEL = 'WITHDRAW_CANCEL'

export const initialState: IWithdrawState = {
  isFetching: false,
  code: 0,
  data: {},
  error: '',
}

const develop = 'dev'

export const endpoint = {
  withdrawRequest: `${project.environment[develop].api}/credit/withdraw`,
}