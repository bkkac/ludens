import { createAction } from 'typesafe-actions'
import {
  SET_USER,
  CLEAR_USER,
  PERSISTED_USER,
} from './constants'

const setUserAction = createAction(
  SET_USER,
  action => (data: ILoginResponse) => action(data))

const clearUserAction = createAction(
  CLEAR_USER,
  action => () => action({ token: '' }))

const persistedUserAction = createAction(
  PERSISTED_USER,
  resolve => (data: ILoginResponse) => resolve(data))

export default {
  setUserAction,
  clearUserAction,
  persistedUserAction,
}