import project from 'constants/project'

export const GET_FAVORITE_LOTTO_REQUEST = 'GET_FAVORITE_LOTTO_REQUEST'
export const GET_FAVORITE_LOTTO_SUCCESS = 'GET_FAVORITE_LOTTO_SUCCESS'
export const GET_FAVORITE_LOTTO_FAILURE = 'GET_FAVORITE_LOTTO_FAILURE'
export const GET_FAVORITE_LOTTO_CANCEL = 'GET_FAVORITE_LOTTO_CANCEL'

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
  getLottoFavorite: (id: number) => `${project.environment[project.environmentName].api}/number-sets?id=${id}`,
}