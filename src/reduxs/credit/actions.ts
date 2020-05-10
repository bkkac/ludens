import depositActions from './deposit/actions'
import withdrawActions from './withdraw/actions'


export default {
  ...depositActions,
  ...withdrawActions,
}