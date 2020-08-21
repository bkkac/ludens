declare interface IAlertNotificationProps {
  color?: string
  text: string
  countdown?: boolean
}

declare interface IAlertNotificationComponentState extends IAlertNotificationProps {
  isOpened: boolean
}