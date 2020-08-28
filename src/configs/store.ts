import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import { persistStore } from 'redux-persist'
import epics from 'reduxs/epics'
import rootReducer from 'reduxs/reducers'
import axiosMiddleware from 'middleware/axios'
import socketMiddleware from 'middleware/socket'
import project from 'constants/project'
import loaderAction from 'reduxs/loader/actions'
import { RootAction } from 'typings/reduxs/Actions'

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootReducers
>();

const enhancer = [axiosMiddleware, socketMiddleware, epicMiddleware]

const composedEnhancer = process.env.REACT_APP_LUDENS_ENV === project.environment.prod.name
  ? applyMiddleware(...enhancer)
  : composeWithDevTools(applyMiddleware(...enhancer))

export default function configureStore(initialState?: RootReducers) {
  const store: Store = createStore(
    rootReducer,
    {},
    composedEnhancer
  )
  epicMiddleware.run(epics)
  const persistor = persistStore(store)

  // Force hide loader
  store.dispatch(loaderAction.loadingAction(false))

  return { store, persistor }
}