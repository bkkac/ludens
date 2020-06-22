import game from './game/epics'
import sum from './sum/epics'
import play from './play/epics'
import playedList from './playedList/epics'

export default [
  ...game,
  ...sum,
  ...play,
  ...playedList,
]
