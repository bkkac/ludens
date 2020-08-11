import project from 'constants/project'

export const GET_NEWSROOM_REQUEST = 'GET_NEWSROOM_REQUEST'
export const GET_NEWSROOM_SUCCESS = 'GET_NEWSROOM_SUCCESS'
export const GET_NEWSROOM_FAILURE = 'GET_NEWSROOM_FAILURE'
export const GET_NEWSROOM_CANCEL = 'GET_NEWSROOM_CANCEL'

export const initialState: ReducerState<ReadonlyArray<INews>> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}

export const endpoint = {
  getNewsroom: `${project.environment[project.environmentName].api}/news/all`,
}