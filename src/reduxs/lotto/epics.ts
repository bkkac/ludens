import list from './list/epics'
import yeege from './yeege/epics'
import bet from './bet/epics'
import me from './me/list/epics'
import favorite from './favorite/list/epics'
import game from './game/epics'

export default [
  ...game,
  ...list,
  ...yeege,
  ...bet,
  ...me,
  ...me,
  ...favorite,
]
