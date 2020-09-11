import project from 'constants/project'

export const ADD_FAVORITE_LOTTO_REQUEST = 'ADD_FAVORITE_LOTTO_REQUEST'
export const ADD_FAVORITE_LOTTO_SUCCESS = 'ADD_FAVORITE_LOTTO_SUCCESS'
export const ADD_FAVORITE_LOTTO_FAILURE = 'ADD_FAVORITE_LOTTO_FAILURE'
export const ADD_FAVORITE_LOTTO_CANCEL = 'ADD_FAVORITE_LOTTO_CANCEL'

export const ADD_FAVORITE_LOTTO_NUMBER_REQUEST = 'ADD_FAVORITE_LOTTO_NUMBER_REQUEST'
export const ADD_FAVORITE_LOTTO_NUMBER_SUCCESS = 'ADD_FAVORITE_LOTTO_NUMBER_SUCCESS'
export const ADD_FAVORITE_LOTTO_NUMBER_FAILURE = 'ADD_FAVORITE_LOTTO_NUMBER_FAILURE'
export const ADD_FAVORITE_LOTTO_NUMBER_CANCEL = 'ADD_FAVORITE_LOTTO_NUMBER_CANCEL'

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
  addLottoFavorite: `${project.environment[project.environmentName].api}/number-sets`,
  addLottoFavoriteNumber: `${project.environment[project.environmentName].api}/number-sets/number`,
}