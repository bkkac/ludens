import React, { SFC } from 'react'
import { noop } from 'lodash'
import { ResponsiveIcon, Button } from 'components'
import CheckIcon from 'assets/images/successModal/check/check.png'
import CheckIcon2x from 'assets/images/successModal/check/check@2x.png'
import CheckIcon3x from 'assets/images/successModal/check/check@3x.png'
import './success.style.scss'

const constants = {
  title: 'เรียบร้อย',
  description: 'กรุณารอการตรวจสอบสักครู่',
  actionText: 'กลับสู่หน้าหลัก',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ISuccessModal = {
  title: constants.title,
  description: constants.description,
  actionText: constants.actionText,
  action() { noop() },
}

const SuccessModal: SFC<ISuccessModal & DefaultProps> = (props) => {

  return (
    <div className="col success-modal-container">
      <ResponsiveIcon
        alt="success-icon"
        className="success-checked-icon"
        icon={{ x1: CheckIcon, x2: CheckIcon2x, x3: CheckIcon3x }}
      />
      <div className="title-success-modal">
        {props.title}
      </div>
      <div className="description-success-modal">
        {props.description}
      </div>
      <div className="footer-wrapper-success-modal">
        <Button onClick={props.action} text={props.actionText!} />
      </div>
    </div>
  )
}

SuccessModal.defaultProps = defaultProps

export default SuccessModal