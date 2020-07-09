import project from 'constants/project'

export const GET_BET_RATE_REQUEST = 'GET_BET_RATE_REQUEST'
export const GET_BET_RATE_SUCCESS = 'GET_BET_RATE_SUCCESS'
export const GET_BET_RATE_FAILURE = 'GET_BET_RATE_FAILURE'
export const GET_BET_RATE_CANCEL = 'GET_BET_RATE_CANCEL'
export const CLEAR_BET_RATE = 'CLEAR_BET_RATE'

export const initialState: ReducerState<IBetRate[]> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}


export const endpoint = {
  getBetRate: `${project.environment[project.environmentName].api}/lotter/bet/rate`,
}