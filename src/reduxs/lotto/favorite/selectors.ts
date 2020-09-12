import { get } from 'lodash'
import prject from 'constants/project'
import { initialState as initialStateGet } from './get/constants'
import { initialState as initialStateAdd } from './add/constants'
import { initialState as initialStateEdit } from './edit/constants'
import { initialState as initialStateRemove } from './remove/constants'

const getFavoriteNumber = (state: RootReducers): ReducerState<IFavoriteSet> =>
    get(state, `${prject.name}.lotto.favorite.get`, initialStateGet)

const favoriteAddNumber = (state: RootReducers): ReducerState<IFavoriteSet> =>
    get(state, `${prject.name}.lotto.favorite.add.number`, initialStateAdd)
const favoriteAddSet = (state: RootReducers): ReducerState<IFavoriteSet> =>
    get(state, `${prject.name}.lotto.favorite.add.set`, initialStateAdd)

const favoriteEditNumber = (state: RootReducers): ReducerState<IFavoriteSet> =>
    get(state, `${prject.name}.lotto.favorite.edit.number`, initialStateEdit)
const favoriteEditSet = (state: RootReducers): ReducerState<IFavoriteSet> =>
    get(state, `${prject.name}.lotto.favorite.edit.set`, initialStateEdit)

const favoriteRemoveNumber = (state: RootReducers): ReducerState<IFavoriteSet> =>
    get(state, `${prject.name}.lotto.favorite.remove.number`, initialStateRemove)
const favoriteRemoveSet = (state: RootReducers): ReducerState<IFavoriteSet> =>
    get(state, `${prject.name}.lotto.favorite.remove.set`, initialStateRemove)

export default {
    getFavoriteNumber,
    favoriteAddNumber,
    favoriteAddSet,
    favoriteEditNumber,
    favoriteEditSet,
    favoriteRemoveNumber,
    favoriteRemoveSet,
}