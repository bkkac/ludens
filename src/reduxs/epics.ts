import { combineEpics } from 'redux-observable'
import lotto from './lotto/epics'

export default combineEpics(
  ...lotto,
)

