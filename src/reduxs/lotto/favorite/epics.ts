import list from './list/epics'
import add from './add/epics'
import edit from './edit/epics'
import remove from './remove/epics'
import get from './get/epics'

export default [
  ...list,
  ...add,
  ...edit,
  ...remove,
  ...get,
]
