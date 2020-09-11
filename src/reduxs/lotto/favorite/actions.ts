import listActions from './list/actions'
import addActions from './add/actions'
import editActions from './edit/actions'
import removeActions from './remove/actions'


export default {
  ...listActions,
  ...addActions,
  ...editActions,
  ...removeActions,
}