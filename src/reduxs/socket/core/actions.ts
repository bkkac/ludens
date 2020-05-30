import { createAction } from 'typesafe-actions'
import {
  CONNECT_SOCKET,
  CONNECTED_SOCKET,
  CONNECT_SOCKET_ERROR,
  DISCONNECT_SOCKET,
  DISCONNECTED_SOCKET,
} from './constants'

const connectSocketAction = createAction(CONNECT_SOCKET)

const connectedSocketAction = createAction(CONNECTED_SOCKET)

const connectSocketErrorAction = createAction(
  CONNECT_SOCKET_ERROR,
  resolve => (error: any) => resolve(error))

const disconnectSocketAction = createAction(DISCONNECT_SOCKET)

const disconnectedSocketAction = createAction(DISCONNECTED_SOCKET)


export default {
  connectSocketAction,
  connectedSocketAction,
  connectSocketErrorAction,
  disconnectSocketAction,
  disconnectedSocketAction,
}