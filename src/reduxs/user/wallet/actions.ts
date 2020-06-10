import { createAction } from 'typesafe-actions'
import {
  WALLET_UPDATE_REQUEST,
  WALLET_UPDATE_SUCCESS,
  WALLET_UPDATE_FAILURE,
} from './constants'

const walletUpdateRequestSocketAction = createAction(
  WALLET_UPDATE_REQUEST,
  resolve => (data: IWallet) => resolve(data))

const walletUpdateSuccessSocketAction = createAction(
  WALLET_UPDATE_SUCCESS,
  resolve => (data: IWallet) => resolve(data))

const walletUpdateFailureSocketAction = createAction(
  WALLET_UPDATE_FAILURE,
  resolve => (data: any) => resolve(data))


export default {
  walletUpdateRequestSocketAction,
  walletUpdateSuccessSocketAction,
  walletUpdateFailureSocketAction,
}