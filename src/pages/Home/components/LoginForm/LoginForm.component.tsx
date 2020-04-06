import React from 'react'
import { Form, FormikProps, FormikValues } from 'formik'
import { InputText } from 'components'
import './loginForm.style.scss'

const constants = {
  heading: 'เข้าสู่ระบบ',
}

function LoginForm(props: FormikProps<FormikValues>) {

  return (
    <Form>
      <div className="heading-text">{constants.heading}</div>
      <div className="row">
        <InputText placeholder="ชื่อผู้ใช้งาน" />
      </div>
      <div className="row">
        <InputText placeholder="รหัสผ่าน" />
      </div>
    </Form>
  )
}

export default LoginForm