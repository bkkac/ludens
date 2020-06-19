import project from 'constants/project'

export const GET_BET_HISTORY_REQUEST = 'GET_BET_HISTORY_REQUEST'
export const GET_BET_HISTORY_SUCCESS = 'GET_BET_HISTORY_SUCCESS'
export const GET_BET_HISTORY_FAILURE = 'GET_BET_HISTORY_FAILURE'
export const GET_BET_HISTORY_CANCEL = 'GET_BET_HISTORY_CANCEL'

export const initialState: ReducerState<IBet[]> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}


export const endpoint = {
  getBetHistory: `${project.environment[project.environmentName].api}/lotter/bet/me`,
}