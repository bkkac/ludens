import io from 'socket.io-client'
import { MiddlewareAPI, Dispatch } from 'redux'
import socketAction from 'reduxs/socket/actions'
import userAction from 'reduxs/user/actions'
import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import project from 'constants/project'

const onConnect = (handleStore: MiddlewareAPI<Dispatch, RootReducers>) => (event: any) => {
  handleStore.dispatch(socketAction.connectedSocketAction())
}

const onDisconnect = (handleStore: MiddlewareAPI<Dispatch, RootReducers>) => () => {
  handleStore.dispatch(socketAction.disconnectedSocketAction())
}

const onError = (handlerStore: MiddlewareAPI<Dispatch, RootReducers>) => (error: any) => {
  handlerStore.dispatch(socketAction.connectSocketErrorAction(error))
}

const onUpdateWallet = (handlerStore: MiddlewareAPI<Dispatch, RootReducers>) => (wallet: IWallet) => {
  handlerStore.dispatch(userAction.walletUpdateRequestSocketAction(wallet))
}

const socketMiddleware = (store: MiddlewareAPI<Dispatch, RootReducers>) => (next: Dispatch) => (action: RootAction) => {

  if (store.getState().ludens.user.token.accessToken) {

    const socket = io(project.environment[project.environmentName].socket, {
      query: { token: store.getState().ludens.user.token.accessToken },
    })

    switch (action.type) {
      case getType(socketAction.connectSocketAction):
        if (socket.connected) {
          socket.disconnect()
        }
        socket.connect()
        socket.on('connect', onConnect(store))
        socket.on('disconnect', onDisconnect(store))
        socket.on('error', onError(store))
        socket.on(`wallet_${store.getState().ludens.user.me.data?.id}`, onUpdateWallet(store))
        break;
      case getType(socketAction.disconnectSocketAction):
        if (socket.connected) {
          socket.disconnect()
        }
        break;
      default:
        return next(action);
    }
  }

  return next(action)

}


export default socketMiddleware