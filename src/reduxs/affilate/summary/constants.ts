import project from 'constants/project'

export const AFFILATE_SUMMARY_REQUEST = 'AFFILATE_SUMMARY_REQUEST'
export const AFFILATE_SUMMARY_SUCCESS = 'AFFILATE_SUMMARY_SUCCESS'
export const AFFILATE_SUMMARY_FAILURE = 'AFFILATE_SUMMARY_FAILURE'
export const AFFILATE_SUMMARY_CANCEL = 'AFFILATE_SUMMARY_CANCEL'

export const initialState: ReducerState<IAffilateSummary> = {
  isFetching: false,
  code: 0,
  data: {},
  error: '',
}

export const endpoint = {
  affilateSummary: `${project.environment[project.environmentName].api}/affilate/summary`,
}