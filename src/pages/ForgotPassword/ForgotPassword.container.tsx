import React, { Component } from 'react'
import { noop, isEmpty } from 'lodash'
import { ALink, Modal } from 'components'
import colors from 'constants/colors'
import { Formik, FormikProps } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { RouteComponentProps } from 'react-router-dom'
import { ForgotPasswordForm } from './components'
import initialValues from './models/initialValues'
import scheme from './models/scheme'
import './forgotPassword.style.scss'
import response from 'constants/response'

const constants = {
  ok: 'ตกลง',
  back: 'ย้อนกลับ',
  gotoMain: 'กลับสู่หน้าหลัก',
  requestedSuccess: 'เปลี่ยนรหัสผ่านสำเร็จ',
  forgotPassword: 'ลืมรหัสผ่าน',
}

const defaultProps: IForgotPasswordProps & IForgotPasswordActionProps = {
  requestedForgotPassword: {
    id: 0,
    otp: 0,
    userId: 0,
    reqCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  forgotPasswordIsFetching: false,
  forgotPasswordCode: 0,
  forgotPasswordError: '',
  resetPasswordIsFetching: false,
  resetPasswordCode: 0,
  resetPasswordError: '',
  forgotPasswordRequest() { noop() },
  resetPassword() { noop() },
  loader() { noop() },
}

class ForgotPasswordContainer extends
  Component<IForgotPasswordProps & IForgotPasswordActionProps & RouteComponentProps> {

  static defaultProps = defaultProps

  componentDidUpdate(prevProps: IForgotPasswordProps) {
    if (prevProps.forgotPasswordIsFetching !== this.props.forgotPasswordIsFetching
      && !this.props.forgotPasswordIsFetching) {
      this.props.loader(false)
      if (this.props.forgotPasswordCode !== response.OK) {
        Modal.error.show({
          action: Modal.error.hide,
          description: this.props.resetPasswordError,
          actionText: constants.ok,
        })
      }
    }
    if (prevProps.resetPasswordIsFetching !== this.props.resetPasswordIsFetching
      && !this.props.resetPasswordIsFetching) {
      this.props.loader(false)
      if (this.props.resetPasswordCode !== response.OK) {
        Modal.error.show({
          action: Modal.error.hide,
          description: this.props.resetPasswordError,
          actionText: constants.ok,
        })
      } else {
        Modal.success.show({
          action: () => {
            this.props.history.replace('/transaction')
            Modal.success.hide()
          },
          actionText: constants.gotoMain,
          description: constants.requestedSuccess,
        })
      }
    }

  }

  onClickBack = () => {
    this.props.history.goBack()
  }

  onRequestOTP = (username: string, phoneNumber: string) => {
    const requestData: IForgotPasswordRequest = { username, phoneNumber }
    this.props.loader(true)
    this.props.forgotPasswordRequest(requestData)
  }

  onSubmitForm = (values: IForgotPasswordForm) => {
    if (!isEmpty(this.props.requestedForgotPassword)) {
      const submitForm: IResetPasswordRequest = {
        otp: values.otp,
        forgotPasswordId: this.props.requestedForgotPassword.id,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      }
      this.props.loader(true)
      this.props.resetPassword(submitForm)
    } else {
      // TODO: Handle if requestedForgotPassword empty id
    }
  }

  renderForgotPasswordForm = () => {
    const ForgotPasswordFormComponent = (formProps: FormikProps<IForgotPasswordForm>) => {
      return (<ForgotPasswordForm {...formProps} handleOtpRequest={this.onRequestOTP} />)
    }
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={scheme}
        enableReinitialize
        onSubmit={this.onSubmitForm}
      >
        {ForgotPasswordFormComponent}
      </Formik>
    )
  }

  render() {
    const FormComponent = this.renderForgotPasswordForm
    return (
      <div className="forgot-password-container primary-bg">
        <div className="container">
          <div className="row m4-b">
            <div className="col">
              <ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={this.onClickBack}>
                <FontAwesomeIcon icon={faChevronLeft} className="m1-r" />
                {constants.back}
              </ALink>
            </div>
          </div>
          <div className="row m2-b">
            <div className="col">
              <h2>{constants.forgotPassword}</h2>
            </div>
          </div>
          <FormComponent />
        </div>
      </div>
    )
  }
}

export default ForgotPasswordContainer