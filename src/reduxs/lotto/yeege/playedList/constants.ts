import project from 'constants/project'

export const GET_PLAYED_YEEGE_LIST_REQUEST = 'GET_PLAYED_YEEGE_LIST_REQUEST'
export const GET_PLAYED_YEEGE_LIST_SUCCESS = 'GET_PLAYED_YEEGE_LIST_SUCCESS'
export const GET_PLAYED_YEEGE_LIST_FAILURE = 'GET_PLAYED_YEEGE_LIST_FAILURE'
export const GET_PLAYED_YEEGE_LIST_CANCEL = 'GET_PLAYED_YEEGE_LIST_CANCEL'

export const initialState: ReducerState<IYeegePlay[]> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}

export const endpoint = {
  getPlayedYeegeList: (query: IGetYeegeSum) => `${project.environment[project.environmentName].api}/lotter/yegee/play?date=${query.date}&round=${query.round}`,
}