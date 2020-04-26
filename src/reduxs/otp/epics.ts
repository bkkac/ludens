import request from './request/epics'
import validate from './validate/epics'

export default [
  ...request,
  ...validate,
]
