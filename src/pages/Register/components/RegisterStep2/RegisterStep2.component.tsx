/* eslint-disable react-hooks/exhaustive-deps */
import React, { SFC, useState, useEffect } from 'react'
import { noop, replace, isEmpty, get } from 'lodash'
import moment from 'moment'
import { FormikProps } from 'formik'
import {
  ResponsiveIcon,
  InputTextIcon,
  Button,
  ALink,
} from 'components'
import colors from 'constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faSms } from '@fortawesome/free-solid-svg-icons'
import SMSIcon from 'assets/images/register/sms.svg'
import './registerStep2.style.scss'

const constants = {
  title: 'สมัครสมาชิก',
  subTitle: 'ขั้นตอนที่ 2',
  backText: 'กลับ',
  confirmPhoneNumber: 'ยืนยันหมายเลขโทรศัพท์',
  confirmSMS: 'ระบบได้ส่งรหัสยืนยันผ่าน SMS ไปยังเบอร์โทรศัพท์ที่กรอก',
  confirmNumber: (phoneNumber: string) => `${phoneNumber}`,
  placeholderOTPNumber: 'หมายเลข OTP',
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
const LIMIT_REQUEST = 0.5

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

  let intervalId: NodeJS.Timeout | null = null
  let intervalRequestId: NodeJS.Timeout | null = null

  const otpObject: IOTP = extraProps?.otp || {}

  const [remain, setRemain] = useState({ minutes: 0, seconds: 0 })
  const [isTimesup, setIsTimesup] = useState(true)
  const [remainRequest, setRemainRequest] = useState(0)
  const [isCoolingdown, setCoolingdown] = useState(true)

  const clearLocalInterval = (interval: NodeJS.Timeout | null) => {
    if (interval !== null) {
      clearInterval(interval)
      interval = null

    }
  }

  const countingdown = () => {
    if (isTimesup) {
      setIsTimesup(false)
    }
    if (intervalId) {
      clearInterval(intervalId);
    }
    const createAt = moment.utc(replace(otpObject.createAt!, /\s/g, ''))
    const timeRange = createAt.clone().add(LIMIT_TIME, LIMIT_UNIT)

    intervalId = setInterval(() => {
      const duration = moment.duration(timeRange.diff(moment.utc()))
      const minutes = duration.minutes()
      const seconds = duration.seconds()

      if (minutes <= 0 && seconds < 0) {
        clearLocalInterval(intervalId)
        setIsTimesup(true)
      } else if (isNaN(minutes) || isNaN(seconds)) {
        setRemain({ minutes: 0, seconds: 0 })
        clearLocalInterval(intervalId)
        setIsTimesup(true)
      } else {
        setRemain({ minutes, seconds })
      }

    }, 1000);
  }

  const countingdownRequest = () => {
    if (intervalRequestId) {
      clearInterval(intervalRequestId);
    }
    const timeRange = moment.utc().add(LIMIT_REQUEST, LIMIT_UNIT)

    intervalRequestId = setInterval(() => {
      const duration = moment.duration(timeRange.diff(moment.utc()))
      const seconds = duration.seconds()

      if (seconds <= 0) {
        clearLocalInterval(intervalRequestId)
        setCoolingdown(false)
      } else if (isNaN(seconds)) {
        clearLocalInterval(intervalRequestId)
        setCoolingdown(false)
        setRemainRequest(0)
      } else {
        if (!isCoolingdown) {
          setCoolingdown(true)
        }
        setRemainRequest(seconds)
      }
    }, 1000);
  }

  useEffect(() => {
    if (otpObject.createAt!) {
      countingdown()
      countingdownRequest()
    }

    return () => {
      clearLocalInterval(intervalId)
      clearLocalInterval(intervalRequestId)
      setIsTimesup(true)
    }
  }, [])

  useEffect(() => {
    if (!isEmpty(otpObject)) {
      const createAt = moment.utc(replace(otpObject.createAt!, /\s/g, ''))
      const timeRange = createAt.clone().add(LIMIT_TIME, LIMIT_UNIT)
      const duration = moment.duration(timeRange.diff(moment.utc()))
      const minutes = duration.minutes()
      const seconds = duration.seconds()
      if (minutes >= 0 && seconds > 0) {
        setIsTimesup(false)
        countingdown()
      }
    }

    return () => {
      clearLocalInterval(intervalId)
      clearLocalInterval(intervalRequestId)
      setIsTimesup(true)
    }
  }, [extraProps?.otp])

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
    const phoneNumber = get(extraProps, 'otp.phoneNumber', '')
    if (!isEmpty(phoneNumber)) {
      extraProps?.requestOTP(phoneNumber)
      countingdownRequest()
      if (intervalId !== null) {
        clearLocalInterval(intervalId)
        setIsTimesup(true)
      }
    } else {
      onPressBackStep()
    }
  }

  const onPressBackStep = () => {
    resetOTPForm()
    onBackStep!(CURRENT_STEP)
  }

  const requestOTPText = isCoolingdown
    ? `${constants.buttonOTPRequest} (${remainRequest})`
    : constants.buttonOTPRequest

  return (
    <div className="register-step-2-form container">
      <div className="row">
        <div className="col">
          <ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={onPressBackStep}>
            <FontAwesomeIcon icon={faChevronLeft} className="m1-r" />
            {constants.backText}
          </ALink>
        </div>
      </div>
      <div className="row p3-t">
        <div className="col">
          <h3>
            {constants.title}
            <span className="header-remark secondary-red-text">{constants.subTitle}</span>
          </h3>
        </div>
      </div>
      <div className="row p2-t">
        <div className="col text-center">
          <ResponsiveIcon icon={SMSIcon} alt="sms-icon" className="message-icon" />
        </div>
      </div>
      <div className="row p2-t">
        <div className="col text-center">
          <h5>{constants.confirmPhoneNumber}</h5>
          <h6 className="subtitle-2 secondary-text m1-t">{constants.confirmSMS}</h6>
          <h6 className="subtitle-1 m-1">{constants.confirmNumber(otpObject.phoneNumber || '')}</h6>
        </div>
      </div>
      <div className="row p2-t">
        <div className="col text-center">
          <h6 className="subtitle-2 secondary-red-text">{constants.remainText}</h6>
          <h1 className="secondary-red-text">
            {remain.minutes.toString().padStart(2, '0')}
            <span className="separator-time" />
            {remain.seconds.toString().padStart(2, '0')}
          </h1>
        </div>
      </div>
      <div className="row pt-4">
        <div className="col">
          <InputTextIcon
            icon={faSms}
            name="otp"
            useNumberpad
            value={values.otp}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMessage={errors.otp}
            error={!!errors.otp && touched.otp}
            placeholder={constants.placeholderOTPNumber}
          />
        </div>
      </div>
      <div className="row p1-t">
        <div className="col text-center">
          <ALink
            bold
            id="resent-new-opt"
            disabled={isCoolingdown}
            color={colors.PRIMARY_BLUE}
            onClick={onPressRequestNewOTP}
          >
            {requestOTPText}
          </ALink>
        </div>
      </div>
      <div className="row p2-t">
        <div className="col">
          <Button
            id="register-step-2-submit-button"
            disabled={!!errors.otp || isEmpty(values.otp) || isTimesup}
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