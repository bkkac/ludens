import listActions from './list/actions'
import yeegeActions from './yeege/actions'
import betActions from './bet/actions'
import meActions from './me/actions'

export default {
  ...listActions,
  ...yeegeActions,
  ...betActions,
  ...meActions,
}