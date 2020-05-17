import deposit from './deposit/epics'
import withdraw from './withdraw/epics'
import transaction from './transaction/epics'

export default [
  ...deposit,
  ...withdraw,
  ...transaction,
]
