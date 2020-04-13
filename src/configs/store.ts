import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import epics from 'reduxs/epics'
import rootReducer from 'reduxs/reducers'
import axiosMiddleware from 'middleware/axios'
import project from 'constants/project'
import { RootAction } from 'typings/reduxs/Actions'

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootReducers
>();

const enhancer = [axiosMiddleware, epicMiddleware]

const composedEnhancer = process.env.REACT_APP_LUDENS_STATE === project.environment.prod.name
  ? applyMiddleware(...enhancer)
  : composeWithDevTools(applyMiddleware(...enhancer))

export default function configureStore(initialState?: RootReducers) {
  const store = createStore(
    rootReducer,
    {},
    composedEnhancer
  )
  epicMiddleware.run(epics)
  return store
}