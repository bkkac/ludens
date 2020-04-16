import React, { SFC } from 'react'
import { noop } from 'lodash'
import { InputText, Button, ALink } from 'components'
import { FormikProps } from 'formik'
import './registerStep3.style.scss'

const constants = {
  title: 'ข้อมูลส่วนตัว',
  subTitle: 'Step 3',
  backText: '< ย้อนกลับ',
  placeholderUsername: 'ชื่อผู้ใช้*',
  placeholderPassword: 'รหัสผ่าน*',
  placeholderConfirmPassword: 'ยืนยันรหัสผ่าน*',
  placeholderAffilate: 'รหัสคนชวน',
  buttonNextStep: 'ถัดไป',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IRegisterFormProps = {
  onConfirmPresses() { noop() },
}

const CURRENT_STEP = 3

const RegisterStep3: SFC<FormikProps<IRegister> & IRegisterFormProps & DefaultProps> = (props) => {

  const { onConfirmPresses } = props

  return (
    <div className="register-step-3-form">
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
      <div className="row pt-4">
        <InputText placeholder={constants.placeholderUsername} />
      </div>
      <div className="row pt-1">
        <InputText placeholder={constants.placeholderPassword} />
      </div>
      <div className="row pt-1">
        <InputText placeholder={constants.placeholderConfirmPassword} />
      </div>
      <div className="row pt-1">
        <InputText placeholder={constants.placeholderAffilate} />
      </div>
      <div className="row pt-4">
        <div className="col">
          <Button text={constants.buttonNextStep} onClick={() => onConfirmPresses!(CURRENT_STEP)} />
        </div>
      </div>
    </div>
  )
}

RegisterStep3.defaultProps = defaultProps

export default RegisterStep3