import React, { Component } from 'react'
import { Formik, FormikProps } from 'formik'
import {
  RegisterStep1,
  RegisterStep2,
  RegisterStep3,
  RegisterStep4,
} from './components'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
import './register.style.scss'

interface IRegisterState {
  currentStep: number
  activePhoneNumber: boolean
}

// Temporary FormikValues
class RegisterContainer extends Component<{}, IRegisterState> {

  state: IRegisterState = {
    currentStep: 1,
    activePhoneNumber: false,
  }

  onSubmitLogin = (values: IRegister) => {
    console.log(values)
  }

  onNextStepPresses = (currentStep: number) => {
    this.setState({ currentStep: currentStep + 1 })
  }

  renderRegisterForm = () => {
    const RegisterFormComponent = (formProps: FormikProps<IRegister>) => {
      if (this.state.currentStep <= 1) {
        return <RegisterStep1 {...formProps} onConfirmPresses={this.onNextStepPresses} />
      } else if (this.state.currentStep === 2) {
        return <RegisterStep2 {...formProps} onConfirmPresses={this.onNextStepPresses} />
      } else if (this.state.currentStep === 3) {
        return <RegisterStep3 {...formProps} onConfirmPresses={this.onNextStepPresses} />
      } else if (this.state.currentStep >= 4) {
        return <RegisterStep4 {...formProps} onConfirmPresses={this.onNextStepPresses} />
      }
    }

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={scheme}
        enableReinitialize
        onSubmit={this.onSubmitLogin}
      >
        {RegisterFormComponent}
      </Formik>
    )
  }

  render() {
    const RegisterComponent = this.renderRegisterForm
    return (
      <div className="container register-container">
        <RegisterComponent />
      </div>
    )
  }
}

export default RegisterContainer