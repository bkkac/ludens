import walletAction from './wallet/actions'
import tokenAction from './token/actions'
import meAction from './me/actions'

export default {
  ...walletAction,
  ...tokenAction,
  ...meAction,
}