import React, { Component } from 'react'
import { FormikProps, Formik } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
import { WithdrawForm } from './components'
import './withdraw.style.scss'

class Withdraw extends Component<RouteComponentProps> {

  onSubmitWithdraw = (values: IWithdraw) => {
    // console.log(values)
  }

  onCancelHandler = () => {
    this.props.history.goBack()
  }

  renderWithdrawForm = () => {
    const WithdrawFormComponent = (formProps: FormikProps<IWithdraw>) => (
      <WithdrawForm
        {...formProps}
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