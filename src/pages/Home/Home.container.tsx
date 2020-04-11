import React, { Component } from 'react'
import { Formik, FormikValues, FormikProps } from 'formik'
import { LoginForm, LottoList } from './components'
import './home.style.scss'

const lottos: ILotto[] = [
  {
    name: 'หวยรัฐบาล',
    code: 'GOVERNMENT',
    date: '2020-04-07T16:53:24.648Z',
    updateTime: '2020-04-07T16:53:24.648Z',
    lotto: [
      { name: 'รางวัลที่ 1', numbers: ['439344'] },
      { name: 'สองตัวหลัง', numbers: ['64'] },
      { name: 'สามตัวหน้า', numbers: ['206', '678'] },
      { name: 'สามตัวหน้า', numbers: ['206', '678'] },
    ],
  },
  {
    name: 'หวยธกส',
    code: 'BAAC',
    date: '2020-04-07T16:53:24.648Z',
    updateTime: '2020-04-07T16:53:24.648Z',
    lotto: [
      { name: 'สองตัวล่าง', numbers: ['99'] },
      { name: 'สามตัวหน้า', numbers: ['206'] },
    ],
  },
  {
    name: 'หวยหุ้นไทย',
    code: 'THAI_BROKER',
    date: '2020-04-07T16:53:24.648Z',
    updateTime: '2020-04-07T16:53:24.648Z',
    lotto: [
      {
        name: 'หุ้นไทยเช้า',
        lotto: [
          { name: 'สามตัวบน', numbers: ['949'] },
          { name: 'สองตัวล่าง', numbers: ['20'] },
        ],
      },
      {
        name: 'หุ้นไทยเที่ยง',
        lotto: [
          { name: 'สามตัวบน', numbers: ['949'] },
          { name: 'สองตัวล่าง', numbers: ['20'] },
        ],
      },
    ],
  },
  {
    name: 'หวยยี่กี',
    code: 'YEEGE',
    date: '2020-04-07T16:53:24.648Z',
    updateTime: '2020-04-07T16:53:24.648Z',
    lotto: [
      {
        name: 'รอบที่ 1',
        lotto: [
          { name: 'สามตัวบน', numbers: ['949'] },
          { name: 'สองตัวล่าง', numbers: ['20'] },
        ],
      },
      {
        name: 'รอบที่ 2',
        lotto: [
          { name: 'สามตัวบน', numbers: ['949'] },
          { name: 'สองตัวล่าง', numbers: ['20'] },
        ],
      },
    ],
  },
]

class HomeContainer extends Component {


  onSubmitLogin = (values: FormikValues) => {
    // console.log(values)
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

  renderLottoList = () => {

    return <LottoList data={lottos} />
  }

  render() {
    const RenderLoginFormComponent = this.renderLoginForm
    const RenderLottoListComponent = this.renderLottoList
    return (
      <div className="container">
        <div className="login-container">
          <RenderLoginFormComponent />
        </div>
        <div className="mt-5 mb-4">
          <RenderLottoListComponent />
        </div>
      </div>
    )
  }
}

export default HomeContainer