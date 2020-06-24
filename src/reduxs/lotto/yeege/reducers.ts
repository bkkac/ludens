import { combineReducers } from 'redux'
import game from './game/reducers'
import sum from './sum/reducers'
import play from './play/reducers'
import playedList from './playedList/reducers'

export default combineReducers({
  game,
  sum,
  play,
  playedList,
})