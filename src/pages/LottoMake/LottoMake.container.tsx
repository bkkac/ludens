import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  ALink,
  Switch,
  Breadcrumb,
  ResponsiveIcon,
  // UsernameText,
  // CreditAmountCard,
} from 'components'
import { MakingLotto } from './components'
import './lottoMake.style.scss'

import DocumentIcon from 'assets/images/lotto/document/document.png'
import DocumentIcon2x from 'assets/images/lotto/document/document@2x.png'
import DocumentIcon3x from 'assets/images/lotto/document/document@3x.png'

const constants = {
  lottoLabel: 'แทงหวย',
  numsumLabel: 'ยิงเลข',
  yeegeLabel: 'ยี่กี',
  makeLabel: 'แทง',
  lotto3: 'สามตัว',
  lotto2: 'สองตัว',
  lottoRun: 'เลขวิ่ง',
  back: '< ย้อนกลับ',
}

class LottoMakeContainer extends Component<
  IMakingLottoProps & RouteComponentProps<{ type: string }, any, IMakingLottoParam>,
  IMakingLottoState
  > {

  state: IMakingLottoState = {
    activeModeSwitch: 'lotto',
    activeLottoGameModeSwitch: 'three',
  }

  handleOnClickBreadcrumb = (path: string) => {
    this.props.history.replace(path)
  }

  handleOnSwitchChanged = (currentTab: string) => {
    this.setState({ activeModeSwitch: currentTab })
  }

  handleOnSwitchLottoTypeChanged = (currentTab: LottoGameMode) => {
    this.setState({ activeLottoGameModeSwitch: currentTab })
  }

  render() {
    // const money = 100
    // const username = 'Biwswalker'
    const navigates: IBreadcrumbItem[] = [
      { label: constants.lottoLabel, path: '/lotto' },
      { label: constants.yeegeLabel, path: '/lotto/yeege' },
      { label: constants.makeLabel, active: true },
    ]

    const switchsMode: ISwitchItem[] = [
      { label: constants.lottoLabel, value: 'lotto' },
      { label: constants.numsumLabel, value: 'sum' },
    ]

    const switchsLottoMode: ISwitchItem<LottoGameMode>[] = [
      { label: constants.lotto3, value: 'three' },
      { label: constants.lotto2, value: 'two' },
      // { label: constants.lottoRun, value: 'run' },
    ]

    return (
      <>
        <div className="container lotto-make-container">
          <div className="row mb-3">
            <div className="col">
              <ALink text={constants.back} color="#ff9b96" bold onClick={this.props.history.goBack} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Breadcrumb items={navigates} handleOnClickItem={this.handleOnClickBreadcrumb} />
            </div>
          </div>
          {/* <div className="row mt-3">
          <div className="col d-flex justify-content-center">
            <UsernameText username={username} />
          </div>
        </div>
        <div className="row mt-2 mb-4">
          <div className="col d-flex justify-content-center">
            <CreditAmountCard creditAmount={money} />
          </div>
        </div> */}
          <div className="row mt-4">
            <div className="col">
              <Switch tabs={switchsMode} handleOnChangeTab={this.handleOnSwitchChanged} />
            </div>
          </div>
          <div className="row mt-3 mb-4">
            <div className="col">
              <Switch type="outline" tabs={switchsLottoMode} handleOnChangeTab={this.handleOnSwitchLottoTypeChanged} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <MakingLotto numberMode={this.state.activeLottoGameModeSwitch} />
            </div>
          </div>
        </div>
        <div className="summary-badge-container d-flex justify-content-center align-items-center">
          <ResponsiveIcon
            icon={{ x1: DocumentIcon, x2: DocumentIcon2x, x3: DocumentIcon3x }}
            alt="document-badge"
            className="document-image-icon"
          />
        </div>
      </>
    )
  }
}

export default LottoMakeContainer