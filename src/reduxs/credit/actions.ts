import depositActions from './deposit/actions'
import withdrawActions from './withdraw/actions'
import transactionActions from './transaction/actions'
import transactionRequestActions from './transactionRequest/actions'

export default {
  ...depositActions,
  ...withdrawActions,
  ...transactionActions,
  ...transactionRequestActions,
}