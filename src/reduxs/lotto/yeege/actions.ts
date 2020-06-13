import gameActions from './game/actions'
import sumActions from './sum/actions'
import playActions from './play/actions'


export default {
  ...gameActions,
  ...sumActions,
  ...playActions,
}