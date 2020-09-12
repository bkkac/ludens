import project from 'constants/project'

export const GET_FAVORITE_LOTTO_LIST_REQUEST = 'GET_FAVORITE_LOTTO_LIST_REQUEST'
export const GET_FAVORITE_LOTTO_LIST_SUCCESS = 'GET_FAVORITE_LOTTO_LIST_SUCCESS'
export const GET_FAVORITE_LOTTO_LIST_FAILURE = 'GET_FAVORITE_LOTTO_LIST_FAILURE'
export const GET_FAVORITE_LOTTO_LIST_CANCEL = 'GET_FAVORITE_LOTTO_LIST_CANCEL'
export const CLEAR_FAVORITE_LOTTO_LIST = 'CLEAR_FAVORITE_LOTTO_LIST'

export const initialState: ReducerState<ReadonlyArray<IFavoriteSet>> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}


export const endpoint = {
  getLottoFavoriteList: `${project.environment[project.environmentName].api}/number-sets/all`,
}