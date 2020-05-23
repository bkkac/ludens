import React, { SFC } from 'react'
import {
  ALink,
  Button,
  InputText,
  ResponsiveIcon,
  BankNumberCard,
} from 'components'
import { noop, find } from 'lodash'
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
  placeholdeDate: 'วันที่',
  placeholdeMonth: 'เดือน',
  placeholdeYear: 'ปี(ค.ศ.)',
  placeholdeHours: 'ชั่วโมง',
  placeholdeMinuite: 'นาที',
  placeholdeRemark: 'หมายเหตุ',
  amountTitle: 'ระบุจำนวนเงินฝาก',
  depositTimeTitle: 'ระบุเวลาฝาก',
  timeRemarkTitle: '(กรุณาใส่เวลาฝากตามสลิปการโอน)',
  remarkTitle: 'หมายเหตุ',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IDepositFormProps<{ userBank: IBank; banks: IBank[] }> = {
  onCancelPresses() { noop() },
  onBackStep() { noop() },
}

const CURRENT_STEP = 2

const DepositStep2:
  SFC<FormikProps<IDepositForm> & IDepositFormProps<{ userBank: IBank; banks: IBank[] }> & DefaultProps> = (props) => {

    const {
      values,
      errors,
      touched,
      isValid,
      handleBlur,
      handleChange,
      onBackStep,
      onCancelPresses,
      extraProps,
    } = props

    const ownBank = find(extraProps?.banks, (value) => value.id === Number(values.webBankId))

    const onPressBack = () => {
      onBackStep!(CURRENT_STEP)
    }

    const onPressCancel = () => {
      onCancelPresses!()
    }

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
              <BankNumberCard bank={extraProps?.userBank!} />
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
              <BankNumberCard bank={ownBank!} />
            </div>
          </div>
          <div className="row pt-5">
            <div className="col input-header-title">{constants.amountTitle}</div>
          </div>
          <div className="row">
            <InputText
              disabled
              useNumberpad
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
              {constants.depositTimeTitle}<span>{constants.timeRemarkTitle}</span>
            </div>
          </div>
          <div className="row">
            <InputText
              useNumberpad
              name="depositDate"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.depositDate}
              errorMessage={errors.depositDate}
              placeholder={constants.placeholdeDate}
              error={!!errors.depositDate && touched.depositDate}
            />
            <InputText
              useNumberpad
              name="depositMonth"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.depositMonth}
              errorMessage={errors.depositMonth}
              placeholder={constants.placeholdeMonth}
              error={!!errors.depositMonth && touched.depositMonth}
            />
            <InputText
              useNumberpad
              name="depositYear"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.depositYear}
              errorMessage={errors.depositYear}
              placeholder={constants.placeholdeYear}
              error={!!errors.depositYear && touched.depositYear}
            />
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
              name="depositMinutes"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.depositMinutes}
              errorMessage={errors.depositMinutes}
              placeholder={constants.placeholdeMinuite}
              error={!!errors.depositMinutes && touched.depositMinutes}
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

DepositStep2.defaultProps = defaultProps

export default DepositStep2