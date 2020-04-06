import React, { Component } from 'react'
import { Formik, FormikValues, FormikProps } from 'formik'
import { LoginForm } from './components'
import './home.style.scss'

class HomeContainer extends Component {


  onSubmitLogin = (values: FormikValues) => {
    console.log(values)
  }

  renderLoginForm = () => {
    const LoginFormComponent = (formProps: FormikProps<FormikValues>) => {
      return <LoginForm {...formProps} />
    }
    return (
      <Formik
        initialValues={{}}
        validationSchema={{}}
        enableReinitialize
        onSubmit={this.onSubmitLogin}
      >
        {LoginFormComponent}
      </Formik>
    )
  }

  render() {
    const RenderLoginFormComponent = this.renderLoginForm
    return (
      <div className="container">
        <div className="login-container">
          <RenderLoginFormComponent />
        </div>
      </div>
    )
  }
}

export default HomeContainer