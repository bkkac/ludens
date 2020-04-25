import React, { SFC } from 'react'
import { noop, isEqual, isEmpty } from 'lodash'
import { InputText, Button, ALink, InputRadioImage } from 'components'
import { FormikProps } from 'formik'
import KasikornIcon from 'assets/images/register/kasikorn.png'
import KrungsriIcon from 'assets/images/register/krungsri.png'
import KrungthaiIcon from 'assets/images/register/krungthai.png'
import SCBIcon from 'assets/images/register/scb.png'
import './registerStep4.style.scss'

const constants = {
  title: 'ข้อมูลบัญชีธนาคาร',
  subTitle: 'Step 4',
  backText: '< ย้อนกลับ',
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

const CURRENT_STEP = 4

const RegisterStep4: SFC<FormikProps<IRegister> & IRegisterFormProps & DefaultProps> = (props) => {

  const {
    onConfirmPresses,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isValid,
  } = props

  return (
    <div className="register-step-4-form mb-5">
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
        <div className="col select-bank-header">{constants.selectBankText}</div>
        <div className="select-bank-error-message">{isEmpty(errors.bankType) ? '' : errors.bankType}</div>
      </div>
      <div className="d-flex flex-row pt-3">
        <div className="mr-2">
          <InputRadioImage
            image={KasikornIcon}
            name="bankType"
            alt="kasikorn"
            value="kasikorn"
            onBlur={handleBlur}
            onChange={handleChange}
            checked={isEqual(values.bankType, 'kasikorn')}
          />
        </div>
        <div className="mx-2">
          <InputRadioImage
            image={KrungsriIcon}
            name="bankType"
            alt="krungsri"
            value="krungsri"
            onBlur={handleBlur}
            onChange={handleChange}
            checked={isEqual(values.bankType, 'krungsri')}
          />
        </div>
        <div className="mx-2">
          <InputRadioImage
            image={KrungthaiIcon}
            name="bankType"
            alt="krungthai"
            value="krungthai"
            onBlur={handleBlur}
            onChange={handleChange}
            checked={isEqual(values.bankType, 'krungthai')}
          />
        </div>
        <div className="mx-2">
          <InputRadioImage
            image={SCBIcon}
            name="bankType"
            alt="scb"
            value="scb"
            onBlur={handleBlur}
            onChange={handleChange}
            checked={isEqual(values.bankType, 'scb')}
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
      <div className="row py-4">
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

RegisterStep4.defaultProps = defaultProps

export default RegisterStep4