import React, { SFC } from 'react'
import { noop } from 'lodash'
import { FormikProps, Form } from 'formik'
import {
  ALink,
  Button,
  InputText,
  CreditCard,
  InputNumber,
  InputSelect,
  SelectorItem,
} from 'components'
import ImageBankSet from 'assets/images/global/bank'
import colors from 'constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronCircleRight, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import './withdrawForm.style.scss'

const constants = {
  backText: 'กลับ',
  withdrawTitle: 'ถอน',
  buttonFinish: 'แจ้งถอนเงิน',
  buttonCancel: 'ยกเลิกรายการ',
  amountLabel: 'จำนวนเงินถอน',
  remarkLabel: 'หมายเหตุ',
  placeholdeBank: 'เลือกบัญชีธนาคาร',
  placeholdeAmount: 'ระบุจำนวนเงินถอน',
  placeholdeRemark: 'ระบุหมายเหตุ',
  minimumAmount: '(ถอนขั้นต่ำ 100 บาทขึ้นไป)',
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

    const defaultSelectorList: IBank[] = [extraProps?.userBank! || {}]

    const renderBankOption = ({ item, ...selectProps }: IInputDefaultSelectProps<IBank>): JSX.Element =>
      (
        <SelectorItem
          icon={ImageBankSet[item.type!].Icon}
          title={item.name || ''}
          subTitle={item.number}
          {...selectProps}
        />
      )

    return (
      <Form>
        <div className="m4-b">
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
              <h2>{constants.withdrawTitle}</h2>
            </div>
          </div>
          <div className="row m2-t">
            <div className="col-12 col-md-6 col-lg-4 mt-3">
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <CreditCard credit={extraProps?.wallet.money || 0} />
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
            <div className="col-12 col-md-5 col-lg-7 mt-3 ">
              <div className="withdraw-form-wrapper secondary-bg">
                <div className="row">
                  <div className="col">
                    <InputSelect<IBank, number>
                      name="bankType"
                      backgroundColor={colors.PRIMARY_BG}
                      backgroundHoverColor={colors.SECONDARY_BG}
                      items={defaultSelectorList}
                      valueKey="id"
                      value={extraProps?.userBank.id}
                      placeholder={constants.placeholdeBank}
                      RenderSelected={renderBankOption}
                    />
                  </div>
                </div>
                <div className="row m2-t">
                  <div className="col">
                    <h6 className="subtitle-2 secondary-blue-text">{constants.amountLabel}</h6>
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
                </div>
                <div className="row m1-t">
                  <div className="col">
                    <h6 className="subtitle-2 secondary-blue-text">{constants.remarkLabel}</h6>
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
            <div className="col-12 col-md-7 col-lg-5" />
            <div className="col-12 col-md-5 col-lg-7 mt-3">
              <div className="row">
                <div className="col">
                  <Button
                    id="withdraw-submit-button"
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
                    color={colors.PRIMARY_TEXT}
                  >
                    {constants.buttonCancel}
                  </ALink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    )
  }

WithdrawForm.defaultProps = defaultProps

export default WithdrawForm