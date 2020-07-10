import makeActions from './make/actions'
import resultActions from './result/actions'
import rateActions from './rate/actions'


export default {
  ...rateActions,
  ...makeActions,
  ...resultActions,
}