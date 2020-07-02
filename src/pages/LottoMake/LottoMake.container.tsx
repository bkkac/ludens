import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Modal,
  ALink,
  Switch,
  ResponsiveIcon,
} from 'components'
import { noop, replace } from 'lodash'
import moment from 'moment'
import { number } from 'utils'
import { MakingLotto, MakingGame, summaryLottoModal, BetResult } from './components'
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
  makingGameLabel: 'ผลรวม (ยิงเลข)',
  timeups: 'หมดเวลา',
}

const slugNames: { [P in IGamePath]: TLottoType } = {
  yeege: 'YEGEE',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IMakingLottoProps & IMakingLottoActionProps = {
  loader() { noop() },
  makingBetLotto() { noop() },
  getYeegeSum() { noop() },
  playYeege() { noop() },
  getPlayedYeegeList() { noop() },
  getBetResult() { noop() },
  clearBetResult() { noop() },
  clearYeegeSum() { noop() },
  makingBetLottoCode: 0,
  makingBetLottoError: '',
  makingBetLottoIsFetching: false,
  makingBetLottoResult: [],
  playYeegeCode: 0,
  playYeegeError: '',
  playYeegeIsFetching: false,
  playYeegeResult: {},
  getYeegeSumIsFetching: false!,
  getYeegeSumError: '',
  getYeegeSumCode: 0,
  yeegeSum: '0',
  getPlayedYeegeListIsFetching: false,
  getPlayedYeegeListError: '',
  getPlayedYeegeListCode: '0',
  playedYeegeList: [],
  getBetResultIsFetching: false,
  getBetResultError: '',
  getBetResultCode: '0',
  betResults: [],
}

class LottoMakeContainer extends Component<
  IMakingLottoProps & IMakingLottoActionProps & DefaultProps
  & RouteComponentProps<{ type: IGamePath }, any, IMakingLottoParam>,
  IMakingLottoState
  > {

  static defaultProps = defaultProps

  intervalId: NodeJS.Timeout | null = null

  state: IMakingLottoState = {
    activeModeSwitch: 'lotto',
    numberList: [],
    defaultGameValue: '100',
    remainingTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    lottoStatus: 'OPEN',
  }

  componentDidMount() {
    const game = this.props.location.state.selectedLottoGame
    const gemeDate = moment(game.createdAt).format('DDMMYYYY')
    const gameRound = number.padNumber(game.round, 3)
    this.props.getYeegeSum({
      date: gemeDate,
      round: this.props.location.state.selectedLottoGame.round,
    })
    this.props.getPlayedYeegeList({
      date: gemeDate,
      round: this.props.location.state.selectedLottoGame.round,
    })
    this.setState({ lottoStatus: this.props.location.state.selectedLottoGame.status }, () => {
      if (this.props.location.state.selectedLottoGame.status === 'OPEN') {
        this.countingdown()
      } else {
        this.props.loader(true)
        this.props.getBetResult({
          date: gemeDate,
          round: gameRound,
          type: 'LOTTER_YEGEE',
        })
      }
    })
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

    if (prevProps.playYeegeIsFetching !== this.props.playYeegeIsFetching
      && !this.props.playYeegeIsFetching) {
      this.props.loader(false)
    }

    if (prevProps.getBetResultIsFetching !== this.props.getBetResultIsFetching
      && !this.props.getBetResultIsFetching) {
      this.props.loader(false)
    }
  }

  componentWillUnmount() {
    this.clearLocalInterval()
    this.props.clearBetResult()
    this.props.clearYeegeSum()
  }

  clearLocalInterval = () => {
    this.setState({ lottoStatus: 'CLOSE', numberList: [] })
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
    }
  }

  countingdown = () => {
    const endedTime = this.props.location.state.selectedLottoGame.endTime
    const momentEndAt = moment(replace(endedTime!, /\s/g, ''))
    this.intervalId = setInterval(() => {
      const duration = moment.duration(momentEndAt.diff(moment()))
      const hours = duration.hours()
      const minutes = duration.minutes()
      const seconds = duration.seconds()

      if (hours <= 0 && minutes <= 0 && seconds < 0) {
        this.clearLocalInterval()
        // this.props.loader(true)
        // TODO: integrate get lotto result
      } else if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        this.setState({ remainingTime: { hours: 0, minutes: 0, seconds: 0 } }, () => {
          this.clearLocalInterval()
        })
      } else {
        this.setState({ remainingTime: { hours, minutes, seconds } })
      }

    }, 1000);
  }

  getGameSlugFromGamePath = () => {
    const generateSlug = (slugName: TLottoType) => {
      const currentTime = moment().format('DDMMYYYYHHmm')
      return `LOTTER_${slugName}_${currentTime}${number.padNumber(this.props.location.state.selectedLottoGame.round, 3)}`
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

  handleOnPlayYeegeGame = (gameNumber: string) => {
    this.props.loader(true)
    this.props.playYeege({
      number: gameNumber,
      round: this.props.location.state.selectedLottoGame.round,
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
    if (this.props.location.state.selectedLottoGame.status === 'CLOSE') {
      return (
        <BetResult
          reound={number.padNumber(this.props.location.state.selectedLottoGame.round, 3)}
          results={this.props.betResults}
          playedYeegeList={this.props.playedYeegeList}
        />
      )
    }
    switch (this.state.activeModeSwitch) {
      case 'lotto':
        if (this.state.lottoStatus === 'OPEN') {
          return (<MakingLotto onClickAddNumber={this.handleOnAddLottoNumber} />)
        }
        return (<div />)
      case 'game':
        if (this.state.lottoStatus === 'OPEN') {
          return (
            <MakingGame
              playedYeegeList={this.props.playedYeegeList}
              onClickAddNumber={this.handleOnPlayYeegeGame}
              yeegeSum={this.props.yeegeSum}

            />
          )
        }
        return (<div />)
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

    const remainingTime = (this.state.remainingTime.hours < 1
      && this.state.remainingTime.minutes < 1
      && this.state.remainingTime.hours < 1)
      ? constants.timeups
      : `${number.padNumber(String(this.state.remainingTime.hours), 2)} : ${number.padNumber(String(this.state.remainingTime.minutes), 2)} : ${number.padNumber(String(this.state.remainingTime.seconds), 2)}`

    return (
      <>
        <div className="container lotto-make-container">
          <div className="row mb-3">
            <div className="col">
              <ALink
                color="#ff9b96"
                bold
                onClick={() => this.handleOnClickBreadcrumb(`/lotto/${this.props.match.params.type}`)}
              >
                {constants.back}
              </ALink>
            </div>
          </div>
          <div className="row mb-3 mx-2">
            <div className="col d-flex flex-column yeege-sum-lotto-container p-3">
              <div className="yeege-sum-lotto-title d-flex flex-row align-items-center">
                {constants.makingGameLabel}
                <div className="d-flex justify-content-center">
                  <div className="remaining-time-lotto">{remainingTime}</div>
                </div>
              </div>
              <div className="yeege-sum-lotto-result mt-3">{this.props.yeegeSum || '0'}</div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              {this.props.location.state.selectedLottoGame.status === 'OPEN'
                ? <Switch tabs={switchsMode} handleOnChangeTab={this.handleOnSwitchChanged} />
                : <></>
              }
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