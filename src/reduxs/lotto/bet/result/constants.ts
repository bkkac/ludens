import project from 'constants/project'

export const GET_BET_RESULT_REQUEST = 'GET_BET_RESULT_REQUEST'
export const GET_BET_RESULT_SUCCESS = 'GET_BET_RESULT_SUCCESS'
export const GET_BET_RESULT_FAILURE = 'GET_BET_RESULT_FAILURE'
export const GET_BET_RESULT_CANCEL = 'GET_BET_RESULT_CANCEL'
export const CLEAR_BET_RESULT = 'CLEAR_BET_RESULT'

export const initialState: ReducerState<IBetResult[]> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}


export const endpoint = {
  getBetResult: (query: IBetResultRequest) =>
    `${project.environment[project.environmentName].api}/lotter/bet/result?date=${query.date}&type=${query.type}&round=${query.round}`,
}