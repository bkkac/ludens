import React, { Component } from 'react'
import { Formik, FormikProps, FormikValues } from 'formik'
import { RegisterStep1 } from './components'
import './register.style.scss'

// Temporary FormikValues
class RegisterContainer extends Component {

  onSubmitLogin = (values: FormikValues) => {
    console.log(values)
  }

  renderRegisterForm = () => {
    const RegisterFormComponent = (formProps: FormikProps<FormikValues>) => {
      return <RegisterStep1 {...formProps} />
    }
    return (
      <Formik
        initialValues={{}}
        validationSchema={{}}
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