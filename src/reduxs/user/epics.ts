import walletEpic from './wallet/epics'
import tokenEpic from './token/epics'
import meEpic from './me/epics'

export default [
  ...walletEpic,
  ...tokenEpic,
  ...meEpic,
]
