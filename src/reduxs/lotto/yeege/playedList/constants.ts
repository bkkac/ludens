import project from 'constants/project'

export const GET_PLAYED_YEEGE_LIST_REQUEST = 'GET_PLAYED_YEEGE_LIST_REQUEST'
export const GET_PLAYED_YEEGE_LIST_SUCCESS = 'GET_PLAYED_YEEGE_LIST_SUCCESS'
export const GET_PLAYED_YEEGE_LIST_FAILURE = 'GET_PLAYED_YEEGE_LIST_FAILURE'
export const GET_PLAYED_YEEGE_LIST_CANCEL = 'GET_PLAYED_YEEGE_LIST_CANCEL'

export const LISTEN_PLAYED_YEEGE_LIST_SOCKET = 'LISTEN_PLAYED_YEEGE_LIST_SOCKET'
export const UNLISTEN_PLAYED_YEEGE_LIST_SOCKET = 'UNLISTEN_PLAYED_YEEGE_LIST_SOCKET'

export const UPDATE_PLAYED_YEEGE_LIST_REQUEST = 'UPDATE_PLAYED_YEEGE_LIST_REQUEST'
export const UPDATE_PLAYED_YEEGE_LIST_SUCCESS = 'UPDATE_PLAYED_YEEGE_LIST_SUCCESS'
export const CLEAR_PLAYED_YEEGE_LIST = 'CLEAR_PLAYED_YEEGE_LIST'

export const initialState: ReducerState<IYeegePlay[]> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}

export const endpoint = {
  getPlayedYeegeList: (query: IGetYeegeSum) => `${project.environment[project.environmentName].api}/lotter/yegee/play/all?date=${query.date}&round=${query.round}`,
}