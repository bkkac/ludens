import deposit from './deposit/epics'
import withdraw from './withdraw/epics'

export default [
  ...deposit,
  ...withdraw,
]
