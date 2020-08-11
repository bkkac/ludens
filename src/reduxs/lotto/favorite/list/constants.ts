import project from 'constants/project'

export const GET_FAVORITE_LOTTO_REQUEST = 'GET_FAVORITE_LOTTO_REQUEST'
export const GET_FAVORITE_LOTTO_SUCCESS = 'GET_FAVORITE_LOTTO_SUCCESS'
export const GET_FAVORITE_LOTTO_FAILURE = 'GET_FAVORITE_LOTTO_FAILURE'
export const GET_FAVORITE_LOTTO_CANCEL = 'GET_FAVORITE_LOTTO_CANCEL'
export const CLEAR_FAVORITE_LOTTO = 'CLEAR_FAVORITE_LOTTO'

export const initialState: ReducerState<ReadonlyArray<IFavoriteSet>> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}


export const endpoint = {
  getLottoFavoriteList: `${project.environment[project.environmentName].api}/number-sets/all`,
}