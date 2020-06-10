import { combineReducers } from 'redux'
import project from 'constants/project'
import lotto from './lotto/reducers'
import otp from './otp/reducers'
import register from './register/reducers'
import loader from './loader/reducers'
import auth from './auth/reducers'
import credit from './credit/reducers'
import user from './user/reducers'
import bank from './bank/reducers'
import socket from './socket/reducers'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
  key: project.name,
  storage,
  blacklist: ['user'],
}

const userPersistConfig = {
  key: 'user',
  storage,
}

const rootReducers = {
  user: persistReducer(userPersistConfig, user),
  lotto,
  otp,
  register,
  loader,
  auth,
  credit,
  bank,
  socket,
}

export default persistReducer(
  persistConfig,
  combineReducers({ [project.name]: combineReducers(rootReducers) })
)