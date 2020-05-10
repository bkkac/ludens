import React, { SFC } from 'react'
import {
  ALink,
  Button,
  InputText,
  ResponsiveIcon,
  BankNumberCard,
} from 'components'
import { noop } from 'lodash'
import { FormikProps, Form } from 'formik'
import TransferTo from 'assets/images/deposit/transferTo/transferTo.png'
import TransferTo2x from 'assets/images/deposit/transferTo/transferTo@2x.png'
import TransferTo3x from 'assets/images/deposit/transferTo/transferTo@3x.png'
import './depositStep2.style.scss'

const constants = {
  backText: '< ย้อนกลับ',
  depositTitle: 'ฝาก',
  depositDescription: '* กรุณาใช้บัญชีนี้โอนเงินเข้ามาเท่านั้น',
  buttonFinish: 'แจ้งโอนเงิน',
  buttonCancel: 'ยกเลิกรายการ',
  placeholdeAmount: 'ระบุจำนวนเงิน',
  placeholdeHours: 'ชั่วโมง',
  placeholdeMinuite: 'นาที',
  placeholdeRemark: 'หมายเหตุ',
  amountTitle: 'ระบุจำนวนเงินฝาก',
  depositTimeTitle: 'ระบุเวลาฝาก',
  timeRemarkTitle: '(กรุณาใส่เวลาฝากตามสลิปการโอน)',
  remarkTitle: 'หมายเหตุ',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IDepositFormProps = {
  onCancelPresses() { noop() },
  onBackStep() { noop() },
}

const CURRENT_STEP = 2

const DepositStep2: SFC<FormikProps<IDeposit> & IDepositFormProps & DefaultProps> = (props) => {

  const {
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    onBackStep,
    onCancelPresses,
  } = props

  const onPressBack = () => {
    onBackStep!(CURRENT_STEP)
  }

  const onPressCancel = () => {
    onCancelPresses!()
  }

  const bankName = 'เจนณรงค์ แสนแปง'
  const bankNumber = '9342722934'
  const bankType = 'kasikorn'

  const selectedBankName = 'Thailand Bet'
  const selectedBankNumber = '8237483824'
  const selectedBankType = 'krungsri'

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
        <div className="row my-4">
          <div className="col d-flex justify-content-center">
            <ResponsiveIcon
              icon={{ x1: TransferTo, x2: TransferTo2x, x3: TransferTo3x }}
              alt="transfer-to"
              className="transfer-to-icon"
            />
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <BankNumberCard
              bankNumber={selectedBankNumber}
              bankName={selectedBankName}
              bankType={selectedBankType}
            />
          </div>
        </div>
        <div className="row pt-5">
          <div className="col input-header-title">{constants.amountTitle}</div>
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
        <div className="row pt-3">
          <div className="col input-header-title">
            {constants.depositTimeTitle}<span>{constants.timeRemarkTitle}</span>
          </div>
        </div>
        <div className="row">
          <InputText
            useNumberpad
            name="depositHours"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.depositHours}
            errorMessage={errors.depositHours}
            placeholder={constants.placeholdeHours}
            error={!!errors.depositHours && touched.depositHours}
          />
          <InputText
            useNumberpad
            name="depositMinuite"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.depositMinuite}
            errorMessage={errors.depositMinuite}
            placeholder={constants.placeholdeMinuite}
            error={!!errors.depositMinuite && touched.depositMinuite}
          />
        </div>
        <div className="row pt-3">
          <div className="col input-header-title">
            {constants.remarkTitle}
          </div>
        </div>
        <div className="row">
          <InputText
            useNumberpad
            name="remark"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.remark}
            errorMessage={errors.remark}
            placeholder={constants.placeholdeRemark}
            error={!!errors.remark && touched.remark}
          />
        </div>
        <div className="row pt-4">
          <div className="col">
            <Button
              buttonType="submit"
              disabled={!isValid}
              text={constants.buttonFinish}
            />
          </div>
        </div>
        <div className="row pt-3">
          <div className="col text-center">
            <ALink
              onClick={onPressCancel}
              text={constants.buttonCancel}
              fontSize={18}
              color="#bb130a"
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

DepositStep2.defaultProps = defaultProps

export default DepositStep2