import project from 'constants/project'

export const GET_LOTTO_GAME_REQUEST = 'GET_LOTTO_GAME_REQUEST'
export const GET_LOTTO_GAME_SUCCESS = 'GET_LOTTO_GAME_SUCCESS'
export const GET_LOTTO_GAME_FAILURE = 'GET_LOTTO_GAME_FAILURE'
export const GET_LOTTO_GAME_CANCEL = 'GET_LOTTO_GAME_CANCEL'

export const UPDATE_LOTTO_GAME_REQUEST = 'UPDATE_LOTTO_GAME_REQUEST'
export const UPDATE_LOTTO_GAME_SUCCESS = 'UPDATE_LOTTO_GAME_SUCCESS'
export const UPDATE_LOTTO_GAME_FAILURE = 'UPDATE_LOTTO_GAME_FAILURE'

export const initialState: ReducerState<ILottoGame> = {
  isFetching: false,
  code: 0,
  data: {
    id: 0,
    round: '',
    endTime: '',
    startTime: '',
    createdAt: '',
    status: 'UNKNOWN',
  },
  error: '',
}

export const endpoint = {
  getLottoGame: ({ date, round }: ILottoRoundQuery) => `${project.environment[project.environmentName].api}/lotter/yegee/play/game?round=${round}`,
}