import { combineEpics } from 'redux-observable'
import lotto from 'reduxs/lotto/epics'

export default combineEpics(
  ...lotto
)