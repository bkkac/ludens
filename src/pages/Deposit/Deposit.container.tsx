import React, { Component } from 'react'
import { noop, isEmpty, get } from 'lodash'
import { FormikProps, Formik } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import response from 'constants/response'
import { Modal } from 'components'
import { date } from 'utils'
import { DepositStep1, DepositStep2 } from './components'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
import './deposit.style.scss'

const constants = {
  ok: 'ตกลง',
  gotoMain: 'รายการฝาก - ถอน',
  requestedSuccess: 'กรุณารอการตรวจสอบสักครู่',
  pleaseTryAgain: 'โปรดลองใหม่อีกครั้ง',
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
  getTransactionRequest() { noop() },
  signTransactionRequest() { noop() },
  transactionRequest: {},
  transactionRequestCode: 0,
  transactionRequestError: '',
  transactionRequestIsFetching: false,
  cancelingTransactionRequest() { noop() },
  transactionCancel: {},
  transactionCancelCode: 0,
  transactionCancelError: '',
  transactionCancelIsFetching: false,
}

class DepositContainer extends
  Component<IDepositProps & IDepositActionProps & DefaultProps & RouteComponentProps, IDepositStates> {

  static defaultProps = defaultProps

  state: IDepositStates = {
    currentStep: 1,
    initialFormValue: initialValues,
  }

  componentDidMount() {
    this.props.getBankList()
    this.props.getTransactionRequest()
    this.props.loader(true)
  }

  componentDidUpdate(prevProps: IDepositProps) {
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

    // Request
    if (prevProps.transactionRequestIsFetching !== this.props.transactionRequestIsFetching
      && !this.props.transactionRequestIsFetching) {
      this.props.loader(false)
      if (this.props.transactionRequestCode === response.OK) {
        if (!isEmpty(this.props.transactionRequest)) {
          const { money, webBank } = this.props.transactionRequest
          this.setState({
            currentStep: 2,
            initialFormValue: {
              ...this.state.initialFormValue,
              money: String(money),
              webBankId: webBank?.id || 0,
            },
          })
        }
      } else if (this.props.depositRequestCode === response.REQUEST_TIMEOUT) {
        // TODO: when before transaction timeout
      } else if (this.props.transactionRequestCode === response.NOT_FOUND) {
        // TODO: when never transaction request before
      } else {
        Modal.error.show({
          action: () => { Modal.error.hide(); return this.props.history.goBack(); },
          description: `${this.props.transactionRequestError} ${constants.pleaseTryAgain}`,
          actionText: constants.ok,
        })
      }
    }

    // Cancel
    if (prevProps.transactionCancelIsFetching !== this.props.transactionCancelIsFetching
      && !this.props.transactionCancelIsFetching) {
      this.props.loader(false)
      if (this.props.transactionCancelCode === response.OK) {
        const webBankId = get(this.props.transactionRequest, 'webBank.id', 0)
        this.setState({
          currentStep: 1,
          initialFormValue: {
            ...this.state.initialFormValue,
            webBankId,
            money: '',
          },
        })
      } else {
        Modal.error.show({
          action: () => { Modal.error.hide(); return this.props.history.goBack(); },
          description: `${this.props.transactionRequestError} ${constants.pleaseTryAgain}`,
          actionText: constants.ok,
        })
      }
    }

    if (prevProps.getBankListIsFetching !== this.props.getBankListIsFetching
      && !this.props.getBankListIsFetching) {
      if (this.props.getBankListCode === response.OK) {
        if (this.props.bankList.length > 0) {
          if (this.state.initialFormValue.webBankId <= 0) {
            const webBankId = get(this.props.bankList, '0.id', 0)
            this.setState({
              initialFormValue: { ...this.state.initialFormValue, webBankId },
            })
          }
        }
      }
    }
  }

  onSubmitDeposit = (values: IDepositForm) => {
    const castedValue = scheme.cast(values)
    const depositRequestValues: IDepositRequest = {
      money: castedValue.money,
      depositTime: date.convertTimeToMoment(castedValue.depositHours, castedValue.depositMinutes).toISOString(),
      description: castedValue.description || '-',
      webBankId: castedValue.webBankId,
    }
    this.props.loader(true)
    this.props.depositRequest(depositRequestValues)
  }

  onNextStepHandler = (values: IDepositForm) => {
    const castedValue = scheme.cast(values)
    this.props.loader(true)
    this.props.signTransactionRequest({
      webBankId: castedValue.webBankId,
      money: castedValue.money,
    })
  }

  onBackStepHandler = (step: number) => {
    if (step === 2) {
      return this.setState({ currentStep: 1 })
    }
    return this.props.history.goBack()
  }

  onCancelHandler = () => {
    const transactionRequestId = get(this.props.transactionRequest, 'id', 0)
    this.props.loader(true)
    this.props.cancelingTransactionRequest(transactionRequestId)
  }

  renderDepositForm = () => {
    const DepositFormComponent = (formProps: FormikProps<IDepositForm>) => {
      if (this.state.currentStep === 1) {
        const { bankList, user } = this.props
        const userBank: IBank = get(user, 'bank', {})
        return (
          <DepositStep1
            {...formProps}
            extraProps={{ banks: bankList, userBank }}
            onBackStep={this.onBackStepHandler}
            onConfirmPresses={this.onNextStepHandler}
          />
        )
      } else if (this.state.currentStep === 2) {
        return (
          <DepositStep2
            {...formProps}
            extraProps={{ requestedTransaction: this.props.transactionRequest }}
            onBackStep={this.onBackStepHandler}
            onCancelPresses={this.onCancelHandler}
          />
        )
      }
      return (<DepositStep1 {...formProps} />)
    }

    return (
      <Formik
        initialValues={this.state.initialFormValue}
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
      <div className="deposit-container primary-bg">
        <div className="container">
          <DepositFormComponent />
        </div>
      </div>
    )
  }
}

export default DepositContainer