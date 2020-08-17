import emiter from 'configs/emiter'
import AlertNotificationComponent from './AlertNotification.component'

const show = (componentProps: IAlertNotificationProps) => {
  return emiter.emit<IAlertNotificationProps>('ALERT_NOTIFICATION_SHOW', componentProps)
}

const hide = () => emiter.emit('ALERT_NOTIFICATION_HIDE', null)

export default {
  Core: AlertNotificationComponent,
  show,
  hide,
}