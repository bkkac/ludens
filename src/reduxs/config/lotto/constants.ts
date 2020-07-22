import project from 'constants/project'

export const GET_LOTTO_SCHEDULE_REQUEST = 'GET_LOTTO_SCHEDULE_REQUEST'
export const GET_LOTTO_SCHEDULE_SUCCESS = 'GET_LOTTO_SCHEDULE_SUCCESS'
export const GET_LOTTO_SCHEDULE_FAILURE = 'GET_LOTTO_SCHEDULE_FAILURE'
export const GET_LOTTO_SCHEDULE_CANCEL = 'GET_LOTTO_SCHEDULE_CANCEL'

export const initialState: ReducerState<ILottoSchedule[]> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}

export const endpoint = {
  getLottoSchedule: `${project.environment[project.environmentName].api}/config/web/lottery`,
}