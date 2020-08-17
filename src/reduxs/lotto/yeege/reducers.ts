import { combineReducers } from 'redux'
import sum from './sum/reducers'
import play from './play/reducers'
import game from './game/reducers'
import gameList from './gameList/reducers'
import playedList from './playedList/reducers'

export default combineReducers({
  sum,
  play,
  game,
  gameList,
  playedList,
})