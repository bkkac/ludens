import React, { SFC } from 'react'
import { Banner, InputText, Button } from 'components'
import { FormikProps, FormikValues } from 'formik'
import './registerStep1.style.scss'

const constants = {
  title: 'สมัครสมาชิค',
  subTitle: 'Step 1',
  placeholderPhoneNumber: 'หมายเลขโทรศัพท์ 10 หลัก',
  placeholderHint: 'รหัส 4 ตัวในภาพ',
  buttonRequestOTP: 'ขอ OTP',
}

const RegisterStep1: SFC<FormikProps<FormikValues>> = (props) => {

  return (
    <div className="register-step-1-form">
      <div className="row"><Banner /></div>
      <div className="row">
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
      <div className="row">
        <div className="col">
          <Button text={constants.buttonRequestOTP} />
        </div>
      </div>
    </div>
  )
}

export default RegisterStep1