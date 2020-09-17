import React, { FC } from 'react'
import {
  ALink,
  Button,
  InputSelect,
  InputNumber,
  SelectorItem,
} from 'components'
import { noop, isEmpty, get } from 'lodash'
import { FormikProps, Form } from 'formik'
import ImageBankSet from 'assets/images/global/bank'
import colors from 'constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronCircleRight, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'

const constants = {
  backText: 'ย้อนกลับ',
  depositTitle: 'ฝาก',
  depositSubTitle: 'ขั้นตอนที่ 1',
  depositDescription: '* กรุณาใช้บัญชีนี้โอนเงินเข้ามาเท่านั้น',
  transferToLabel: 'โอนให้',
  placeholderOriginBank: 'กรุณาเลือกบัญชีธนาคาร',
  selectBankText: 'เลือกธนาคารที่ต้องการโอนเข้า',
  amountLabel: 'จำนวนเงินฝาก',
  noMinimum: 'ไม่มีฝากขั้นต่ำ',
  placeholdeAmount: 'ระบุจำนวนเงินฝาก',
  buttonNextStep: 'ถัดไป',
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
  FC<FormikProps<IDepositForm> & IDepositFormProps<{ banks: IBank[]; userBank: IBank }> & DefaultProps> = (props) => {

    const {
      values,
      errors,
      touched,
      setFieldValue,
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

    const userBank = get(extraProps, 'userBank', {})
    const userBankId = get(userBank, 'id', 0)
    const defaultSelectorList: IBank[] = [userBank]

    const renderBankOption = ({ item, ...selectProps }: IInputDefaultSelectProps<IBank>): JSX.Element => {
      const ImageIcon = get(ImageBankSet, `${item.type}.Icon`, '')
      return (
        <SelectorItem
          icon={ImageIcon}
          title={item.name || ''}
          subTitle={item.number}
          {...selectProps}
        />
      )
    }


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
                    <InputSelect<IBank, number>
                      name="userBank"
                      backgroundColor={colors.PRIMARY_BG}
                      backgroundHoverColor={colors.SECONDARY_BG}
                      items={defaultSelectorList}
                      valueKey="id"
                      value={userBankId}
                      placeholder={constants.placeholderOriginBank}
                      RenderSelected={renderBankOption}
                    />
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
                    <InputSelect<IBank, number>
                      name="webBankId"
                      backgroundColor={colors.PRIMARY_BG}
                      backgroundHoverColor={colors.SECONDARY_BG}
                      items={extraProps?.banks}
                      valueKey="id"
                      value={values.webBankId}
                      onChange={(selected, name) => setFieldValue(name, selected.id)}
                      placeholder={constants.selectBankText}
                      RenderSelected={renderBankOption}
                    />
                  </div>
                </div>
                <div className="row m3-t">
                  <div className="col">
                    <h6 className="secondary-blue-text m1-b">
                      {constants.amountLabel}<span className="m1-l secondary-text">({constants.noMinimum})</span>
                    </h6>
                    <InputNumber
                      allowNegative={false}
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
                    id="deposit-step-1-submit-button"
                    disabled={!!errors.webBankId || values.webBankId <= 0
                      || !!errors.money || isEmpty(values.money)}
                    text={constants.buttonNextStep}
                    onClick={handleNextStep}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form >
    )
  }

DepositStep1.defaultProps = defaultProps

export default DepositStep1