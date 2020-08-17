import React, { Component } from 'react'
import Emitter from 'configs/emiter'
import colors from 'constants/colors'
import './alertNotification.style.scss'

const initialState: IAlertNotificationComponentState = {
  color: colors.PRIMARY_GREEN,
  countdown: false,
  text: '',
  isOpened: false,
}

class AlertNotificationComponent extends Component<any, IAlertNotificationComponentState> {

  state: IAlertNotificationComponentState = {
    color: colors.PRIMARY_GREEN,
    countdown: false,
    text: '',
    isOpened: false,
  }

  componentDidMount() {
    Emitter.on('ALERT_NOTIFICATION_SHOW', this.onEventSubscribedShow)
    Emitter.on('ALERT_NOTIFICATION_HIDE', this.onEventSubscribedHide)
  }

  componentWillUnmount() {
    Emitter.off('ALERT_NOTIFICATION_SHOW')
    Emitter.off('ALERT_NOTIFICATION_HIDE')
  }

  onEventSubscribedShow = (componentProps: IAlertNotificationProps = initialState) => {
    if (this.state.isOpened) { return this.hideNotification(() => this.showNotification(componentProps)) }
    this.hideNotification(() => this.showNotification(componentProps))
  }

  onEventSubscribedHide = () => this.hideNotification()

  showNotification = (componentProps: IAlertNotificationProps = initialState) => {
    this.setState({
      color: componentProps.color || initialState.color,
      countdown: componentProps.countdown || initialState.countdown,
      text: componentProps.text || initialState.text,
    }, () => {
      this.setState({ isOpened: true })
      if (this.state.countdown) {
        setTimeout(() => {
          this.hideNotification()
        }, 2000)
      }
    })
  }

  hideNotification = (callback?: () => void) => {
    this.setState({ isOpened: false }, callback)
  }

  render() {
    const { isOpened, text, color } = this.state
    return (
      <div style={{ backgroundColor: color }} className={`alert-notification-container ${isOpened ? 'opened' : ''}`}>
        <div className="container flex m-auto text-right">
          <h5>{text}</h5>
        </div>
      </div>
    )
  }
}

export default AlertNotificationComponent