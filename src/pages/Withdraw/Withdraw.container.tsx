import React, { Component } from 'react'
import { noop } from 'lodash'
import { FormikProps, Formik } from 'formik'
import response from 'constants/response'
import { Modal } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
import { WithdrawForm } from './components'
import './withdraw.style.scss'

const constants = {
  ok: 'ตกลง',
  gotoMain: 'รายการฝาก - ถอน',
  requestedSuccess: 'กรุณารอการตรวจสอบสักครู่',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IWithdrawProps & IWithdrawActionProps = {
  user: {},
  loader() { noop() },
  withdrawRequest() { noop() },
  withdrawRequestResult: {},
  withdrawRequestCode: 0,
  withdrawRequestError: '',
  withdrawRequestIsFetching: false,
}

class Withdraw extends Component<IWithdrawProps & IWithdrawActionProps & DefaultProps & RouteComponentProps> {

  componentDidUpdate(prevProps: IWithdrawProps) {
    if (prevProps.withdrawRequestIsFetching !== this.props.withdrawRequestIsFetching
      && !this.props.withdrawRequestIsFetching) {
      if (this.props.withdrawRequestCode === response.OK) {
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
          description: this.props.withdrawRequestError,
          actionText: constants.ok,
        })
      }
      this.props.loader(false)

    }
  }

  onSubmitWithdraw = (values: IWithdraw) => {
    const castedValue = scheme.cast(values)
    const withdrawRequestValue: IWithdrawRequest = {
      money: castedValue.money,
      description: castedValue.description || '-',
    }
    this.props.loader(true)
    this.props.withdrawRequest(withdrawRequestValue)
  }

  onCancelHandler = () => {
    this.props.history.goBack()
  }

  renderWithdrawForm = () => {
    const WithdrawFormComponent = (formProps: FormikProps<IWithdraw>) => (
      <WithdrawForm
        {...formProps}
        extraProps={{ userBank: this.props.user.bank!, wallet: this.props.user.wallet! }}
        onBackPresses={this.onCancelHandler}
        onCancelPresses={this.onCancelHandler}
      />
    )

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={scheme}
        enableReinitialize
        onSubmit={this.onSubmitWithdraw}
      >
        {WithdrawFormComponent}
      </Formik>
    )
  }

  render() {
    const WithdrawFormComponent = this.renderWithdrawForm
    return (
      <div className="withdraw-container container">
        <WithdrawFormComponent />
      </div>
    )
  }
}

export default Withdraw