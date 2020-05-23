import project from 'constants/project'

export const GET_BANK_LIST_REQUEST = 'GET_BANK_LIST_REQUEST'
export const GET_BANK_LIST_SUCCESS = 'GET_BANK_LIST_SUCCESS'
export const GET_BANK_LIST_FAILURE = 'GET_BANK_LIST_FAILURE'
export const GET_BANK_LIST_CANCEL = 'GET_BANK_LIST_CANCEL'

export const initialState: IBankListState = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}

const develop = 'dev'

export const endpoint = {
  getBankList: `${project.environment[develop].api}/webbank/all`,
}