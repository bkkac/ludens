import project from 'constants/project'

export const AFFILATE_MEMBER_REQUEST = 'AFFILATE_MEMBER_REQUEST'
export const AFFILATE_MEMBER_SUCCESS = 'AFFILATE_MEMBER_SUCCESS'
export const AFFILATE_MEMBER_FAILURE = 'AFFILATE_MEMBER_FAILURE'
export const AFFILATE_MEMBER_CANCEL = 'AFFILATE_MEMBER_CANCEL'

export const initialState: ReducerState<IAffilateMember[]> = {
  isFetching: false,
  code: 0,
  data: [],
  error: '',
}

export const endpoint = {
  affilateMember: (date: string) => `${project.environment[project.environmentName].api}/affilate/member?date=${date}`,
}