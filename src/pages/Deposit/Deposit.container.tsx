import React, { Component } from 'react'
import { noop } from 'lodash'
import { FormikProps, Formik } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import response from 'constants/response'
import { Modal } from 'components'
import { date } from 'utils'
import { DepositStep1, DepositStep2 } from './components'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
import './deposit.style.scss'

// TODO Counting doown time

const constants = {
  ok: 'ตกลง',
  gotoMain: 'รายการฝาก - ถอน',
  requestedSuccess: 'กรุณารอการตรวจสอบสักครู่',
}
type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IDepositProps & IDepositActionProps = {
  user: {},
  loader() { noop() },
  getBankList() { noop() },
  bankList: [],
  getBankListCode: 0,
  getBankListError: '',
  getBankListIsFetching: false,
  depositRequest() { noop() },
  depositRequestResult: {},
  depositRequestCode: 0,
  depositRequestError: '',
  depositRequestIsFetching: false,
}

class DepositContainer extends
  Component<IDepositProps & IDepositActionProps & DefaultProps & RouteComponentProps, IDepositStates> {

  static defaultProps = defaultProps

  state: IDepositStates = {
    currentStep: 1,
  }

  componentDidMount() {
    this.props.loader(true)
    this.props.getBankList()
  }

  componentDidUpdate(prevProps: IDepositProps) {
    if (prevProps.getBankListIsFetching !== this.props.getBankListIsFetching && !this.props.getBankListIsFetching) {
      this.props.loader(false)
    }
    if (prevProps.depositRequestIsFetching !== this.props.depositRequestIsFetching
      && !this.props.depositRequestIsFetching) {
      if (this.props.depositRequestCode === response.OK) {
        Modal.success.show({
          action: () => {
            this.props.history.replace('/transaction')
            Modal.success.hide()
          },
          actionText: constants.gotoMain,
          description: constants.requestedSuccess,
        })
      } else {
        Modal.error.show({
          action: Modal.error.hide,
          description: this.props.depositRequestError,
          actionText: constants.ok,
        })
      }
      this.props.loader(false)
    }
  }

  onSubmitDeposit = (values: IDepositForm) => {
    const castedValue = scheme.cast(values)
    const depositRequestValues: IDepositRequest = {
      money: castedValue.money,
      depositTime: date.convertTimeToMoment(castedValue.depositHours, castedValue.depositMinutes).toISOString(),
      description: castedValue.description || '-',
      webBankId: Number(castedValue.webBankId),
    }
    this.props.loader(true)
    this.props.depositRequest(depositRequestValues)
  }

  onNextStepHandler = (targetStep: number) => () => {
    this.setState({ currentStep: targetStep })
  }

  onBackStepHandler = (step: number) => {
    if (step === 2) {
      return this.setState({ currentStep: 1 })
    }
    return this.props.history.goBack()
  }

  onCancelHandler = () => {
    this.props.history.goBack()
  }

  renderDepositForm = () => {
    const DepositFormComponent = (formProps: FormikProps<IDepositForm>) => {
      if (this.state.currentStep === 1) {
        return (
          <DepositStep1
            {...formProps}
            extraProps={{ banks: this.props.bankList, userBank: this.props.user.bank! }}
            onBackStep={this.onBackStepHandler}
            onConfirmPresses={this.onNextStepHandler(2)}
          />
        )
      } else if (this.state.currentStep === 2) {

        return (
          <DepositStep2
            {...formProps}
            extraProps={{ banks: this.props.bankList, userBank: this.props.user.bank! }}
            onBackStep={this.onBackStepHandler}
            onCancelPresses={this.onCancelHandler}
          />
        )
      }
      return (<DepositStep1 {...formProps} />)
    }

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={scheme}
        enableReinitialize
        onSubmit={this.onSubmitDeposit}
      >
        {DepositFormComponent}
      </Formik>
    )
  }

  render() {
    const DepositFormComponent = this.renderDepositForm
    return (
      <div className="deposit-container container">
        <DepositFormComponent />
      </div>
    )
  }
}

export default DepositContainer