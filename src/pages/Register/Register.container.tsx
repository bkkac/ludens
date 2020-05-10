import React, { Component, createRef, RefObject } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Formik, FormikProps } from 'formik'
import { noop } from 'lodash'
import response from 'constants/response'
import { Modal } from 'components'
import {
  RegisterStep1,
  RegisterStep2,
  RegisterStep3,
} from './components'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
import './register.style.scss'

const constants = {
  ok: 'ตกลง',
  login: 'เข้าสู่ระบบ',
  registerSuccess: 'สมัครสมาชิคสำเร็จ!',
}

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
        this.props.loading(false)
        if (this.props.requestOTPCode === response.OK) {
          this.setState({ currentStep: 2 })
        } else {
          Modal.error.show({
            action: Modal.error.hide,
            description: this.props.requestOTPError,
            actionText: constants.ok,
          })
        }
      }
    } else if (this.state.currentStep === 2) {
      if (prevProps.validateOTPIsFetching !== this.props.validateOTPIsFetching && !this.props.validateOTPIsFetching) {
        this.props.loading(false)
        if (this.props.validateOTPCode === response.OK && this.props.validateResult === true) {
          this.setState({ currentStep: 3 })
        } else {
          Modal.error.show({
            action: Modal.error.hide,
            description: this.props.validateOTPError,
            actionText: constants.ok,
          })
        }
      }
    } else if (this.state.currentStep === 3) {
      if (prevProps.registerIsFetching !== this.props.registerIsFetching && !this.props.registerIsFetching) {
        this.props.loading(false)
        if (this.props.registerCode === response.OK) {
          Modal.success.show({
            action: () => this.props.history.replace('/'),
            actionText: constants.login,
            description: constants.registerSuccess,
          })
        } else {
          Modal.error.show({
            action: Modal.error.hide,
            description: this.props.registerError,
            actionText: constants.ok,
          })
        }
      }
    }
  }

  onSubmitRegister = (_: IRegister) => {
    noop()
  }

  onNextStepPresses = (currentStep: number, value?: IRegister) => {
    if (currentStep === 1) {
      const phoneNumber = value?.phoneNumber!
      if (phoneNumber) {
        this.props.loading(true)
        this.props.requestOTP(phoneNumber)
      }
    } else if (currentStep === 2) {
      const phoneNumber = value?.phoneNumber!
      const otp = value?.otp!
      this.props.loading(true)
      this.props.validateOTP({ phoneNumber, otp })
    } else if (currentStep === 3) {
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
      this.props.loading(true)
      this.props.register(registerData)
    }
  }

  onBackStep = (step: number) => {
    if (step === 1) {
      this.props.history.push('/')
    } else if (step === 2) {
      this.setState({ currentStep: 1 })
    } else if (step === 3) {
      this.setState({ currentStep: 1 })
    }
  }

  renderRegisterForm = () => {
    const RegisterFormComponent = (formProps: FormikProps<IRegister>) => {
      if (this.state.currentStep <= 1) {
        return (
          <RegisterStep1
            {...formProps}
            onBackStep={this.onBackStep}
            onConfirmPresses={this.onNextStepPresses}
          />
        )
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
        return (
          <RegisterStep3
            {...formProps}
            onBackStep={this.onBackStep}
            onConfirmPresses={this.onNextStepPresses}
          />
        )
      }
    }

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={scheme}
        enableReinitialize
        onSubmit={this.onSubmitRegister}
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