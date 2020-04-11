import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import { createEpicMiddleware } from 'redux-observable'
import rootReducer from './reducers'
// import rootEpic from './epics'
import axiosMiddleware from 'middleware/axios'
import project from 'constants/project'

// const epicMiddleware = createEpicMiddleware(rootEpic)

const enhancer = [axiosMiddleware]

const composedEnhancer = process.env.REACT_APP_LUDENS_STATE === project.environment.prod.name
  ? applyMiddleware(...enhancer)
  : composeWithDevTools(applyMiddleware(...enhancer))

export default function configureStore() {
  return createStore(
    rootReducer,
    composedEnhancer
  )
}