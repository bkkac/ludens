import project from 'constants/project'

export const GET_YEEGE_SUM_REQUEST = 'GET_YEEGE_SUM_REQUEST'
export const GET_YEEGE_SUM_SUCCESS = 'GET_YEEGE_SUM_SUCCESS'
export const GET_YEEGE_SUM_FAILURE = 'GET_YEEGE_SUM_FAILURE'
export const GET_YEEGE_SUM_CANCEL = 'GET_YEEGE_SUM_CANCEL'

export const UPDATE_YEEGE_SUM_REQUEST = 'UPDATE_YEEGE_SUM_REQUEST'
export const UPDATE_YEEGE_SUM_SUCCESS = 'UPDATE_YEEGE_SUM_SUCCESS'
export const UPDATE_YEEGE_SUM_FAILURE = 'UPDATE_YEEGE_SUM_FAILURE'

export const CLEAR_YEEGE_SUM = 'CLEAR_YEEGE_SUM'

export const initialState: ReducerState<string> = {
  isFetching: false,
  code: 0,
  data: '0',
  error: '',
}

export const endpoint = {
  getAllYeegeGame: (query: IGetYeegeSum) => `${project.environment[project.environmentName].api}/lotter/yegee/play/sum?date=${query.date}&round=${query.round}`,
}