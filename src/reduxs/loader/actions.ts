import { createAction } from 'typesafe-actions'
import { LOADING } from './constants'

const loadingAction = createAction(
  LOADING,
  action => (data: boolean) => action(data))

export default { loadingAction }