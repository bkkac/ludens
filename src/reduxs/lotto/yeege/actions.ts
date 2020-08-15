import sumActions from './sum/actions'
import playActions from './play/actions'
import gameActions from './game/actions'
import gameListActions from './gameList/actions'
import playedListActions from './playedList/actions'


export default {
  ...sumActions,
  ...playActions,
  ...gameActions,
  ...gameListActions,
  ...playedListActions,
}