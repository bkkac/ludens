import React, { SFC } from 'react'
import { noop, isEmpty, isEqual } from 'lodash'
import {
  InputRadioImage,
  InputText,
  Button,
  ALink,
} from 'components'
import { EBANK } from 'constants/variables'
import { FormikProps } from 'formik'
import KasikornIcon from 'assets/images/global/bank/KBANK.png'
import KrungsriIcon from 'assets/images/global/bank/BAY.png'
import KrungthaiIcon from 'assets/images/global/bank/KTB.png'
import SCBIcon from 'assets/images/global/bank/SCB.png'
import './registerStep3.style.scss'

const constants = {
  title: 'ข้อมูลผู้ใช้',
  subTitle: 'Step 3',
  backText: '< ย้อนกลับ',
  placeholderUsername: 'ยูสเซอร์เนม(ชื่อผู้ใช้)*',
  placeholderPassword: 'รหัสผ่าน*',
  placeholderConfirmPassword: 'ยืนยันรหัสผ่าน*',
  placeholderAffilate: 'รหัสคนชวน',
  selectBankText: 'เลือกธนาคาร',
  placeholderBankNumber: 'หมายเลขบัญชี*',
  placeholderOwnerName: 'ชื่อเจ้าของบัญชี*',
  placeholderOwnerSurname: 'นามสกุล*',
  buttonConfirm: 'สมัครสมาชิค',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IRegisterFormProps = {
  onConfirmPresses() { noop() },
}

const CURRENT_STEP = 3

const RegisterStep3: SFC<FormikProps<IRegister> & IRegisterFormProps & DefaultProps> = (props) => {

  const {
    onBackStep,
    onConfirmPresses,
    values,
    touched,
    errors,
    isValid,
    handleChange,
    handleBlur,
    setValues,
    setErrors,
    setTouched,
  } = props

  const resetInformationForm = () => {
    setValues({
      ...values,
      username: '',
      password: '',
      confirmPassword: '',
      otp: '',
      affilateRef: '',
      bankType: '',
      bankNumber: '',
      ownerName: '',
      ownerSurname: '',
    })
    setErrors({
      ...errors,
      username: '',
      password: '',
      confirmPassword: '',
      otp: '',
      affilateRef: '',
      bankType: '',
      bankNumber: '',
      ownerName: '',
      ownerSurname: '',
    })
    setTouched({
      ...touched,
      username: false,
      password: false,
      confirmPassword: false,
      otp: false,
      affilateRef: false,
      bankType: false,
      bankNumber: false,
      ownerName: false,
      ownerSurname: false,
    })
  }

  const onPressBackStep = () => {
    resetInformationForm()
    onBackStep!(CURRENT_STEP)
  }

  return (
    <div className="register-step-3-form mb-5">
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
          type="password"
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
          type="password"
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
        <div className="col select-bank-header">{constants.selectBankText}</div>
        <div className="select-bank-error-message">{isEmpty(errors.bankType) ? '' : errors.bankType}</div>
      </div>
      <div className="d-flex flex-row pt-3">
        <div className="mr-2">
          <InputRadioImage
            image={KasikornIcon}
            name="bankType"
            alt="kasikorn"
            value={EBANK.KBANK}
            onBlur={handleBlur}
            onChange={handleChange}
            checked={isEqual(values.bankType, EBANK.KBANK)}
          />
        </div>
        <div className="mx-2">
          <InputRadioImage
            image={KrungsriIcon}
            name="bankType"
            alt="krungsri"
            value={EBANK.BAY}
            onBlur={handleBlur}
            onChange={handleChange}
            checked={isEqual(values.bankType, EBANK.BAY)}
          />
        </div>
        <div className="mx-2">
          <InputRadioImage
            image={KrungthaiIcon}
            name="bankType"
            alt="krungthai"
            value={EBANK.KTB}
            onBlur={handleBlur}
            onChange={handleChange}
            checked={isEqual(values.bankType, EBANK.KTB)}
          />
        </div>
        <div className="mx-2">
          <InputRadioImage
            image={SCBIcon}
            name="bankType"
            alt="scb"
            value={EBANK.SCB}
            onBlur={handleBlur}
            onChange={handleChange}
            checked={isEqual(values.bankType, EBANK.SCB)}
          />
        </div>
      </div>
      <div className="row pt-4">
        <InputText
          name="bankNumber"
          value={values.bankNumber}
          onBlur={handleBlur}
          onChange={handleChange}
          errorMessage={errors.bankNumber}
          error={!!errors.bankNumber && touched.bankNumber}
          placeholder={constants.placeholderBankNumber}
        />
      </div>
      <div className="row pt-1">
        <InputText
          name="ownerName"
          value={values.ownerName}
          onBlur={handleBlur}
          onChange={handleChange}
          errorMessage={errors.ownerName}
          error={!!errors.ownerName && touched.ownerName}
          placeholder={constants.placeholderOwnerName}
        />
      </div>
      <div className="row pt-1">
        <InputText
          name="ownerSurname"
          value={values.ownerSurname}
          onBlur={handleBlur}
          onChange={handleChange}
          errorMessage={errors.ownerSurname}
          error={!!errors.ownerSurname && touched.ownerSurname}
          placeholder={constants.placeholderOwnerSurname}
        />
      </div>

      <div className="row pt-4">
        <div className="col">
          <Button
            disabled={!isValid}
            text={constants.buttonConfirm}
            onClick={() => onConfirmPresses!(CURRENT_STEP, values)}
          />
        </div>
      </div>
    </div>
  )
}

RegisterStep3.defaultProps = defaultProps

export default RegisterStep3