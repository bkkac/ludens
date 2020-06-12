import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Modal,
  ALink,
  Switch,
  ResponsiveIcon,
} from 'components'
import { noop } from 'lodash'
import moment from 'moment'
import { number } from 'utils'
import { MakingLotto, MakingGame, summaryLottoModal } from './components'
import './lottoMake.style.scss'

import DocumentIcon from 'assets/images/lotto/document/document.png'
import DocumentIcon2x from 'assets/images/lotto/document/document@2x.png'
import DocumentIcon3x from 'assets/images/lotto/document/document@3x.png'
import response from 'constants/response'

const constants = {
  ok: 'ตกลง',
  lottoLabel: 'แทงหวย',
  numsumLabel: 'ยิงเลข',
  yeegeLabel: 'ยี่กี',
  makeLabel: 'แทง',
  back: '< ย้อนกลับ',
  cannotBet: 'ไม่สามารถแทงได้',
  betSuccess: 'คุณได้ทำรายการเสร็จสมบูรณ์',
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
    numberList: [],
    defaultGameValue: '100',
  }

  componentDidUpdate(prevProps: IMakingLottoProps) {
    if (prevProps.makingBetLottoIsFetching !== this.props.makingBetLottoIsFetching
      && !this.props.makingBetLottoIsFetching) {
      this.props.loader(false)
      if (this.props.makingBetLottoCode === response.OK) {
        Modal.success.show({
          action: () => {
            this.setState({ numberList: [] }, () => {
              Modal.success.hide()
              summaryLottoModal.hide()
              this.handleOnClickBreadcrumb(`/lotto/${this.props.match.params.type}`)
            })
          },
          actionText: constants.ok,
          description: constants.betSuccess,
        })
      } else if (this.props.makingBetLottoCode === response.BAD_REQUEST) {
        Modal.error.show({
          action: Modal.error.hide,
          actionText: constants.ok,
          title: constants.cannotBet,
          description: this.props.makingBetLottoError,
        })
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

  renderGameMode = () => {
    switch (this.state.activeModeSwitch) {
      case 'lotto':
        return (<MakingLotto onClickAddNumber={this.handleOnAddLottoNumber} />)
      case 'game':
        return (<MakingGame onClickAddNumber={noop} />)
      default:
        return (<></>)
    }
  }

  render() {
    const switchsMode: ISwitchItem[] = [
      { label: constants.lottoLabel, value: 'lotto' },
      { label: constants.numsumLabel, value: 'game' },
    ]

    const ViewLottoListButton = this.renderViewLottoListButton
    const GameModeComponent = this.renderGameMode

    return (
      <>
        <div className="container lotto-make-container">
          <div className="row mb-3">
            <div className="col">
              <ALink
                text={constants.back}
                color="#ff9b96"
                bold
                onClick={() => this.handleOnClickBreadcrumb(`/lotto/${this.props.match.params.type}`)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <Switch tabs={switchsMode} handleOnChangeTab={this.handleOnSwitchChanged} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <GameModeComponent />
            </div>
          </div>
        </div>
        <ViewLottoListButton />
      </>
    )
  }
}

export default LottoMakeContainer