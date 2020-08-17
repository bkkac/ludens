import sum from './sum/epics'
import play from './play/epics'
import game from './game/epics'
import gameList from './gameList/epics'
import playedList from './playedList/epics'

export default [
  ...sum,
  ...play,
  ...game,
  ...gameList,
  ...playedList,
]
