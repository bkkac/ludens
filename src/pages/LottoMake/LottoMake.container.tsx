import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Modal,
  ALink,
  Badge,
} from 'components'
import moment from 'moment'
import { number } from 'utils'
import route from 'constants/routes'
import colors from 'constants/colors'
import response from 'constants/response'
import { noop, replace, sum, values } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faStopwatch } from '@fortawesome/free-solid-svg-icons'
import {
  MakingLotto,
  MakingGame,
  BetResult,
} from './components'
import { Summary } from '../LottoPayment/components'
import './lottoMake.style.scss'

const constants = {
  ok: 'ตกลง',
  numberList: (length: number) => `รายการแทง (${length})`,
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
  & RouteComponentProps<{ type: TLottoSlug }, any, IMakingLottoRouteProps | ILottoPaymentRouteProps>,
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
    const locationState: IMakingLottoRouteProps = this.props.location.state
    const game = locationState.selectedLottoGame
    const gameDate = moment(game.createdAt).format('DDMMYYYY')
    const gameRound = number.padNumber(game.round, 3)
    this.props.getYeegeSum({
      date: gameDate,
      round: locationState.selectedLottoGame.round,
    })
    this.props.getPlayedYeegeList({
      date: gameDate,
      round: locationState.selectedLottoGame.round,
    })
    this.props.getBetRate()
    this.setState({
      lottoStatus: locationState.selectedLottoGame.status,
      numberList: locationState.betList || [],
    }, () => {
      if (locationState.selectedLottoGame.status === 'OPEN') {
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
              this.handleOnClickBreadcrumb(route.lottoChrildren.exactPath(this.props.match.params.type))
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
      const locationState: IMakingLottoRouteProps = this.props.location.state
      const game = locationState.selectedLottoGame
      const gameDate = moment(game.createdAt).format('DDMMYYYY')
      const gameRound = number.padNumber(game.round, 3)
      this.props.listenYeegeSum({ date: gameDate, round: gameRound })
    }

    if (prevProps.getPlayedYeegeListIsFetching !== this.props.getPlayedYeegeListIsFetching
      && !this.props.getPlayedYeegeListIsFetching) {
      const locationState: IMakingLottoRouteProps = this.props.location.state

      const game = locationState.selectedLottoGame
      const gameDate = moment(game.createdAt).format('DDMMYYYY')
      const gameRound = number.padNumber(game.round, 3)
      this.props.listenPlayedYeegeList({ date: gameDate, round: gameRound })
    }
  }

  componentWillUnmount() {
    this.clearLocalInterval()
    this.props.clearBetResult()
    this.props.clearYeegeSum()

    const locationState: IMakingLottoRouteProps = this.props.location.state
    const game = locationState.selectedLottoGame
    const gameDate = moment(game.createdAt).format('DDMMYYYY')
    const gameRound = number.padNumber(game.round, 3)
    this.props.unlistenYeegeSum({ date: gameDate, round: gameRound })
    this.props.unlistenPlayedYeegeList({ date: gameDate, round: gameRound })
  }

  clearLocalInterval = () => {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
    }
  }

  countingdown = () => {
    this.clearLocalInterval()
    const locationState: IMakingLottoRouteProps = this.props.location.state
    const endedTime = locationState.selectedLottoGame.endTime
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
    const locationState: IMakingLottoRouteProps = this.props.location.state
    const gameround = locationState.selectedLottoGame.round || '1'
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

  handleOnMakingBetLotto = (lottoList: ILottoNumber[]) => {
    this.props.loader(true)
    this.props.makingBetLotto(lottoList)
  }

  handleOnPlayYeegeGame = (gameNumber: string) => {
    this.props.loader(true)
    const locationState: IMakingLottoRouteProps = this.props.location.state
    const game = locationState.selectedLottoGame
    this.props.playYeege({
      number: gameNumber,
      round: game.round,
    })
  }

  handleOnClickLottoPayment = () => {
    const locationState: IMakingLottoRouteProps = this.props.location.state
    const paymentRouteProps: ILottoPaymentRouteProps = {
      betList: this.state.numberList,
      lottoSlug: this.props.match.params.type,
      selectedLottoGame: locationState.selectedLottoGame,
    }
    this.props.history.replace(route.lottoCheckout.path, paymentRouteProps)
  }

  handleOnBetListChanged = (lottoList: ILottoNumber[]) => {
    this.setState({ numberList: lottoList })
  }

  renderGameMode = () => {
    // TODO: Implement this on got a layout
    const locationState: IMakingLottoRouteProps = this.props.location.state
    if (locationState.selectedLottoGame.status === 'CLOSE') {
      return (
        <BetResult
          reound={number.padNumber(locationState.selectedLottoGame.round, 3)}
          results={this.props.betResults}
          playedYeegeList={this.props.playedYeegeList}
        />
      )
    }
    // End
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
    this.handleOnClickBreadcrumb(route.lottoChrildren.exactPath(this.props.match.params.type))
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

  renderSummaryNotification = (active: boolean) => {
    return (
      <div className={`summary-notification-container primary-blue-bg ${active ? 'opened' : ''}`}>
        <div className="container flex m-auto text-right">
          <ALink
            id="open-number-list-summary"
            onClick={this.handleOnClickLottoPayment}
            color={colors.PRIMARY_TEXT}
            underline
          >
            {constants.numberList(this.state.numberList.length)}
          </ALink>
        </div>
      </div>
    )
  }

  render() {
    const GameModeComponent = this.renderGameMode
    const RenderYeegeGameComponent = this.renderYeegeGame
    const locationState: IMakingLottoRouteProps = this.props.location.state
    const game = locationState.selectedLottoGame
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

    const isActiveSummaryNotification = (this.state.numberList.length > 0)

    return (
      <div className={`lotto-make-container primary-bg ${isActiveSummaryNotification ? 'opened' : ''}`}>
        {this.renderSummaryNotification(isActiveSummaryNotification)}
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
            <div className="col col-lg-7 m2-t">
              <GameModeComponent />
            </div>
            <div className="d-none d-lg-block col-lg-5 m2-t">
              <Summary
                betRates={this.props.betRates}
                lottoList={this.state.numberList}
                onClickBet={this.handleOnMakingBetLotto}
                onBetListChanged={this.handleOnBetListChanged}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LottoMakeContainer