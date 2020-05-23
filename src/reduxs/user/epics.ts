import tokenEpic from './token/epics'
import meEpic from './me/epics'

export default [
  ...tokenEpic,
  ...meEpic,
]
