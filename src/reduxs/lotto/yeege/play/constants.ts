import project from 'constants/project'

export const PLAY_YEEGE_GAME_REQUEST = 'PLAY_YEEGE_GAME_REQUEST'
export const PLAY_YEEGE_GAME_SUCCESS = 'PLAY_YEEGE_GAME_SUCCESS'
export const PLAY_YEEGE_GAME_FAILURE = 'PLAY_YEEGE_GAME_FAILURE'
export const PLAY_YEEGE_GAME_CANCEL = 'PLAY_YEEGE_GAME_CANCEL'

export const initialState: ReducerState<IYeegePlay> = {
  isFetching: false,
  code: 0,
  data: {},
  error: '',
}

export const endpoint = {
  playYeege: `${project.environment[project.environmentName].api}/lotter/yegee/play`,
}