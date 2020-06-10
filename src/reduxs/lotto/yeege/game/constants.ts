import project from 'constants/project'

export const GET_YEEGE_GAME_LIST_REQUEST = 'GET_YEEGE_GAME_LIST_REQUEST'
export const GET_YEEGE_GAME_LIST_SUCCESS = 'GET_YEEGE_GAME_LIST_SUCCESS'
export const GET_YEEGE_GAME_LIST_FAILURE = 'GET_YEEGE_GAME_LIST_FAILURE'
export const GET_YEEGE_GAME_LIST_CANCEL = 'GET_YEEGE_GAME_LIST_CANCEL'

export const UPDATE_YEEGE_GAME_LIST_REQUEST = 'UPDATE_YEEGE_GAME_LIST_REQUEST'
export const UPDATE_YEEGE_GAME_LIST_SUCCESS = 'UPDATE_YEEGE_GAME_LIST_SUCCESS'
export const UPDATE_YEEGE_GAME_LIST_FAILURE = 'UPDATE_YEEGE_GAME_LIST_FAILURE'

export const initialState: ReducerState<IYeegeGame[]> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}

const develop = 'dev'

export const endpoint = {
  getAllYeegeGame: `${project.environment[develop].api}/lotter/yegee/play/game`,
}