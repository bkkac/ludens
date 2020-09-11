import project from 'constants/project'

export const REMOVE_FAVORITE_LOTTO_REQUEST = 'REMOVE_FAVORITE_LOTTO_REQUEST'
export const REMOVE_FAVORITE_LOTTO_SUCCESS = 'REMOVE_FAVORITE_LOTTO_SUCCESS'
export const REMOVE_FAVORITE_LOTTO_FAILURE = 'REMOVE_FAVORITE_LOTTO_FAILURE'
export const REMOVE_FAVORITE_LOTTO_CANCEL = 'REMOVE_FAVORITE_LOTTO_CANCEL'

export const REMOVE_FAVORITE_LOTTO_NUMBER_REQUEST = 'REMOVE_FAVORITE_LOTTO_NUMBER_REQUEST'
export const REMOVE_FAVORITE_LOTTO_NUMBER_SUCCESS = 'REMOVE_FAVORITE_LOTTO_NUMBER_SUCCESS'
export const REMOVE_FAVORITE_LOTTO_NUMBER_FAILURE = 'REMOVE_FAVORITE_LOTTO_NUMBER_FAILURE'
export const REMOVE_FAVORITE_LOTTO_NUMBER_CANCEL = 'REMOVE_FAVORITE_LOTTO_NUMBER_CANCEL'

export const initialState: ReducerState<IFavoriteSet> = {
  isFetching: false,
  code: 0,
  data: {
    id: 0,
    title: '',
    list: [],
    createdAt: '',
    updatedAt: '',
  },
  error: '',
}


export const endpoint = {
  removeLottoFavorite: `${project.environment[project.environmentName].api}/number-sets`,
  removeLottoFavoriteNumber: `${project.environment[project.environmentName].api}/number-sets/number`,
}