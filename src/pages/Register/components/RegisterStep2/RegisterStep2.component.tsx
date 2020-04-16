import React, { SFC } from 'react'
import { noop } from 'lodash'
import { InputText, Button, ALink } from 'components'
import { FormikProps } from 'formik'
import MessageIcon from 'assets/images/register/message.png'
import './registerStep2.style.scss'

const constants = {
  title: 'ยืนยันหมายเลข OTP',
  subTitle: 'Step 2',
  backText: '< ย้อนกลับ',
  confirmPhoneNumber: 'ยืนยันหมายเลขโทรศัพท์',
  confirmSMS: 'ระบบได้ส่งรหัสยืนยันผ่าน SMS ไปยังเบอร์โทรศัพท์ที่กรอก',
  confirmNumber: (phoneNumber: string, confirmCode: string) => `${phoneNumber} Ref. ${confirmCode}`,
  placeholderOTPNumber: 'หมายเลข OTP*',
  remainText: 'คุณมีเวลากรอกภายใน 1 นาที',
  buttonOTPRequest: 'ขอ OTP ใหม่',
  buttonNextStep: 'ถัดไป',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IRegisterFormProps = {
  onConfirmPresses() { noop() },
}

const CURRENT_STEP = 2

const RegisterStep2: SFC<FormikProps<IRegister> & IRegisterFormProps & DefaultProps> = (props) => {

  const { onConfirmPresses } = props

  const phoneNumber = '0857118884'
  const codeNumber = 'RX78'
  const hours = '00'
  const minutes = '55'

  return (
    <div className="register-step-2-form">
      <div className="row">
        <div className="col">
          <ALink text={constants.backText} color="#ff9b96" bold />
        </div>
      </div>
      <div className="row pt-4">
        <div className="col header-title">
          {constants.title}
          <span>{constants.subTitle}</span>
        </div>
      </div>
      <div className="row pt-5">
        <div className="col text-center">
          <img src={MessageIcon} alt="message-icon" className="message-icon" />
        </div>
      </div>
      <div className="row pt-3">
        <div className="col">
          <div className="row">
            <div className="col text-center confirm-phonenumber bold">
              {constants.confirmPhoneNumber}
            </div>
          </div>
          <div className="row">
            <div className="col text-center confirm-phonenumber">
              {constants.confirmSMS}
            </div>
          </div>
          <div className="row">
            <div className="col text-center confirm-phonenumber bold">
              {constants.confirmNumber(phoneNumber, codeNumber)}
            </div>
          </div>
        </div>
      </div>
      <div className="row pt-4">
        <InputText placeholder={constants.placeholderOTPNumber} />
        <div className="col-5 col-md-3 m-auto">
          <Button text={constants.buttonOTPRequest} size="small" />
        </div>
      </div>
      <div className="row pt-3">
        <div className="col">
          <div className="row">
            <div className="col text-center remain-text">{constants.remainText}</div>
          </div>
          <div className="row">
            <div className="col text-center remain-number-text">{hours}<span />{minutes}</div>
          </div>
        </div>
      </div>
      <div className="row pt-4">
        <div className="col">
          <Button text={constants.buttonNextStep} onClick={() => onConfirmPresses!(CURRENT_STEP)} />
        </div>
      </div>
    </div>
  )
}

RegisterStep2.defaultProps = defaultProps

export default RegisterStep2