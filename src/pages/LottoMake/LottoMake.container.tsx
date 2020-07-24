import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Modal,
  ALink,
  Badge,
  ResponsiveIcon,
} from 'components'
import moment from 'moment'
import { number } from 'utils'
import colors from 'constants/colors'
import { noop, replace, sum, values } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faStopwatch } from '@fortawesome/free-solid-svg-icons'
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
  yeegeLabel: (round: string) => `หวยยี่กีรอบที่ ${round}`,
  makeLabel: 'แทง',
  back: 'กลับ',
  cannotBet: 'ไม่สามารถแทงได้',
  betSuccess: 'คุณได้ทำรายการเสร็จสมบูรณ์',
  makingGameLabel: 'ผลรวม (ยิงเลข)',
  timeups: 'หมดเวลา',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IMakingLottoProps & IMakingLottoActionProps = {
  loader() { noop() },
  makingBetLotto() { noop() },
  getYeegeSum() { noop() },
  listenYeegeSum() { noop() },
  unlistenYeegeSum() { noop() },
  playYeege() { noop() },
  getPlayedYeegeList() { noop() },
  listenPlayedYeegeList() { noop() },
  unlistenPlayedYeegeList() { noop() },
  getBetResult() { noop() },
  clearBetResult() { noop() },
  clearYeegeSum() { noop() },
  getBetRate() { noop() },
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
  betRates: [],
}

class LottoMakeContainer extends Component<
  IMakingLottoProps & IMakingLottoActionProps & DefaultProps
  & RouteComponentProps<{ type: TLottoSlug }, any, IMakingLottoParam>,
  IMakingLottoState
  > {

  static defaultProps = defaultProps

  intervalId: NodeJS.Timeout | null = null

  state: IMakingLottoState = {
    activeModeSwitch: 'lotto',
    numberList: [],
    defaultGameValue: '1',
    remainingTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    lottoStatus: 'OPEN',
  }

  componentDidMount() {
    const game = this.props.location.state.selectedLottoGame
    const gameDate = moment(game.createdAt).format('DDMMYYYY')
    const gameRound = number.padNumber(game.round, 3)
    this.props.getYeegeSum({
      date: gameDate,
      round: this.props.location.state.selectedLottoGame.round,
    })
    this.props.getPlayedYeegeList({
      date: gameDate,
      round: this.props.location.state.selectedLottoGame.round,
    })
    this.props.getBetRate()
    this.setState({ lottoStatus: this.props.location.state.selectedLottoGame.status }, () => {
      if (this.props.location.state.selectedLottoGame.status === 'OPEN') {
        this.countingdown()
      } else {
        this.props.loader(true)
        this.props.getBetResult({
          date: gameDate,
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

    if (prevProps.getYeegeSumIsFetching !== this.props.getYeegeSumIsFetching
      && !this.props.getYeegeSumIsFetching) {
      const game = this.props.location.state.selectedLottoGame
      const gameDate = moment(game.createdAt).format('DDMMYYYY')
      const gameRound = number.padNumber(game.round, 3)
      this.props.listenYeegeSum({ date: gameDate, round: gameRound })
    }

    if (prevProps.getPlayedYeegeListIsFetching !== this.props.getPlayedYeegeListIsFetching
      && !this.props.getPlayedYeegeListIsFetching) {
      const game = this.props.location.state.selectedLottoGame
      const gameDate = moment(game.createdAt).format('DDMMYYYY')
      const gameRound = number.padNumber(game.round, 3)
      this.props.listenPlayedYeegeList({ date: gameDate, round: gameRound })
    }
  }

  componentWillUnmount() {
    this.clearLocalInterval()
    this.props.clearBetResult()
    this.props.clearYeegeSum()
    summaryLottoModal.hide()

    const game = this.props.location.state.selectedLottoGame
    const gameDate = moment(game.createdAt).format('DDMMYYYY')
    const gameRound = number.padNumber(game.round, 3)
    this.props.unlistenYeegeSum({ date: gameDate, round: gameRound })
    this.props.unlistenPlayedYeegeList({ date: gameDate, round: gameRound })
  }

  clearLocalInterval = () => {
    this.setState({ lottoStatus: 'CLOSE', numberList: [] }, () => {
      summaryLottoModal.hide()
    })
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
    }
  }

  countingdown = () => {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
    }

    const endedTime = this.props.location.state.selectedLottoGame.endTime
    const momentEndAt = moment(replace(endedTime!, /\s/g, ''))
    const momentEndAtTimezone = momentEndAt.clone().add(-7, 'hour')

    this.intervalId = setInterval(() => {
      const duration = moment.duration(momentEndAtTimezone.diff(moment()))
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

  generateGameSlug = () => {
    const slugName = this.props.match.params.type
    const gameround = this.props.location.state.selectedLottoGame.round || '1'
    const currentTime = moment().format('DDMMYYYYHHmm')
    return `${slugName}_${currentTime}${number.padNumber(gameround, 3)}`
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
        slug: this.generateGameSlug(),
      }],
    })
  }

  handleOnMakingBetLotto = (lottoLost: ILottoNumber[]) => {
    this.props.loader(true)
    this.props.makingBetLotto(lottoLost)
  }

  handleOnWatchLottoNumberList = () => {
    summaryLottoModal.show({
      betRates: this.props.betRates,
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
    const game = this.props.location.state.selectedLottoGame
    this.props.playYeege({
      number: gameNumber,
      round: game.round,
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
    // TODO: Implement this on got a layout
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
          return (
            <MakingLotto
              betRates={this.props.betRates}
              gameSlug={this.props.match.params.type}
              onAddedNumber={this.handleOnAddLottoNumber}
            />
          )
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

  handleOnBack = () => {
    this.handleOnClickBreadcrumb(`/lotto/${this.props.match.params.type}`)
  }

  renderYeegeGame = () => {
    const status = this.state.lottoStatus
    return (
      <div className="yeege-game-result-container p2">
        <div className="flex">
          <h4 className="secondary-text">{constants.makingGameLabel}</h4>
          <h2 className="yeege-game-result-text">{this.props.yeegeSum || '0'}</h2>
        </div>
        {status === 'OPEN'
          ? (
            <div className="yeege-game-action-wrapper m-auto">
              <ALink id="goto-yeege-game" color={colors.PRIMARY_BLUE}>
                {constants.numsumLabel}
                <FontAwesomeIcon icon={faChevronRight} className="ml-1" />
              </ALink>
            </div>
          )
          : <></>}
      </div >
    )
  }

  render() {
    // change to pop up on header
    const ViewLottoListButton = this.renderViewLottoListButton

    const GameModeComponent = this.renderGameMode
    const RenderYeegeGameComponent = this.renderYeegeGame

    const game = this.props.location.state.selectedLottoGame
    const sumtime = sum(values(this.state.remainingTime))
    const remainingTime = (this.state.lottoStatus === 'OPEN')
      ? (sumtime > 0)
        ? `${number.padNumber(String(this.state.remainingTime.hours), 2)} : ${number.padNumber(String(this.state.remainingTime.minutes), 2)} : ${number.padNumber(String(this.state.remainingTime.seconds), 2)}`
        : '-'
      : (this.state.lottoStatus === 'CLOSE')
        ? constants.timeups
        : '-'
    const RenderRemainingTime = (): JSX.Element => {
      return (
        <>
          <FontAwesomeIcon icon={faStopwatch} className="mr-1" />
          {remainingTime}
        </>
      )
    }

    return (
      <div className="lotto-make-container primary-bg">
        <div className="container">
          <div className="row">
            <div className="col d-flex">
              <div className="flex">
                <ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={this.handleOnBack}>
                  <FontAwesomeIcon icon={faChevronLeft} className="m1-r" />
                  {constants.back}
                </ALink>
              </div>
              <Badge
                renderText={RenderRemainingTime}
                backgroundColor={colors.SECONDARY_RED}
                color={colors.PRIMARY_TEXT}
              />
            </div>
          </div>
          <div className="row m3-t">
            <div className="col">
              <h2>{constants.yeegeLabel(game.round)}</h2>
            </div>
          </div>
          <div className="row m2-t">
            <div className="col">
              <RenderYeegeGameComponent />
            </div>
          </div>
          <div className="row">
            <div className="col col-lg-6">
              <GameModeComponent />
            </div>
          </div>
        </div>
        <ViewLottoListButton />
      </div>
    )
  }
}

export default LottoMakeContainer