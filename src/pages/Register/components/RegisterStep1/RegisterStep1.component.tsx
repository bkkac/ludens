import React, { SFC } from 'react'
import { Banner, InputText, Button } from 'components'
import { noop } from 'lodash'
import { FormikProps } from 'formik'
import './registerStep1.style.scss'

const constants = {
  title: 'สมัครสมาชิค',
  subTitle: 'Step 1',
  placeholderPhoneNumber: 'หมายเลขโทรศัพท์ 10 หลัก',
  placeholderHint: 'รหัส 4 ตัวในภาพ',
  buttonRequestOTP: 'ขอ OTP',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IRegisterFormProps = {
  onConfirmPresses() { noop() },
}

const CURRENT_STEP = 1

const RegisterStep1: SFC<FormikProps<IRegister> & IRegisterFormProps & DefaultProps> = (props) => {

  const { onConfirmPresses } = props

  return (
    <div className="register-step-1-form">
      <div className="row"><Banner /></div>
      <div className="row pt-5">
        <div className="col header-title">
          {constants.title}
          <span>{constants.subTitle}</span>
        </div>
      </div>
      <div className="row">
        <InputText placeholder={constants.placeholderPhoneNumber} />
      </div>
      <div className="row">
        {/** captcha */}
      </div>
      <div className="row">
        <InputText placeholder={constants.placeholderHint} />
      </div>
      <div className="row pt-4">
        <div className="col">
          <Button text={constants.buttonRequestOTP} onClick={() => onConfirmPresses!(CURRENT_STEP)} />
        </div>
      </div>
    </div>
  )
}

RegisterStep1.defaultProps = defaultProps

export default RegisterStep1