import project from 'constants/project'

export const MAKING_BET_LOTTO_REQUEST = 'MAKING_BET_LOTTO_REQUEST'
export const MAKING_BET_LOTTO_SUCCESS = 'MAKING_BET_LOTTO_SUCCESS'
export const MAKING_BET_LOTTO_FAILURE = 'MAKING_BET_LOTTO_FAILURE'
export const MAKING_BET_LOTTO_CANCEL = 'MAKING_BET_LOTTO_CANCEL'

export const initialState: ReducerState<IBet[]> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}


export const endpoint = {
  makingBetLotto: `${project.environment[project.environmentName].api}/lotter/bet`,
}