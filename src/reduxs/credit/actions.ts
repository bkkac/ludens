import depositActions from './deposit/actions'
import withdrawActions from './withdraw/actions'
import transactionActions from './transaction/actions'

export default {
  ...depositActions,
  ...withdrawActions,
  ...transactionActions,
}