import React, { SFC } from 'react'
import { noop } from 'lodash'
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

  const { onConfirmPresses } = props

  return (
    <div className="register-step-4-form">
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
      </div>
      <div className="d-flex flex-row pt-3">
        <div className="mr-2"><InputRadioImage image={KasikornIcon} name="bank-radio" alt="kasikorn" /></div>
        <div className="mx-2"><InputRadioImage image={KrungsriIcon} name="bank-radio" alt="krungsri" /></div>
        <div className="mx-2"><InputRadioImage image={KrungthaiIcon} name="bank-radio" alt="krungthai" /></div>
        <div className="mx-2"><InputRadioImage image={SCBIcon} name="bank-radio" alt="scb" /></div>
      </div>
      <div className="row pt-4">
        <InputText placeholder={constants.placeholderBankNumber} />
      </div>
      <div className="row pt-1">
        <InputText placeholder={constants.placeholderOwnerName} />
      </div>
      <div className="row pt-1">
        <InputText placeholder={constants.placeholderOwnerSurname} />
      </div>
      <div className="row py-4">
        <div className="col">
          <Button text={constants.buttonConfirm} onClick={() => onConfirmPresses!(CURRENT_STEP)} />
        </div>
      </div>
    </div>
  )
}

RegisterStep4.defaultProps = defaultProps

export default RegisterStep4