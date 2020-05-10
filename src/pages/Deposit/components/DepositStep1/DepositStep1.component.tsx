import React, { SFC } from 'react'
import {
  ALink,
  Button,
  InputText,
  BankNumberCard,
  InputRadioImage,
} from 'components'
import { noop, isEqual, isEmpty } from 'lodash'
import { FormikProps, Form } from 'formik'
import KasikornIcon from 'assets/images/global/bank/kasikorn.png'
import KrungsriIcon from 'assets/images/global/bank/krungsri.png'
import KrungthaiIcon from 'assets/images/global/bank/krungthai.png'
import SCBIcon from 'assets/images/global/bank/scb.png'
import './depositStep1.style.scss'

const constants = {
  backText: '< ย้อนกลับ',
  depositTitle: 'ฝาก',
  depositDescription: '* กรุณาใช้บัญชีนี้โอนเงินเข้ามาเท่านั้น',
  buttonNextStep: 'ต่อไป',
  selectBankText: 'เลือกธนาคาร',
  placeholdeAmount: 'ระบุจำนวนเงิน',
  amountTitle: 'ระบุจำนวนเงินฝาก',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IDepositFormProps = {
  onConfirmPresses() { noop() },
  onBackStep() { noop() },
}

const CURRENT_STEP = 1

const DepositStep1: SFC<FormikProps<IDeposit> & IDepositFormProps & DefaultProps> = (props) => {

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    onConfirmPresses,
    onBackStep,
  } = props

  const onPressBack = () => {
    onBackStep!(CURRENT_STEP)
  }

  const handleNextStep = () => {
    onConfirmPresses!(values)
  }

  const bankName = 'เจนณรงค์ แสนแปง'
  const bankNumber = '9342722934'
  const bankType = 'kasikorn'

  return (
    <Form>
      <div className="deposit-form-wrapper mb-5">
        <div className="row">
          <div className="col">
            <ALink text={constants.backText} color="#ff9b96" bold onClick={onPressBack} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="deposit-title">{constants.depositTitle}</div>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col d-flex justify-content-center">
            <div className="deposit-description-text">{constants.depositDescription}</div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col d-flex justify-content-center">
            <BankNumberCard
              bankNumber={bankNumber}
              bankName={bankName}
              bankType={bankType}
            />
          </div>
        </div>
        <div className="row pt-5">
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
        <div className="row pt-5">
          <div className="col select-bank-header">{constants.amountTitle}</div>
        </div>
        <div className="row">
          <InputText
            useNumberpad
            name="amount"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.amount}
            errorMessage={errors.amount}
            placeholder={constants.placeholdeAmount}
            error={!!errors.amount && touched.amount}
          />
        </div>
        <div className="row pt-4">
          <div className="col">
            <Button
              disabled={!!errors.bankType || isEmpty(values.bankType)
                || !!errors.amount || isEmpty(values.amount)}
              text={constants.buttonNextStep}
              onClick={handleNextStep}
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

DepositStep1.defaultProps = defaultProps

export default DepositStep1