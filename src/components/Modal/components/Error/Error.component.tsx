import React, { SFC } from 'react'
import { noop } from 'lodash'
import { ResponsiveIcon, Button } from 'components'
import ErrorIcon from 'assets/images/modal/error/error.png'
import ErrorIcon2x from 'assets/images/modal/error/error@2x.png'
import ErrorIcon3x from 'assets/images/modal/error/error@3x.png'
import './error.style.scss'

const constants = {
  title: 'เกิดข้อผิดพลาด',
  description: 'กรุณาลองใหม่อีกครั้ง',
  actionText: 'กลับสู่หน้าหลัก',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IErrorModal = {
  title: constants.title,
  description: constants.description,
  actionText: constants.actionText,
  action() { noop() },
}

const ErrorModal: SFC<IErrorModal & DefaultProps> = (props) => {

  return (
    <div className="col error-modal-container">
      <ResponsiveIcon
        alt="error-icon"
        className="error-checked-icon"
        icon={{ x1: ErrorIcon, x2: ErrorIcon2x, x3: ErrorIcon3x }}
      />
      <div className="title-error-modal">
        {props.title}
      </div>
      <div className="description-error-modal">
        {props.description}
      </div>
      <div className="footer-wrapper-error-modal">
        <Button id="error-ok-button" onClick={props.action} text={props.actionText!} />
      </div>
    </div>
  )
}

ErrorModal.defaultProps = defaultProps

export default ErrorModal