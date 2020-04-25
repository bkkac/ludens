import React, { Component, createRef, RefObject } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Formik, FormikProps } from 'formik'
import { noop } from 'lodash'
import response from 'constants/response'
import {
  RegisterStep1,
  RegisterStep2,
  RegisterStep3,
  RegisterStep4,
} from './components'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
import './register.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IRegisterProps & IRegisterActionProps = {
  requestOTP() { noop() },
  requestOTPCode: 0,
  requestOTPError: '',
  requestOTPIsFetching: false,
  validateOTP() { noop() },
  validateOTPCode: 0,
  validateOTPError: '',
  validateOTPIsFetching: false,
  validateResult: false,
  register() { noop() },
  registerCode: 0,
  registerError: '',
  registerIsFetching: false,
  registerResult: null,
  loading() { noop() },
}
class RegisterContainer extends
  Component<IRegisterProps & IRegisterActionProps & DefaultProps & RouteComponentProps, IRegisterStates> {

  registerContainerRef: RefObject<HTMLDivElement> = createRef()

  state: IRegisterStates = {
    currentStep: 1,
    activePhoneNumber: false,
  }

  componentDidUpdate(prevProps: IRegisterProps, prevState: IRegisterStates) {
    if (prevState.currentStep !== this.state.currentStep) {
      this.registerContainerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
    }

    if (this.state.currentStep === 1) {
      if (prevProps.requestOTPIsFetching !== this.props.requestOTPIsFetching && !this.props.requestOTPIsFetching) {
        if (this.props.requestOTPCode === response.OK) {
          this.setState({ currentStep: 2 })
        } else {
          // TODO: Error handler
          alert(this.props.requestOTPError)
        }
      }
    } else if (this.state.currentStep === 2) {
      if (prevProps.validateOTPIsFetching !== this.props.validateOTPIsFetching && !this.props.validateOTPIsFetching) {
        if (this.props.validateOTPCode === response.OK && this.props.validateResult === true) {
          this.setState({ currentStep: 3 })
        } else {
          // TODO: Error handler
          alert('OTP ผิด')
        }
      }
    } else if (this.state.currentStep === 4) {
      if (prevProps.registerIsFetching !== this.props.registerIsFetching && !this.props.registerIsFetching) {
        if (this.props.registerCode === response.OK) {
          // TODO: handle if success
          alert('success')
          this.props.history.replace('/')
        } else {
          // TODO: Error handler
          alert(this.props.registerError)
        }
      }
    }
  }

  onSubmitLogin = (values: IRegister) => {
    console.log(values)
  }

  onNextStepPresses = (currentStep: number, value?: IRegister) => {
    if (currentStep === 1) {
      const phoneNumber = value?.phoneNumber!
      if (phoneNumber) {
        this.props.requestOTP(phoneNumber)
      }
    } else if (currentStep === 2) {
      const phoneNumber = value?.phoneNumber!
      const otp = value?.otp!
      this.props.validateOTP({ phoneNumber, otp })
    } else if (currentStep === 3) {
      this.setState({ currentStep: 4 })
    } else if (currentStep === 4) {
      const registerData: IRegisterRequest = {
        username: value?.username!,
        password: value?.password!,
        password_confirm: value?.confirmPassword!,
        bank: {
          type: value?.bankType!,
          name: `${value?.ownerName} ${value?.ownerSurname}`,
          number: value?.bankNumber!,
        },
        phone_number: value?.phoneNumber!,
      }
      this.props.register(registerData)
    }
  }

  onBackStep = (step: number) => {
    this.setState({ currentStep: this.state.currentStep - step })
  }

  renderRegisterForm = () => {
    const RegisterFormComponent = (formProps: FormikProps<IRegister>) => {
      if (this.state.currentStep <= 1) {
        return <RegisterStep1 {...formProps} onConfirmPresses={this.onNextStepPresses} />
      } else if (this.state.currentStep === 2) {
        return (
          <RegisterStep2
            {...formProps}
            onBackStep={this.onBackStep}
            onConfirmPresses={this.onNextStepPresses}
            extraProps={{ otp: this.props.otp!, requestOTP: this.props.requestOTP }}
          />
        )
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
      <div className="container register-container" ref={this.registerContainerRef}>
        <RegisterComponent />
      </div>
    )
  }
}

export default RegisterContainer