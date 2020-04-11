import React from 'react'
import { FormikProps, FormikValues } from 'formik'
import { InputText, Button, ALink } from 'components'
import './loginForm.style.scss'

const constants = {
  heading: 'เข้าสู่ระบบ',
  placeholderUsername: 'ชื่อผู้ใช้งาน',
  placeholderPassword: 'รหัสผ่าน',
  alinkRemember: 'จดจำรหัสผ่าน',
  alinkForgot: 'ลืมรหัสผ่าน',
  alinkRegister: 'สมัครสมาชิค',
  buttonLogin: 'เข้าสู่ระบบ',
}

function LoginForm(props: FormikProps<FormikValues>) {

  return (
    <div className="login-from-container">
      <div className="heading-text">{constants.heading}</div>
      <div className="row">
        <InputText placeholder={constants.placeholderUsername} />
      </div>
      <div className="row">
        <InputText placeholder={constants.placeholderPassword} />
      </div>
      <div className="row">
        <div className="col align-self-start"><ALink text={constants.alinkRemember} /></div>
        <div className="col align-self-end text-right"><ALink text={constants.alinkForgot} /></div>
      </div>
      <div className="row">
        <div className="col">
          <Button text={constants.buttonLogin} />
        </div>
      </div>
      <div className="row">
        <div className="col text-center pt-1">
          <ALink text={constants.alinkRegister} bold color="#88b8f6" />
        </div>
      </div>
    </div>
  )
}

export default LoginForm