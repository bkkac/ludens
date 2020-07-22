import React, { SFC } from 'react'
import {
  noop,
  isEmpty,
} from 'lodash'
import {
  SelectorItem,
  InputSelect,
  InputText,
  Button,
  ALink,
} from 'components'
import { FormikProps } from 'formik'
import colors from 'constants/colors'
import { BANKS } from 'constants/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './registerStep3.style.scss'

const constants = {
  title: 'สมัครสมาชิก',
  subTitle: 'ขั้นตอนสุดท้าย',
  backText: 'กลับ',
  remarkText: '* คือ จำเป็นต้องกรอก',
  placeholderUsername: 'ชื่อผู้ใช้ *',
  placeholderPassword: 'รหัสผ่าน *',
  placeholderConfirmPassword: 'ยืนยันรหัสผ่าน *',
  placeholderAffilate: 'รหัสคนชวน ',
  placeholderInput: (type: string) => `ระบุ${type}`.slice(0, -1),
  selectBankText: 'เลือกธนาคาร *',
  placeholderBankNumber: 'หมายเลขบัญชีธนาคาร *',
  placeholderOwnerName: 'ชื่อ - นามสกุลบัญชีธนาคาร *',
  buttonConfirm: 'สมัครสมาชิก',
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
    setFieldValue,
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
    })
  }

  const onPressBackStep = () => {
    resetInformationForm()
    onBackStep!(CURRENT_STEP)
  }

  const renderBankOption = ({ item, ...selectProps }: IInputDefaultSelectProps<ICBank>): JSX.Element =>
    (<SelectorItem icon={item.Icon} title={item.name} {...selectProps} />)

  return (
    <div className="register-step-3-form container">
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
        <div className="col">
          <h6 className="subtitle-2 secondary-red-text">{constants.remarkText}</h6>
        </div>
      </div>
      <div className="row p3-t">
        <div className="col">
          <h6 className="subtitle-2 secondary-blue-text">{constants.placeholderUsername}</h6>
          <InputText
            name="username"
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMessage={errors.username}
            error={!!errors.username && touched.username}
            placeholder={constants.placeholderInput(constants.placeholderUsername)}
          />
        </div>
      </div>
      <div className="row p1-t">
        <div className="col">
          <h6 className="subtitle-2 secondary-blue-text">{constants.placeholderPassword}</h6>
          <InputText
            type="password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMessage={errors.password}
            error={!!errors.password && touched.password}
            placeholder={constants.placeholderInput(constants.placeholderPassword)}
          />
        </div>
      </div>
      <div className="row p1-t">
        <div className="col">
          <h6 className="subtitle-2 secondary-blue-text">{constants.placeholderConfirmPassword}</h6>
          <InputText
            name="confirmPassword"
            value={values.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            errorMessage={errors.confirmPassword}
            error={!!errors.confirmPassword && touched.confirmPassword}
            placeholder={constants.placeholderInput(constants.placeholderConfirmPassword)}
          />
        </div>
      </div>
      <div className="row p1-t">
        <div className="col">
          <h6 className="subtitle-2 secondary-blue-text">{constants.placeholderAffilate}</h6>
          <InputText
            name="affilateRef"
            value={values.affilateRef}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMessage={errors.affilateRef}
            error={!!errors.affilateRef && touched.affilateRef}
            placeholder={constants.placeholderInput(constants.placeholderAffilate)}
          />
        </div>
      </div>

      <div className="row p2-t">
        <div className="col">
          <h6 className="subtitle-2 secondary-blue-text">{constants.selectBankText}</h6>
        </div>
      </div>
      <div className="row p1-t">
        <div className="col">
          <InputSelect<ICBank>
            name="bankType"
            items={BANKS}
            valueKey="value"
            value={values.bankType}
            onChange={(selected, name) => {
              setFieldValue(name, selected.value)
            }}
            placeholder={constants.placeholderInput(constants.selectBankText)}
            RenderSelected={renderBankOption}
          />
          <div className="select-bank-error-message">{isEmpty(errors.bankType) ? '' : errors.bankType}</div>
        </div>
      </div>
      <div className="row p1-t">
        <div className="col">
          <h6 className="subtitle-2  secondary-blue-text">{constants.placeholderBankNumber}</h6>
          <InputText
            name="bankNumber"
            value={values.bankNumber}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMessage={errors.bankNumber}
            error={!!errors.bankNumber && touched.bankNumber}
            placeholder={constants.placeholderInput(constants.placeholderBankNumber)}
          />
        </div>
      </div>
      <div className="row p1-t">
        <div className="col">
          <h6 className="subtitle-2  secondary-blue-text">{constants.placeholderOwnerName}</h6>
          <InputText
            name="ownerName"
            value={values.ownerName}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMessage={errors.ownerName}
            error={!!errors.ownerName && touched.ownerName}
            placeholder={constants.placeholderInput(constants.placeholderOwnerName)}
          />
        </div>
      </div>

      <div className="row pt-4">
        <div className="col">
          <Button
            id="register-final-submit-button"
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