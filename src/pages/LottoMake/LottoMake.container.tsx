import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Modal,
  ALink,
  Badge,
} from 'components'
import moment from 'moment'
import { number } from 'utils'
import colors from 'constants/colors'
import response from 'constants/response'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faQuestionCircle,
  faChevronRight,
  faChevronLeft,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons'
import {
  sum,
  uniq,
  noop,
  find,
  split,
  values,
  replace,
  isArray,
  isEmpty,
  reverse,
} from 'lodash'
import {
  MakingLotto,
  MakingGame,
  PlayedUser,
  BetResult,
} from './components'
import { Summary } from '../LottoPayment/components'
import { LOTTO_SLUG_NAME, LOTTO_SLUG_TO_QA_TYPE } from 'constants/variables'
import routes from 'constants/routes'
import './lottoMake.style.scss'

const constants = {
  ok: 'ตกลง',
  numsumLabel: 'ยิงเลข',
  makeLabel: 'แทงหวย',
  numberList: (length: number) => `รายการแทง (${length})`,
  yeegeLabel: (round: string) => `หวยยี่กีรอบที่ ${round}`,
  back: 'กลับ',
  qa: 'กติกาการเล่น',
  cannotBet: 'ไม่สามารถแทงได้',
  betSuccess: 'คุณได้ทำรายการเสร็จสมบูรณ์',
  makingGameLabel: 'ผลรวม (ยิงเลข)',
  timeups: 'หมดเวลา',
  onProcessing: 'กำลังประมวลผล...',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IMakingLottoProps & IMakingLottoActionProps = {
  getLottoGame() { noop() },
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
  getPlayedYeegeListCode: 0,
  playedYeegeList: [],
  getBetResultIsFetching: false,
  getBetResultError: '',
  getBetResultCode: 0,
  betResults: [],
  betRates: [],

  getLottoGameIsFetching: false,
  getLottoGameCode: 0,
  getLottoGameError: '',
  lottoGame: {
    id: 0,
    round: '',
    endTime: '',
    startTime: '',
    createdAt: '',
    status: 'UNKNOWN',
  },
}

class LottoMakeContainer extends Component<
  IMakingLottoProps & IMakingLottoActionProps & DefaultProps
  & RouteComponentProps<{ type: TLottoSlug }, any, IMakingLottoRouteProps | ILottoPaymentRouteProps>,
  IMakingLottoState
  > {

  static defaultProps = defaultProps

  intervalId: NodeJS.Timeout | null = null

  state: IMakingLottoState = {
    activeModeSwitch: 'LOTTO',
    numberList: [],
    defaultGameValue: '1',
    remainingTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    lottoStatus: 'UNKNOWN',
    onLottoProcessing: false,
  }

  componentDidMount() {
    this.props.loader(true)

    const locationState: IMakingLottoRouteProps = this.props.location.state
    const game = locationState.selectedLottoGame
    const gameDate = moment(game.createdAt).format('DDMMYYYY')
    const gameRound = number.padNumber(locationState.selectedLottoGame.round, 3)
    const gameQuery = { date: gameDate, round: gameRound }

    const slugName = this.props.match.params.type
    this.props.getLottoGame(slugName, gameDate, gameRound)
    this.props.getBetRate()

    if (slugName === 'LOTTER_YEGEE') {
      this.props.getYeegeSum(gameQuery)
      this.props.getPlayedYeegeList(gameQuery)
    }
    this.setState({ numberList: locationState.betList || [] })
  }

  componentDidUpdate(prevProps: IMakingLottoProps) {
    // On get lotto game
    if (prevProps.getLottoGameIsFetching !== this.props.getLottoGameIsFetching
      && !this.props.getLottoGameIsFetching) {
      if (this.props.getLottoGameCode === response.OK) {
        this.setState({ lottoStatus: this.props.lottoGame.status }, () => {
          if (this.props.lottoGame.status === 'OPEN') {
            this.props.loader(false)
            this.countingdown()
          } else {
            this.props.loader(true)
            const lottoGame = this.props.lottoGame
            const gameDate = moment(lottoGame.createdAt).format('DDMMYYYY')
            const gameRound = number.padNumber(lottoGame.round, 3)
            this.props.getBetResult({
              date: gameDate,
              round: gameRound,
              type: 'LOTTER_YEGEE',
            })
            const gameQuery = { date: gameDate, round: gameRound }
            this.props.getYeegeSum(gameQuery)
          }
        })
      } else {
        this.props.history.goBack()
      }
    }

    if (prevProps.makingBetLottoIsFetching !== this.props.makingBetLottoIsFetching
      && !this.props.makingBetLottoIsFetching) {
      this.props.loader(false)
      if (this.props.makingBetLottoCode === response.OK) {
        Modal.success.show({
          action: () => {
            this.setState({ numberList: [] }, () => {
              Modal.success.hide()
              this.handleOnClickBreadcrumb(routes.lottoChrildren.exactPath(this.props.match.params.type))
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

    // Result until time is up
    if (prevProps.getBetResultIsFetching !== this.props.getBetResultIsFetching
      && !this.props.getBetResultIsFetching) {
      this.setState({ onLottoProcessing: false })
      this.props.loader(false)
    }

    // BEGIN: YEEGE GAME
    if (prevProps.playYeegeIsFetching !== this.props.playYeegeIsFetching
      && !this.props.playYeegeIsFetching) {
      this.props.loader(false)
    }

    if (prevProps.getYeegeSumIsFetching !== this.props.getYeegeSumIsFetching
      && !this.props.getYeegeSumIsFetching) {
      if (this.props.lottoGame.status === 'OPEN') {
        const lottoGame = this.props.lottoGame
        const gameDate = moment(lottoGame.createdAt).format('DDMMYYYY')
        const gameRound = number.padNumber(lottoGame.round, 3)
        this.props.listenYeegeSum({ date: gameDate, round: gameRound })
      }
    }

    if (prevProps.getPlayedYeegeListIsFetching !== this.props.getPlayedYeegeListIsFetching
      && !this.props.getPlayedYeegeListIsFetching) {
      if (this.props.lottoGame.status === 'OPEN') {
        const lottoGame = this.props.lottoGame
        const gameDate = moment(lottoGame.createdAt).format('DDMMYYYY')
        const gameRound = number.padNumber(lottoGame.round, 3)
        this.props.listenPlayedYeegeList({ date: gameDate, round: gameRound })
      }
      // END: YEEGE GAME
    }
  }

  componentWillUnmount() {
    this.props.loader(false)
    this.clearLocalInterval()
    this.props.clearBetResult()
    const slugName = this.props.match.params.type
    if (slugName === 'LOTTER_YEGEE') {
      const lottoGame = this.props.lottoGame
      const gameDate = moment(lottoGame.createdAt).format('DDMMYYYY')
      const gameRound = number.padNumber(lottoGame.round, 3)
      const gameQuery = { date: gameDate, round: gameRound }
      this.props.unlistenYeegeSum(gameQuery)
      this.props.unlistenPlayedYeegeList(gameQuery)
    }
  }

  clearLocalInterval = () => {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
    }
  }

  countingdown = () => {
    this.clearLocalInterval()
    const lottoGame = this.props.lottoGame
    const momentEndAt = moment(replace(lottoGame.endTime!, /\s/g, ''))
    const momentEndAtTimezone = momentEndAt.clone()

    this.intervalId = setInterval(() => {
      const duration = moment.duration(momentEndAtTimezone.diff(moment()))
      const hours = duration.hours()
      const minutes = duration.minutes()
      const seconds = duration.seconds()

      if (hours <= 0 && minutes <= 0 && seconds < 0) {
        this.clearLocalInterval()
        this.setState({ onLottoProcessing: true }, () => {
          const slugName = this.props.match.params.type
          if (slugName === 'LOTTER_YEGEE') {
            const gameDate = moment(lottoGame.createdAt).format('DDMMYYYY')
            const gameRound = number.padNumber(lottoGame.round, 3)
            const gameQuery = { date: gameDate, round: gameRound }
            this.props.unlistenYeegeSum(gameQuery)
            this.props.unlistenPlayedYeegeList(gameQuery)
          }
          setTimeout(() => {
            const gameDate = moment(lottoGame.createdAt).format('DDMMYYYY')
            const gameRound = number.padNumber(lottoGame.round, 3)
            this.props.loader(true)
            this.props.getLottoGame(slugName, gameDate, gameRound)
          }, 5000)
        })
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
    const gameround = this.props.lottoGame.round
    const currentTime = moment().format('DDMMYYYYHHmm')
    return `${slugName}_${currentTime}${number.padNumber(gameround, 3)}`
  }

  handleOnClickBreadcrumb = (path: string) => {
    this.props.history.replace(path)
  }

  handleOnSwitchChanged = (currentTab: TMakeLottoGameMode) => {
    this.setState({ activeModeSwitch: currentTab })
  }

  handleOnAddLottoNumber = (
    lottoNumber: ILottoNumber | ILottoNumber[],
    state: 'ADD' | 'REMOVE',
    isSwitchedNumber: boolean = false) => {

    const lottoNumbering = (): ILottoNumber | ILottoNumber[] => {
      if (isSwitchedNumber) {
        const lottoNumberArray = (pureLottoNumber: ILottoNumber): ILottoNumber[] => {
          const numberAsArray = split(pureLottoNumber.number, '')
          if (numberAsArray.length === 2) {
            return [
              pureLottoNumber,
              { ...pureLottoNumber, number: String(sum(reverse(numberAsArray))) },
            ]
          } else if (numberAsArray.length === 3) {
            return uniq<string>([
              `${numberAsArray[0]}${numberAsArray[1]}${numberAsArray[2]}`,
              `${numberAsArray[0]}${numberAsArray[2]}${numberAsArray[1]}`,
              `${numberAsArray[1]}${numberAsArray[0]}${numberAsArray[2]}`,
              `${numberAsArray[1]}${numberAsArray[2]}${numberAsArray[0]}`,
              `${numberAsArray[2]}${numberAsArray[0]}${numberAsArray[1]}`,
              `${numberAsArray[2]}${numberAsArray[1]}${numberAsArray[0]}`,
            ]).map((numb) => ({ ...pureLottoNumber, number: numb }))
          }
          return [pureLottoNumber]
        }

        if (isArray(lottoNumber)) {
          const temporaryList: ILottoNumber[] = []
          lottoNumber.forEach(lot => {
            const lottos = lottoNumberArray(lot)
            lottos.forEach(lotto => temporaryList.push(lotto))
          })
          return temporaryList
        } else {
          return lottoNumberArray(lottoNumber)
        }
      }
      return lottoNumber
    }

    const lotterNumbers = lottoNumbering()
    const finding = (numb: ILottoNumber) => isArray(lotterNumbers)
      ? isEmpty(find(lotterNumbers, { number: numb.number, type: numb.type }))
      : !(numb.number === lotterNumbers.number && numb.type === lotterNumbers.type)

    const newNumberList = this.state.numberList.filter(finding)
    if (state === 'ADD') {
      if (isArray(lotterNumbers)) {
        const addNumberList = lotterNumbers.map(numb => ({
          ...numb,
          value: this.state.defaultGameValue,
          slug: this.generateGameSlug(),
        }))
        this.setState({ numberList: [...newNumberList, ...addNumberList] })
      } else {
        this.setState({
          numberList: [...newNumberList, {
            ...lotterNumbers,
            value: this.state.defaultGameValue,
            slug: this.generateGameSlug(),
          }],
        })
      }
    } else {
      this.setState({ numberList: newNumberList })
    }
  }

  handleOnMakingBetLotto = (lottoList: ILottoNumber[]) => {
    this.props.loader(true)
    const lottos = lottoList.map(lotto => ({ ...lotto, value: number.castToInteger(lotto.value) }))
    this.props.makingBetLotto(lottos)
  }

  handleOnPlayYeegeGame = (gameNumber: string) => {
    this.props.loader(true)
    this.props.playYeege({
      number: gameNumber,
      round: this.props.lottoGame.round,
    })
  }

  handleOnClickLottoPayment = () => {
    const paymentRouteProps: ILottoPaymentRouteProps = {
      betList: this.state.numberList,
      lottoSlug: this.props.match.params.type,
      selectedLottoGame: this.props.lottoGame,
    }
    this.props.history.replace(routes.lottoCheckout.path, paymentRouteProps)
  }

  handleOnBetListChanged = (lottoList: ILottoNumber[]) => {
    this.setState({ numberList: lottoList })
  }

  handleOnGotoSelectFavorite = () => {
    const favoriteRouteProps: ILottoFavoriteRouteProps = {
      betList: this.state.numberList,
      lottoSlug: this.props.match.params.type,
      selectedLottoGame: this.props.lottoGame,
    }
    this.props.history.replace(routes.lottoFavorite.path, favoriteRouteProps)
  }

  renderGameMode = () => {
    if (this.state.onLottoProcessing) {
      return (
        <div className="border-rounded secondary-bg p4">
          <div className="row">
            <div className="col text-center m3-y">
              <h2>{constants.onProcessing}</h2>
            </div>
          </div>
        </div>
      )
    } else if (this.props.lottoGame.status === 'CLOSE') {
      return (<BetResult results={this.props.betResults} />)
    } else if (this.state.lottoStatus === 'OPEN') {
      switch (this.state.activeModeSwitch) {
        case 'LOTTO':
          return (
            <MakingLotto
              lottos={this.state.numberList}
              betRates={this.props.betRates}
              gameSlug={this.props.match.params.type}
              onAddedNumber={this.handleOnAddLottoNumber}
            />
          )
        case 'GAME':
          return (
            <div>
              <PlayedUser playedYeegeList={this.props.playedYeegeList} />
              <MakingGame onClickAddNumber={this.handleOnPlayYeegeGame} />
            </div>
          )
        default:
          return (<></>)
      }
    }
    return (<></>)
  }

  renderSummaryMode = () => {
    if (this.state.onLottoProcessing) {
      return (<></>)
    } else if (this.props.lottoGame.status === 'CLOSE') {
      return (<PlayedUser playedYeegeList={this.props.playedYeegeList} />)
    } else if (this.props.lottoGame.status === 'OPEN') {
      return (
        <div className="d-none d-lg-block">
          <Summary
            onNavigateToFavorite={this.handleOnGotoSelectFavorite}
            betRates={this.props.betRates}
            lottoList={this.state.numberList}
            onClickBet={this.handleOnMakingBetLotto}
            onBetListChanged={this.handleOnBetListChanged}
          />
        </div>
      )
    }
    return <></>
  }

  handleOnBack = () => {
    const slugName = this.props.match.params.type
    if (slugName !== 'LOTTER_YEGEE') {
      this.props.history.goBack()
    } else {
      this.handleOnClickBreadcrumb(routes.lottoChrildren.exactPath(this.props.match.params.type))
    }
  }

  handleOnQA = () => {
    this.props.history.push(routes.qaType.exactPath(LOTTO_SLUG_TO_QA_TYPE[this.props.match.params.type]))
  }

  handleOnSwitchMode = () => {
    this.setState({ activeModeSwitch: this.state.activeModeSwitch === 'LOTTO' ? 'GAME' : 'LOTTO' })
  }

  renderYeegeGame = () => {
    const slugName = this.props.match.params.type
    if (slugName !== 'LOTTER_YEGEE' || this.state.onLottoProcessing) {
      return (<></>)
    }

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
              <ALink id="goto-yeege-game" color={colors.PRIMARY_BLUE} onClick={this.handleOnSwitchMode}>
                {this.state.activeModeSwitch === 'LOTTO' ? constants.numsumLabel : constants.makeLabel}
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
    const SummaryModeComponent = this.renderSummaryMode
    const RenderYeegeGameComponent = this.renderYeegeGame

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

    const slugName = this.props.match.params.type
    const gameRound = this.props.lottoGame.round
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
              <div className="d-flex flex-row align-items-center">
                <h2 className="flex">{(slugName !== 'LOTTER_YEGEE')
                  ? LOTTO_SLUG_NAME[slugName]
                  : constants.yeegeLabel(gameRound)}</h2>
                <ALink id="goto-qa" color={colors.PRIMARY_BLUE} bold onClick={this.handleOnQA}>
                  <FontAwesomeIcon icon={faQuestionCircle} className="m1-r" />
                  {constants.qa}
                </ALink>
              </div>
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
            <div className="col-lg-5 m2-t">
              <SummaryModeComponent />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LottoMakeContainer