import React, { SFC, useEffect, useState } from 'react'
import {
  ALink,
  Button,
  InputText,
  InputNumber,
  SelectorItem,
  AlertNotification,
} from 'components'
import moment from 'moment'
import { number } from 'utils'
import { noop, replace, get } from 'lodash'
import { FormikProps, Form } from 'formik'
import copy from 'copy-to-clipboard'
import ImageBankSet from 'assets/images/global/bank'
import colors from 'constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronCircleRight, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'

const constants = {
  backText: 'กลับ',
  depositTitle: 'ฝาก',
  depositSubTitle: 'ขั้นตอนสุดท้าย',
  transferToLabel: 'โอนให้',
  depositDescription: '* กรุณาใช้บัญชีนี้โอนเงินเข้ามาเท่านั้น',
  buttonFinish: 'แจ้งโอนเงิน',
  buttonCancel: 'ยกเลิกรายการ',
  placeholdeAmount: 'ระบุจำนวนเงินฝาก',
  labelAmount: 'จำนวนเงินฝาก',
  placeholdeHours: 'ระบุชั่วโมง',
  placeholdeMinuite: 'ระบุนาที',
  labelDepositTime: 'เวลาฝาก ตามสลิปโอนเงิน',
  placeholdeRemark: 'ระบุหมายเหตุ',
  labelRemark: 'หมายเหตุ',
  remainingTime: 'คุณมีเวลาโอนเงินภายใน 10 นาที',
  selectBank: 'เลือกธนาคาร',
  copy: 'คัดลอก',
  copied: 'คัดลอก.',
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
        clearLocalInterval()
        const LIMIT_TIME = 10
        const LIMIT_UNIT = 'minutes'
        const createdAtTimeString = get(extraProps, 'requestedTransaction.createdAt', '')
        const createAt = moment(replace(createdAtTimeString, /\s/g, ''))
        const timeRange = createAt.clone().add(LIMIT_TIME, LIMIT_UNIT)

        intervalId = setInterval(() => {
          const duration = moment.duration(timeRange.diff(moment()))
          const minutes = duration.minutes()
          const seconds = duration.seconds()

          if (minutes <= 0 && seconds < 0) {
            clearLocalInterval()
            onPressBack()
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

      const handleOnCopy = (bankNumber: string) => {
        copy(bankNumber)
        AlertNotification.show({ text: constants.copied, countdown: true })
      }

      const userBank: IBank = get(extraProps, 'requestedTransaction.userBank', {})
      const userBankType: TBankType | undefined = get(userBank, 'type', undefined)
      const userBankIcon = get(ImageBankSet, `${userBankType}.Icon`, '')
      const userBankName = get(userBank, 'name', '')
      const userBankNumber = get(userBank, 'number', '')

      const webBank: IBank = get(extraProps, 'requestedTransaction.webBank', {})
      const webBankType: TBankType | undefined = get(webBank, 'type', undefined)
      const webBankIcon = get(ImageBankSet, `${webBankType}.Icon`, '')
      const webBankName = get(webBank, 'name', '')
      const webBankNumber = get(webBank, 'number', '')

      const remainingDepositTime = `${number.padNumber(String(remain.minutes), 2)} : ${number.padNumber(String(remain.seconds), 2)}`

      return (
        <Form>
          <div>
            <div className="row">
              <div className="col">
                <ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={onPressBack}>
                  <FontAwesomeIcon icon={faChevronLeft} className="m1-r" />
                  {constants.backText}
                </ALink>
              </div>
            </div>
            <div className="row m4-t">
              <div className="col">
                <h2>
                  {constants.depositTitle}
                  <span className="subtitle-2 secondary-red-text m1-l">{constants.depositSubTitle}</span>
                </h2>
              </div>
            </div>
            <div className="row m2-t">
              <div className="col-12 col-md-5 col-lg-4 mt-3">
                <div className="deposit-form-wrapper secondary-bg p2">
                  <div className="row">
                    <div className="col">
                      <h6 className="subtitle-2 secondary-red-text m1-b">{constants.depositDescription}</h6>
                      <div className="copy-able-wrapper primary-bg">
                        <SelectorItem
                          icon={userBankIcon}
                          title={userBankName}
                          subTitle={userBankNumber}
                          isDisplaying
                          backgroundColor={colors.PRIMARY_BG}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-1 col-lg-1 mt-3">
                <div className="d-none d-md-flex vertical-chevron-icon">
                  <FontAwesomeIcon icon={faChevronCircleRight} className="secondary-blue-text" />
                </div>
                <div className="d-flex d-md-none horizontal-chevron-icon">
                  <FontAwesomeIcon icon={faChevronCircleDown} className="secondary-blue-text" />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-7 mt-3 ">
                <div className="deposit-form-wrapper secondary-bg p2">
                  <div className="row">
                    <div className="col">
                      <h6 className="secondary-blue-text m1-b">{constants.transferToLabel}</h6>
                      <div className="copy-able-wrapper primary-bg">
                        <SelectorItem
                          icon={webBankIcon}
                          title={webBankName}
                          subTitle={webBankNumber}
                          isDisplaying
                          backgroundColor={colors.PRIMARY_BG}
                        />
                        <div className="copy-button-wrapper">
                          <ALink
                            id="copy-webbank-number"
                            color={colors.PRIMARY_BLUE}
                            onClick={() => handleOnCopy(webBankNumber)}
                          >
                            {constants.copy}
                          </ALink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row m4-t">
                    <div className="col text-center">
                      <h6 className="subtitle-2 secondary-red-text">{constants.remainingTime}</h6>
                      <h1 className="secondary-red-text">{remainingDepositTime}</h1>
                    </div>
                  </div>
                  <div className="row m3-t">
                    <div className="col">
                      <h6 className="secondary-blue-text m1-b">{constants.labelAmount}</h6>
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
                  </div>
                  <div className="row">
                    <div className="col">
                      <h6 className="secondary-blue-text m1-b">{constants.labelDepositTime}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <InputNumber
                        format="##"
                        decimalScale={0}
                        allowLeadingZeros
                        name="depositHours"
                        onBlur={handleBlur}
                        allowNegative={false}
                        onChange={handleChange}
                        value={values.depositHours}
                        errorMessage={errors.depositHours}
                        placeholder={constants.placeholdeHours}
                        error={!!errors.depositHours && touched.depositHours}
                      />
                    </div>
                    <div className="col">
                      <InputNumber
                        format="##"
                        decimalScale={0}
                        allowLeadingZeros
                        name="depositMinutes"
                        onBlur={handleBlur}
                        allowNegative={false}
                        onChange={handleChange}
                        value={values.depositMinutes}
                        errorMessage={errors.depositMinutes}
                        placeholder={constants.placeholdeMinuite}
                        error={!!errors.depositMinutes && touched.depositMinutes}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <h6 className="secondary-blue-text m1-b">{constants.labelRemark}</h6>
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
                  </div>
                </div>
              </div>
            </div>
            <div className="row m2-t">
              <div className="col-12 col-md-6 col-lg-5" />
              <div className="col-12 col-md-6 col-lg-7 mt-3">
                <div className="row">
                  <div className="col">
                    <Button
                      id="deposit-step-2-submit-button"
                      buttonType="submit"
                      disabled={!isValid}
                      text={constants.buttonFinish}
                    />
                  </div>
                </div>
                <div className="row p2-t">
                  <div className="col text-center">
                    <ALink
                      id="cancel-goto-previus-page"
                      onClick={onPressCancel}
                      fontSize={18}
                      color={colors.PRIMARY_TEXT}
                    >{constants.buttonCancel}
                    </ALink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )
    }

DepositStep2.defaultProps = defaultProps

export default DepositStep2