import React, { SFC, useEffect, useState } from 'react'
import {
  ALink,
  Button,
  InputText,
  InputNumber,
  ResponsiveIcon,
  BankNumberCard,
} from 'components'
import moment from 'moment'
import { number } from 'utils'
import { noop, replace } from 'lodash'
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
  remainingTime: 'คุณมีเวลาโอนเงินภายใน 10 นาที',
}


type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IDepositFormProps<{ requestedTransaction: ITransactionRequest }> = {
  onCancelPresses() { noop() },
  onBackStep() { noop() },
}

const CURRENT_STEP = 2

const DepositStep2:
  SFC<FormikProps<IDepositForm>
    & IDepositFormProps<{ requestedTransaction: ITransactionRequest }> & DefaultProps> = (props) => {

      let intervalId: NodeJS.Timeout | null = null

      const {
        values,
        errors,
        touched,
        isValid,
        handleBlur,
        handleChange,
        onBackStep,
        onCancelPresses,
        setValues,
        setErrors,
        setTouched,
        extraProps,
      } = props

      const [remain, setRemain] = useState({ minutes: 0, seconds: 0 })

      const clearLocalInterval = () => {
        if (intervalId !== null) {
          clearInterval(intervalId)
        }
      }

      const countingdown = () => {
        const LIMIT_TIME = 10
        const LIMIT_UNIT = 'minutes'
        const createAt = moment(replace(extraProps?.requestedTransaction.createdAt!, /\s/g, ''))
        const timeRange = createAt.clone().add(LIMIT_TIME, LIMIT_UNIT)

        intervalId = setInterval(() => {
          const duration = moment.duration(timeRange.diff(moment()))
          const minutes = duration.minutes()
          const seconds = duration.seconds()

          if (minutes <= 0 && seconds < 0) {
            clearLocalInterval()
          } else if (isNaN(minutes) || isNaN(seconds)) {
            setRemain({ minutes: 0, seconds: 0 })
            clearLocalInterval()
          } else {
            setRemain({ minutes, seconds })
          }

        }, 1000);
      }

      useEffect(() => {
        countingdown()
        return clearLocalInterval
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      const onPressBack = () => {
        setValues({
          ...values,
          depositHours: '',
          depositMinutes: '',
          description: '',
          money: '',
        })
        setErrors({
          ...errors,
          depositHours: '',
          depositMinutes: '',
          description: '',
          money: '',
        })
        setTouched({
          ...touched,
          depositHours: false,
          depositMinutes: false,
          description: false,
          money: false,
        })
        onBackStep!(CURRENT_STEP)
      }

      const onPressCancel = () => {
        onCancelPresses!()
      }

      const handleOnPressBankAccount = (bankNumber: string) => {
        document.execCommand(bankNumber)
        // TODO: Coppy
      }

      const remainingDepositTime = `${number.padNumber(String(remain.minutes), 2)} : ${number.padNumber(String(remain.seconds), 2)}`

      return (
        <Form>
          <div className="deposit-form-wrapper mb-5">
            <div className="row">
              <div className="col">
                <ALink color="#ff9b96" bold onClick={onPressBack} >{constants.backText}</ALink>
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
                <BankNumberCard bank={extraProps?.requestedTransaction.userBank!} />
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
                <BankNumberCard bank={extraProps?.requestedTransaction.webBank!} onClick={handleOnPressBankAccount} />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
                <div className="remaining-time-deposit-label">{constants.remainingTime}</div>
                <div className="remaining-time-deposit">{remainingDepositTime}</div>
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
              <InputNumber
                format="##"
                decimalScale={0}
                allowLeadingZeros
                name="depositHours"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.depositHours}
                errorMessage={errors.depositHours}
                placeholder={constants.placeholdeHours}
                error={!!errors.depositHours && touched.depositHours}
              />
              <InputNumber
                format="##"
                decimalScale={0}
                allowLeadingZeros
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
                  fontSize={18}
                  color="#bb130a"
                >{constants.buttonCancel}
                </ALink>
              </div>
            </div>
          </div>
        </Form>
      )
    }

DepositStep2.defaultProps = defaultProps

export default DepositStep2