import project from 'constants/project'

export const GET_LOTTO_REQUEST = 'GET_LOTTO_REQUEST'
export const GET_LOTTO_SUCCESS = 'GET_LOTTO_SUCCESS'
export const GET_LOTTO_FAILURE = 'GET_LOTTO_FAILURE'
export const GET_LOTTO_CANCEL = 'GET_LOTTO_CANCEL'

export const initialState: ReducerState<ILottoGame> = {
  isFetching: false,
  code: 0,
  data: {
    id: 0,
    round: '',
    status: 'UNKNOWN',
    createdAt: '',
    endTime: '',
    startTime: '',
  },
  error: '',
}

export const endpoint = {
  getLottoGame: (lottoSlug: TLottoSlug) => `${project.environment[project.environmentName].api}/web/lottery?type=${lottoSlug}`,
}