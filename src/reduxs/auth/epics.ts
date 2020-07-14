import login from './login/epics'
import logout from './logout/epics'

export default [
  ...login,
  ...logout,
]
