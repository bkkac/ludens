import make from './make/epics'
import result from './result/epics'
import rate from './rate/epics'

export default [
  ...make,
  ...result,
  ...rate,
]
