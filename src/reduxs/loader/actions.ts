import { createAction } from 'typesafe-actions'
import {
  LOADING_REQUSET,
  LOADING_SHOW,
  LOADING_HIDE,
} from './constants'

const loadingAction = createAction(
  LOADING_REQUSET,
  action => (data: boolean) => action(data))

const loadingShow = createAction(LOADING_SHOW)

const loadingHide = createAction(LOADING_HIDE)

export default {
  loadingAction,
  loadingShow,
  loadingHide,
}