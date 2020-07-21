import React, { SFC } from 'react'
import { Banner, InputText, Button, ALink } from 'components'
import colors from 'constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { noop, isEmpty } from 'lodash'
import { FormikProps } from 'formik'
import './registerStep1.style.scss'

const constants = {
  title: 'สมัครสมาชิก',
  subTitle: 'ขั้นตอนที่ 1',
  placeholderPhoneNumber: 'หมายเลขโทรศัพท์ 10 หลัก',
  placeholderHint: 'รหัส 4 ตัวในภาพ',
  buttonRequestOTP: 'ขอ OTP',
  backText: 'กลับ',
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
    <div className="register-step-1-form container">
      <div className="row">
        <div className="col">
          <ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={onPressBackStep}>
            <FontAwesomeIcon icon={faChevronLeft} className="m1-r" />
            {constants.backText}
          </ALink>
        </div>
      </div>
      <div className="row pt-4">
        <div className="col">
          <Banner />
        </div>
      </div>
      <div className="row p2-t">
        <div className="col">
          <h3>
            {constants.title}
            <span className="header-remark secondary-red-text">{constants.subTitle}</span>
          </h3>
        </div>
      </div>
      <div className="row p3-t">
        <div className="col">
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
      </div>
      <div className="row p2-t">
        <div className="col">
          <Button
            id="register-step-1-submit-button"
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