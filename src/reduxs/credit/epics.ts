import deposit from './deposit/epics'
import withdraw from './withdraw/epics'
import transaction from './transaction/epics'
import transactionRequest from './transactionRequest/epics'

export default [
  ...deposit,
  ...withdraw,
  ...transaction,
  ...transactionRequest,
]
