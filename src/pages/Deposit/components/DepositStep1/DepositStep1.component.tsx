import React, { SFC } from 'react'
import {
  ALink,
  Button,
  InputNumber,
  BankNumberCard,
  InputRadioImage,
} from 'components'
import { noop, isEqual, isEmpty } from 'lodash'
import { FormikProps, Form } from 'formik'
import BankImageSet from 'assets/images/global/bank'
import './depositStep1.style.scss'

const constants = {
  backText: '< ย้อนกลับ',
  depositTitle: 'ฝาก',
  depositDescription: '* กรุณาใช้บัญชีนี้โอนเงินเข้ามาเท่านั้น',
  buttonNextStep: 'ต่อไป',
  selectBankText: 'เลือกธนาคารที่ต้องการโอนเข้า',
  placeholdeAmount: 'ระบุจำนวนเงิน',
  amountTitle: 'ระบุจำนวนเงินฝาก',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IDepositFormProps<{ banks: IBank[]; userBank: IBank }> = {
  onConfirmPresses() { noop() },
  onBackStep() { noop() },
  extraProps: {
    banks: [],
    userBank: {},
  },
}

const CURRENT_STEP = 1

const DepositStep1:
  SFC<FormikProps<IDepositForm> & IDepositFormProps<{ banks: IBank[]; userBank: IBank }> & DefaultProps> = (props) => {

    const {
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      onConfirmPresses,
      onBackStep,
      extraProps,
    } = props

    const onPressBack = () => {
      onBackStep!(CURRENT_STEP)
    }

    const handleNextStep = () => {
      onConfirmPresses!(values)
    }

    const RenderBankList = (): JSX.Element => {
      const RadioImages = extraProps?.banks.map((bank, index) => {
        console.log(bank.type)
        return (
          <div className="col-3 col-sm-3 col-md-2 col-lg-1 mt-2" key={`bank-${index}-${bank.type}`}>
            <InputRadioImage
              image={BankImageSet[bank.type!].Icon}
              name="webBankId"
              alt={bank.type}
              value={`${bank.id}`}
              onBlur={handleBlur}
              onChange={handleChange}
              checked={isEqual(values.webBankId, `${bank.id}`)}
            />
          </div>
        )
      })

      return (<>{RadioImages}</>)
    }

    return (
      <Form>
        <div className="deposit-form-wrapper mb-5">
          <div className="row">
            <div className="col">
              <ALink color="#ff9b96" bold onClick={onPressBack}>{constants.backText}</ALink>
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
              <BankNumberCard bank={extraProps?.userBank!} />
            </div>
          </div>
          <div className="row pt-5 flex-column">
            <div className="col select-bank-header">{constants.selectBankText}</div>
          </div>
          <div className="row pt-3">
            <RenderBankList />
          </div>
          <div className="row pt-5">
            <div className="col select-bank-header">{constants.amountTitle}</div>
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
          <div className="row pt-4">
            <div className="col">
              <Button
                disabled={!!errors.webBankId || isEmpty(values.webBankId)
                  || !!errors.money || isEmpty(values.money)}
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