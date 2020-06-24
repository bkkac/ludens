import React, { SFC } from 'react'
import { Banner, InputText, Button, ALink } from 'components'
import { noop, isEmpty } from 'lodash'
import { FormikProps } from 'formik'
import './registerStep1.style.scss'

const constants = {
  title: 'สมัครสมาชิค',
  subTitle: 'Step 1',
  placeholderPhoneNumber: 'หมายเลขโทรศัพท์ 10 หลัก',
  placeholderHint: 'รหัส 4 ตัวในภาพ',
  buttonRequestOTP: 'ขอ OTP',
  backText: '< ย้อนกลับ',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IRegisterFormProps = {
  onConfirmPresses() { noop() },
  onBackStep() { noop() },
}

const CURRENT_STEP = 1

const RegisterStep1: SFC<FormikProps<IRegister> & IRegisterFormProps & DefaultProps> = (props) => {

  const {
    values,
    touched,
    errors,
    onBackStep,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    onConfirmPresses,
  } = props

  const onPressRequestOTP = () => {
    if (!errors.phoneNumber) {
      onConfirmPresses!(CURRENT_STEP, values)
    }
  }

  const resetMobileForm = () => {
    setFieldValue('phoneNumber', '')
    setFieldError('phoneNumber', '')
    setFieldTouched('phoneNumber', false)
  }

  const onPressBackStep = () => {
    resetMobileForm()
    onBackStep!(CURRENT_STEP)
  }

  return (
    <div className="register-step-1-form mb-5">
      <div className="row">
        <div className="col">
          <ALink color="#ff9b96" bold onClick={onPressBackStep}>
            {constants.backText}
          </ALink>
        </div>
      </div>
      <div className="row pt-4">
        <div className="col">
          <Banner />
        </div>
      </div>
      <div className="row pt-5">
        <div className="col header-title">
          {constants.title}
          <span>{constants.subTitle}</span>
        </div>
      </div>
      <div className="row">
        <InputText
          useNumberpad
          name="phoneNumber"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          errorMessage={errors.phoneNumber}
          placeholder={constants.placeholderPhoneNumber}
          error={!!errors.phoneNumber && touched.phoneNumber}
        />
      </div>
      <div className="row">
        {/** captcha */}
      </div>
      <div className="row">
        {/* <InputText placeholder={constants.placeholderHint} /> */}
      </div>
      <div className="row pt-4">
        <div className="col">
          <Button
            disabled={!!errors.phoneNumber || isEmpty(values.phoneNumber)}
            text={constants.buttonRequestOTP}
            onClick={onPressRequestOTP}
          />
        </div>
      </div>
    </div>
  )
}

RegisterStep1.defaultProps = defaultProps

export default RegisterStep1