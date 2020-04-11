import { combineReducers } from 'redux'
import project from 'constants/project'
import { StateType } from 'typesafe-actions'

const reducerList = {
}

const rootReducer = combineReducers({ [project.name]: combineReducers(reducerList) })

export type IRootReducers = StateType<typeof rootReducer>;

export default rootReducer