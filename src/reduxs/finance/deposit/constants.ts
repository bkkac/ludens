import project from 'constants/project'

export const DEPOSIT_REQUEST = 'DEPOSIT_REQUEST'
export const DEPOSIT_SUCCESS = 'DEPOSIT_SUCCESS'
export const DEPOSIT_FAILURE = 'DEPOSIT_FAILURE'
export const DEPOSIT_CANCEL = 'DEPOSIT_CANCEL'

export const initialState: IDepositState = {
  isFetching: false,
  code: 0,
  data: {},
  error: '',
}

export const endpoint = {
  depositRequest: `${project.environment[project.environmentName].api}/finance/deposit`,
}