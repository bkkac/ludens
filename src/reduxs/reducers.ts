import { combineReducers } from 'redux'
import project from 'constants/project'
import lotto from './lotto/reducers'
import otp from './otp/reducers'
import register from './register/reducers'
import loader from './loader/reducers'
import auth from './auth/reducers'
import finance from './finance/reducers'
import user from './user/reducers'
import bank from './bank/reducers'
import socket from './socket/reducers'
import credit from './credit/reducers'
import affilate from './affilate/reducers'
import config from './config/reducers'
import newsroom from './newsroom/reducers'
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
  finance,
  bank,
  socket,
  credit,
  affilate,
  config,
  newsroom,
}

export default persistReducer(
  persistConfig,
  combineReducers({ [project.name]: combineReducers(rootReducers) })
)