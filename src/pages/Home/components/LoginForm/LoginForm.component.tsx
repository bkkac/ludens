import React from 'react'
import { FormikProps, Form } from 'formik'
import {
  InputCheckbox,
  InputTextIcon,
  Button,
  ALink,
} from 'components'
import colors from 'constants/colors'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import './loginForm.style.scss'

const constants = {
  placeholderUsername: 'ชื่อผู้ใช้งาน',
  placeholderPassword: 'รหัสผ่าน',
  alinkRemember: 'จดจำรหัสผ่าน',
  alinkForgot: 'ลืมรหัสผ่าน',
  alinkRegister: 'สมัครสมาชิก',
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
          <div className="col">
            <InputTextIcon
              icon={faUser}
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              errorMessage={errors.username}
              placeholder={constants.placeholderUsername}
              error={!!errors.username && touched.username}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <InputTextIcon
              icon={faKey}
              name="password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              errorMessage={errors.password}
              placeholder={constants.placeholderPassword}
              error={!!errors.password && touched.password}
            />
          </div>
        </div>
        <div className="row m2-t">
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
            <ALink id="goto-forgot-password" onClick={onPressNavigateToForgotPassword}>
              {constants.alinkForgot}
            </ALink>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Button id="login-submit-button" buttonType="submit" text={constants.buttonLogin} />
          </div>
        </div>
        <div className="row">
          <div className="col text-center pt-1">
            <ALink id="goto-register" onClick={onPressNavigateToRegister} color={colors.PRIMARY_TEXT}>
              {constants.alinkRegister}
            </ALink>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default LoginForm