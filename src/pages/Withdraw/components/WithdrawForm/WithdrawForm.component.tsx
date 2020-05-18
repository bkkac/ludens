import React, { SFC } from 'react'
import { noop } from 'lodash'
import { FormikProps, Form } from 'formik'
import {
  ALink,
  Button,
  InputText,
  InputNumber,
  ResponsiveIcon,
  BankNumberCard,
  CreditAmountCard,
} from 'components'
import TransferTo from 'assets/images/deposit/transferTo/transferTo.png'
import TransferTo2x from 'assets/images/deposit/transferTo/transferTo@2x.png'
import TransferTo3x from 'assets/images/deposit/transferTo/transferTo@3x.png'
import './withdrawForm.style.scss'

const constants = {
  backText: '< ย้อนกลับ',
  withdrawTitle: 'ถอน',
  buttonFinish: 'แจ้งถอนเงิน',
  buttonCancel: 'ยกเลิกรายการ',
  placeholdeAmount: 'จำนวนเงินถอน',
  placeholdeRemark: 'หมายเหตุ',
  amountTitle: 'ระบุจำนวนเงินถอน',
  minimumAmount: '(ถอนขั้นต่ำ 100 บาทขึ้นไป)',
  remarkTitle: 'หมายเหตุ',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IWithdrawFormProps<{ userBank: IBank; wallet: IWallet }> = {
  onBackPresses() { noop() },
  onCancelPresses() { noop() },
  extraProps: {
    userBank: {},
    wallet: {},
  },
}

const WithdrawForm:
  SFC<FormikProps<IWithdraw> & IWithdrawFormProps<{ userBank: IBank; wallet: IWallet }> & DefaultProps> = (props) => {

    const {
      values,
      errors,
      touched,
      isValid,
      handleBlur,
      handleChange,
      onBackPresses,
      onCancelPresses,
      extraProps,
    } = props

    const onPressBack = () => {
      onBackPresses!()
    }

    const onPressCancel = () => {
      onCancelPresses!()
    }

    return (
      <Form>
        <div className="withdraw-form-wrapper mb-5">
          <div className="row">
            <div className="col">
              <ALink text={constants.backText} color="#ff9b96" bold onClick={onPressBack} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="withdraw-title">{constants.withdrawTitle}</div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col d-flex justify-content-center">
              <CreditAmountCard creditAmount={extraProps?.wallet.money!} />
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
              <BankNumberCard bank={extraProps?.userBank!} />
            </div>
          </div>
          <div className="row pt-5">
            <div className="col input-header-title">
              {constants.amountTitle}<span>{constants.minimumAmount}</span>
            </div>
          </div>
          <div className="row">
            <InputNumber
              thousandSeparator
              decimalScale={0}
              name="money"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.money}
              errorMessage={errors.money}
              placeholder={constants.placeholdeAmount}
              error={!!errors.money && touched.money}
            />
          </div>
          <div className="row pt-3">
            <div className="col input-header-title">
              {constants.remarkTitle}
            </div>
          </div>
          <div className="row">
            <InputText
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              errorMessage={errors.description}
              placeholder={constants.placeholdeRemark}
              error={!!errors.description && touched.description}
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

WithdrawForm.defaultProps = defaultProps

export default WithdrawForm