import io from 'socket.io-client'
import { MiddlewareAPI, Dispatch } from 'redux'
import socketAction from 'reduxs/socket/actions'
import userAction from 'reduxs/user/actions'
import lottoAction from 'reduxs/lotto/actions'
import { getType } from 'typesafe-actions'
import { RootAction } from 'typings/reduxs/Actions'
import project from 'constants/project'
import { transformer } from 'utils'

const onConnect = (handleStore: MiddlewareAPI<Dispatch, RootReducers>) => (event: any) => {
  handleStore.dispatch(socketAction.connectedSocketAction())
}

const onDisconnect = (handleStore: MiddlewareAPI<Dispatch, RootReducers>) => () => {
  handleStore.dispatch(socketAction.disconnectedSocketAction())
}

const onError = (handlerStore: MiddlewareAPI<Dispatch, RootReducers>) => (error: any) => {
  handlerStore.dispatch(socketAction.connectSocketErrorAction(error))
}

const onUpdateWallet = (handlerStore: MiddlewareAPI<Dispatch, RootReducers>) =>
  (response: any) => {
    const responseWallet: APISuccessResponse<IWallet> = (typeof response === 'string')
      ? JSON.parse(response) : response
    const transformed = transformer.camelcaseTransform(responseWallet) as APISuccessResponse<IWallet>
    handlerStore.dispatch(userAction.walletUpdateRequestSocketAction(transformed.data))
  }

const onUpdateYeegeGame = (handlerStore: MiddlewareAPI<Dispatch, RootReducers>) =>
  (response: any) => {
    const responseYeegeGameList: APISuccessResponse<IYeegeGame[]> = (typeof response === 'string')
      ? JSON.parse(response) : response
    const transformed = transformer.camelcaseTransform(responseYeegeGameList) as APISuccessResponse<IYeegeGame[]>
    handlerStore.dispatch(lottoAction.updateYeegeGameListAction(transformed.data))
  }

const onUpdateYeegeSum = (handlerStore: MiddlewareAPI<Dispatch, RootReducers>) =>
  (response: any) => {
    const responseYeegeSum: APISuccessResponse<string> = (typeof response === 'string')
      ? JSON.parse(response) : response
    const transformed = transformer.camelcaseTransform(responseYeegeSum) as APISuccessResponse<string>
    handlerStore.dispatch(lottoAction.updateYeegeSumAction(transformed.data))
  }

const onOffYeegeSum = (handlerStore: MiddlewareAPI<Dispatch, RootReducers>) =>
  () => {
    handlerStore.dispatch(lottoAction.clearYeegeSum())
  }

const onUpdatePlayedYeegeList = (handlerStore: MiddlewareAPI<Dispatch, RootReducers>) =>
  (response: any) => {
    const responsePlayedYeegeList: APISuccessResponse<IYeegePlay[]> = (typeof response === 'string')
      ? JSON.parse(response) : response
    const transformed = transformer.camelcaseTransform(responsePlayedYeegeList) as APISuccessResponse<IYeegePlay[]>
    handlerStore.dispatch(lottoAction.updatePlayedYeegeListAction(transformed.data))
  }

const onOffPlayedYeegeList = (handlerStore: MiddlewareAPI<Dispatch, RootReducers>) =>
  () => {
    handlerStore.dispatch(lottoAction.clearPlayedYeegeList())
  }


let socket: SocketIOClient.Socket | null = null

const socketMiddleware = (store: MiddlewareAPI<Dispatch, RootReducers>) => (next: Dispatch) => (action: RootAction) => {

  if (store.getState().ludens.user.token.accessToken) {
    switch (action.type) {
      case getType(socketAction.connectSocketAction):
        socket = io(project.environment[project.environmentName].socket, {
          query: { token: store.getState().ludens.user.token.accessToken },
        })

        if (socket.connected) {
          socket.disconnect()
        }

        socket.connect()
        socket.on('connect', onConnect(store))
        socket.on('disconnect', onDisconnect(store))
        socket.on('error', onError(store))
        socket.on(`wallet_${store.getState().ludens.user.me.data?.id}`, onUpdateWallet(store))
        socket.on('yegee_game', onUpdateYeegeGame(store))
        break;
      case getType(socketAction.disconnectSocketAction):
        if (socket) {
          if (socket.connected) {
            socket.disconnect()
          }
        }
        break;
      case getType(lottoAction.listenYeegeSumSocket):
        socket?.on(`yegee_play_sum_${action.payload.date}${action.payload.round}`, onUpdateYeegeSum(store))
        break;
      case getType(lottoAction.unlistenYeegeSumSocket):
        socket?.off(`yegee_play_sum_${action.payload.date}${action.payload.round}`, onOffYeegeSum(store))
        break;
      case getType(lottoAction.listenPlayedYeegeListSocket):
        socket?.on(`yegee_play_list_${action.payload.date}${action.payload.round}`, onUpdatePlayedYeegeList(store))
        break;
      case getType(lottoAction.unlistenPlayedYeegeListSocket):
        socket?.off(`yegee_play_list_${action.payload.date}${action.payload.round}`, onOffPlayedYeegeList(store))
        break;
      default:
        return next(action);
    }
  }

  return next(action)

}


export default socketMiddleware