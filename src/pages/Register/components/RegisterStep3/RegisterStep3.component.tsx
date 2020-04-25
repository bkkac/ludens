import React, { SFC } from 'react'
import { noop, isEmpty } from 'lodash'
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

  const {
    onConfirmPresses,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
  } = props

  return (
    <div className="register-step-3-form mb-5">
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
        <InputText
          name="username"
          value={values.username}
          onBlur={handleBlur}
          onChange={handleChange}
          errorMessage={errors.username}
          error={!!errors.username && touched.username}
          placeholder={constants.placeholderUsername}
        />
      </div>
      <div className="row pt-1">
        <InputText
          name="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          errorMessage={errors.password}
          error={!!errors.password && touched.password}
          placeholder={constants.placeholderPassword}
        />
      </div>
      <div className="row pt-1">
        <InputText
          name="confirmPassword"
          value={values.confirmPassword}
          onBlur={handleBlur}
          onChange={handleChange}
          errorMessage={errors.confirmPassword}
          error={!!errors.confirmPassword && touched.confirmPassword}
          placeholder={constants.placeholderConfirmPassword}
        />
      </div>
      <div className="row pt-1">
        <InputText
          name="affilateRef"
          value={values.affilateRef}
          onBlur={handleBlur}
          onChange={handleChange}
          errorMessage={errors.affilateRef}
          error={!!errors.affilateRef && touched.affilateRef}
          placeholder={constants.placeholderAffilate}
        />
      </div>
      <div className="row pt-4">
        <div className="col">
          <Button
            disabled={
              !!errors.username || isEmpty(values.username)
              || !!errors.password || isEmpty(values.password)
              || !!errors.confirmPassword || isEmpty(values.confirmPassword)
            }
            text={constants.buttonNextStep}
            onClick={() => onConfirmPresses!(CURRENT_STEP)}
          />
        </div>
      </div>
    </div>
  )
}

RegisterStep3.defaultProps = defaultProps

export default RegisterStep3