import project from 'constants/project'

export const CONNECT_SOCKET = 'CONNECT_SOCKET'
export const CONNECTED_SOCKET = 'CONNECTED_SOCKET'
export const CONNECT_SOCKET_ERROR = 'CONNECT_SOCKET_ERROR'
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET'
export const DISCONNECTED_SOCKET = 'DISCONNECTED_SOCKET'

export const initialState: ICoreSocketState = {
  connected: false,
}

export const endpoint = {
  connectSocket: `${project.environment[project.environmentName].socket}`,
}