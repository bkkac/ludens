import React from 'react'
import { FormikProps, Form } from 'formik'
import {
  InputCheckbox,
  InputText,
  Button,
  ALink,
} from 'components'
import UserIcon from 'assets/images/home/user.png'
import KeyIcon from 'assets/images/home/key.png'
import './loginForm.style.scss'

const constants = {
  placeholderUsername: 'ชื่อผู้ใช้งาน',
  placeholderPassword: 'รหัสผ่าน',
  alinkRemember: 'จดจำรหัสผ่าน',
  alinkForgot: 'ลืมรหัสผ่าน',
  alinkRegister: 'สมัครสมาชิค',
  buttonLogin: 'เข้าสู่ระบบ',
}

function LoginForm(props: FormikProps<ILogin> & ILoginFormProps) {

  const {
    onNavigateToRegister,
    onNavigateToForgotPassword,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
  } = props

  const onPressNavigateToRegister = () => {
    onNavigateToRegister!()
  }

  const onPressNavigateToForgotPassword = () => {
    onNavigateToForgotPassword!()
  }

  return (
    <Form>
      <div className="login-from-container pb-4">
        <div className="row">
          <InputText
            name="username"
            icon={UserIcon}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.username}
            errorMessage={errors.username}
            placeholder={constants.placeholderUsername}
            error={!!errors.username && touched.username}
          />
        </div>
        <div className="row">
          <InputText
            name="password"
            type="password"
            icon={KeyIcon}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            errorMessage={errors.password}
            placeholder={constants.placeholderPassword}
            error={!!errors.password && touched.password}
          />
        </div>
        <div className="row">
          <div className="col align-self-start">
            <InputCheckbox
              name="remember"
              label={constants.alinkRemember}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.remember}
            />
          </div>
          <div className="col align-self-end text-right">
            <ALink text={constants.alinkForgot} onClick={onPressNavigateToForgotPassword} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Button buttonType="submit" text={constants.buttonLogin} />
          </div>
        </div>
        <div className="row">
          <div className="col text-center pt-1">
            <ALink
              onClick={onPressNavigateToRegister}
              text={constants.alinkRegister}
              color="#88b8f6"
              bold
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

export default LoginForm