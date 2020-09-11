import project from 'constants/project'

export const EDIT_FAVORITE_LOTTO_REQUEST = 'EDIT_FAVORITE_LOTTO_REQUEST'
export const EDIT_FAVORITE_LOTTO_SUCCESS = 'EDIT_FAVORITE_LOTTO_SUCCESS'
export const EDIT_FAVORITE_LOTTO_FAILURE = 'EDIT_FAVORITE_LOTTO_FAILURE'
export const EDIT_FAVORITE_LOTTO_CANCEL = 'EDIT_FAVORITE_LOTTO_CANCEL'

export const EDIT_FAVORITE_LOTTO_NUMBER_REQUEST = 'EDIT_FAVORITE_LOTTO_NUMBER_REQUEST'
export const EDIT_FAVORITE_LOTTO_NUMBER_SUCCESS = 'EDIT_FAVORITE_LOTTO_NUMBER_SUCCESS'
export const EDIT_FAVORITE_LOTTO_NUMBER_FAILURE = 'EDIT_FAVORITE_LOTTO_NUMBER_FAILURE'
export const EDIT_FAVORITE_LOTTO_NUMBER_CANCEL = 'EDIT_FAVORITE_LOTTO_NUMBER_CANCEL'

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
  editLottoFavorite: `${project.environment[project.environmentName].api}/number-sets`,
  editLottoFavoriteNumber: `${project.environment[project.environmentName].api}/number-sets/number`,
}