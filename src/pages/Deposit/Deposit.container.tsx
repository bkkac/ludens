import React, { Component } from 'react'
import { FormikProps, Formik } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import { DepositStep1, DepositStep2 } from './components'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
import './deposit.style.scss'

class DepositContainer extends Component<IDepositProps & RouteComponentProps, IDepositStates> {

  state: IDepositStates = {
    currentStep: 1,
  }

  onSubmitDeposit = (values: IDeposit) => {
    // console.log(values)
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
    const DepositFormComponent = (formProps: FormikProps<IDeposit>) => {
      if (this.state.currentStep === 1) {
        return (
          <DepositStep1
            {...formProps}
            onBackStep={this.onBackStepHandler}
            onConfirmPresses={this.onNextStepHandler(2)}
          />
        )
      } else if (this.state.currentStep === 2) {
        return (
          <DepositStep2
            {...formProps}
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