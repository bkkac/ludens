import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  ALink,
  Switch,
  Breadcrumb,
  ResponsiveIcon,
} from 'components'
import { noop } from 'lodash'
import moment from 'moment'
import { number } from 'utils'
import { MakingLotto, summaryLottoModal } from './components'
import './lottoMake.style.scss'

import DocumentIcon from 'assets/images/lotto/document/document.png'
import DocumentIcon2x from 'assets/images/lotto/document/document@2x.png'
import DocumentIcon3x from 'assets/images/lotto/document/document@3x.png'
import response from 'constants/response'

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

const slugNames: { [P in IGamePath]: ILottoGameType } = {
  yeege: 'LOTTER_YEGEE',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IMakingLottoProps & IMakingLottoActionProps = {
  loader() { noop() },
  makingBetLotto() { noop() },
  makingBetLottoCode: 0,
  makingBetLottoError: '',
  makingBetLottoIsFetching: false,
  makingBetLottoResult: [],
}

class LottoMakeContainer extends Component<
  IMakingLottoProps & IMakingLottoActionProps & DefaultProps
  & RouteComponentProps<{ type: IGamePath }, any, IMakingLottoParam>,
  IMakingLottoState
  > {

  static defaultProps = defaultProps

  state: IMakingLottoState = {
    activeModeSwitch: 'lotto',
    activeLottoGameModeSwitch: 'THREE_UP',
    numberList: [],
    defaultGameValue: '100',
  }

  componentDidUpdate(prevProps: IMakingLottoProps) {
    if (prevProps.makingBetLottoIsFetching !== this.props.makingBetLottoIsFetching
      && !this.props.makingBetLottoIsFetching) {
      this.props.loader(false)
      if (this.props.makingBetLottoCode === response.OK) {
        // Handle this
      }
    }
  }

  getGameSlugFromGamePath = () => {
    const generateSlug = (slugName: ILottoGameType) => {
      const currentTime = moment().format('DDMMYYYYHHmm')
      return `${slugName}_${currentTime}${number.padNumber(this.props.location.state.selectedLottoGame.round, 3)}`
    }
    switch (this.props.match.params.type) {
      case 'yeege':
        return generateSlug(slugNames.yeege)
      default:
        return ''
    }
  }

  handleOnClickBreadcrumb = (path: string) => {
    this.props.history.replace(path)
  }

  handleOnSwitchChanged = (currentTab: string) => {
    this.setState({ activeModeSwitch: currentTab })
  }

  handleOnSwitchLottoTypeChanged = (currentTab: ILottoType) => {
    this.setState({ activeLottoGameModeSwitch: currentTab })
  }

  handleOnAddLottoNumber = (lottoNumber: ILottoNumber) => {
    // TODO: Check dupplicate
    this.setState({
      numberList: [...this.state.numberList, {
        ...lottoNumber,
        value: this.state.defaultGameValue,
        slug: this.getGameSlugFromGamePath(),
      }],
    })
  }

  handleOnMakingBetLotto = (lottoLost: ILottoNumber[]) => {
    this.props.loader(true)
    this.props.makingBetLotto(lottoLost)
  }

  handleOnWatchLottoNumberList = () => {
    summaryLottoModal.show({
      lottoList: this.state.numberList,
      onClickBet: this.handleOnMakingBetLotto,
      onClickClose: (callbackLottoList: ILottoNumber[]) => {
        this.setState({ numberList: callbackLottoList }, () => {
          summaryLottoModal.hide()
        })
      },
    })
  }

  renderViewLottoListButton = () => {
    if (this.state.numberList.length > 0) {
      return (
        <div
          className="summary-badge-container d-flex justify-content-center align-items-center"
          onClick={this.handleOnWatchLottoNumberList}
        >
          <ResponsiveIcon
            icon={{ x1: DocumentIcon, x2: DocumentIcon2x, x3: DocumentIcon3x }}
            alt="document-badge"
            className="document-image-icon"
          />
          <div className="badge"><span className="badge-text">{this.state.numberList.length}</span></div>
        </div>
      )
    }
    return <></>
  }

  render() {
    const navigates: IBreadcrumbItem[] = [
      { label: constants.lottoLabel, path: '/lotto' },
      { label: constants.yeegeLabel, path: '/lotto/yeege' },
      { label: constants.makeLabel, active: true },
    ]

    const switchsMode: ISwitchItem[] = [
      { label: constants.lottoLabel, value: 'lotto' },
      { label: constants.numsumLabel, value: 'sum' },
    ]

    const switchsLottoMode: ISwitchItem<ILottoType>[] = [
      { label: constants.lotto3, value: 'THREE_UP' },
      { label: constants.lotto2, value: 'TWO_UP' },
      // { label: constants.lottoRun, value: 'run' },
    ]

    const ViewLottoListButton = this.renderViewLottoListButton

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
              <MakingLotto
                numberMode={this.state.activeLottoGameModeSwitch}
                onClickAddNumber={this.handleOnAddLottoNumber}
              />
            </div>
          </div>
        </div>
        <ViewLottoListButton />
      </>
    )
  }
}

export default LottoMakeContainer