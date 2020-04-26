/* eslint-disable react-hooks/exhaustive-deps */
import React, { SFC, useState, useEffect } from 'react'
import { noop, replace, isEmpty } from 'lodash'
import moment from 'moment'
import { FormikProps } from 'formik'
import { InputText, Button, ALink } from 'components'
import { timer } from 'utils'
import MessageIcon from 'assets/images/register/message.png'
import './registerStep2.style.scss'

const constants = {
  title: 'ยืนยันหมายเลข OTP',
  subTitle: 'Step 2',
  backText: '< ย้อนกลับ',
  confirmPhoneNumber: 'ยืนยันหมายเลขโทรศัพท์',
  confirmSMS: 'ระบบได้ส่งรหัสยืนยันผ่าน SMS ไปยังเบอร์โทรศัพท์ที่กรอก',
  confirmNumber: (phoneNumber: string, confirmCode?: string) => `${phoneNumber} Ref. ${confirmCode}`,
  placeholderOTPNumber: 'หมายเลข OTP*',
  remainText: 'คุณมีเวลากรอกภายใน 1 นาที',
  buttonOTPRequest: 'ขอ OTP ใหม่',
  buttonNextStep: 'ถัดไป',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IRegisterFormProps<{ otp: IOTP; requestOTP(mobileNumber: string): void }> = {
  onConfirmPresses() { noop() },
}

const CURRENT_STEP = 2
const LIMIT_TIME = 1
const LIMIT_UNIT = 'minutes'

const RegisterStep2: SFC<
  FormikProps<IRegister>
  & IRegisterFormProps<{ otp: IOTP; requestOTP(mobileNumber: string): void }>
  & DefaultProps
> = (props) => {

  const {
    onConfirmPresses,
    onBackStep,
    extraProps,
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldError,
    setFieldTouched,
  } = props

  const [remain, setRemain] = useState({ minutes: 0, seconds: 0 })
  const [isTimesup, setIsTimesup] = useState(false)

  const countingdown = () => {
    const createAt = moment(replace(extraProps?.otp!.createAt, /\s/g, ''))
    const timeRange = createAt.clone().add(LIMIT_TIME, LIMIT_UNIT)
    timer.intervalDuration(timeRange, (coreInterval, duration) => {
      const minutes = duration.minutes()
      const seconds = duration.seconds()
      if (minutes <= 0 && seconds < 0) {
        clearInterval(coreInterval)
        setIsTimesup(true)
      } else {
        setRemain({ minutes, seconds })
      }
    })
  }

  useEffect(countingdown, [])

  useEffect(() => {
    if (isTimesup) {
      console.log(extraProps)
      setIsTimesup(false)
      setRemain({ minutes: 0, seconds: 0 })
      countingdown()
    }
  }, [extraProps])

  const onPressValidateOTP = () => {
    if (!errors.otp) {
      onConfirmPresses!(CURRENT_STEP, values)
    }
  }

  const resetOTPForm = () => {
    setFieldValue('otp', '')
    setFieldError('otp', '')
    setFieldTouched('otp', false)
  }

  const onPressRequestNewOTP = () => {
    resetOTPForm()
    extraProps?.requestOTP(extraProps.otp.mobileNumber)
  }

  const onPressBackStep = () => {
    resetOTPForm()
    onBackStep!(CURRENT_STEP)
  }

  return (
    <div className="register-step-2-form mb-5">
      <div className="row">
        <div className="col">
          <ALink text={constants.backText} color="#ff9b96" bold onClick={onPressBackStep} />
        </div>
      </div>
      <div className="row pt-4">
        <div className="col header-title">
          {constants.title}
          <span>{constants.subTitle}</span>
        </div>
      </div>
      <div className="row pt-5">
        <div className="col text-center">
          <img src={MessageIcon} alt="message-icon" className="message-icon" />
        </div>
      </div>
      <div className="row pt-3">
        <div className="col">
          <div className="row">
            <div className="col text-center confirm-phonenumber bold">
              {constants.confirmPhoneNumber}
            </div>
          </div>
          <div className="row">
            <div className="col text-center confirm-phonenumber">
              {constants.confirmSMS}
            </div>
          </div>
          <div className="row">
            <div className="col text-center confirm-phonenumber bold">
              {constants.confirmNumber(extraProps?.otp!.mobileNumber, extraProps?.otp!.otp)}
            </div>
          </div>
        </div>
      </div>
      <div className="row pt-4">
        <InputText
          name="otp"
          useNumberpad
          value={values.otp}
          onBlur={handleBlur}
          onChange={handleChange}
          errorMessage={errors.otp}
          error={!!errors.otp && touched.otp}
          placeholder={constants.placeholderOTPNumber}
        />
        <div className="col-5 col-md-3 m-auto">
          <Button
            disabled
            text={constants.buttonOTPRequest}
            onClick={onPressRequestNewOTP}
            size="small"
          />
        </div>
      </div>
      <div className="row pt-3">
        <div className="col">
          <div className="row">
            <div className="col text-center remain-text">{constants.remainText}</div>
          </div>
          <div className="row">
            <div className="col text-center remain-number-text">
              {remain.minutes.toString().padStart(2, '0')}
              <span />
              {remain.seconds.toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
      <div className="row pt-4">
        <div className="col">
          <Button
            disabled={!!errors.otp || isEmpty(values.otp)}
            text={constants.buttonNextStep}
            onClick={onPressValidateOTP}
          />
        </div>
      </div>
    </div>
  )
}

RegisterStep2.defaultProps = defaultProps

export default RegisterStep2