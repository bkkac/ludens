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

const slugNames: { [P in IGamePath]: TLottoGameType } = {
  yeege: 'LOTTER_YEGEE',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IMakingLottoProps & IMakingLottoActionProps = {
  loader() { noop() },
  makingBetLotto() { noop() },
  getYeegeSum() { noop() },
  playYeege() { noop() },
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
    this.props.getYeegeSum({
      date: moment().format('DDMMYYYY'),
      round: this.props.location.state.selectedLottoGame.round,
    })
    this.setState({ lottoStatus: this.props.location.state.selectedLottoGame.status }, () => {
      if (this.props.location.state.selectedLottoGame.status === 'OPEN') {
        this.countingdown()
      } else {
        // this.props.loader(true)
        // TODO: integrate get lotto result
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
  }

  componentWillUnmount() {
    this.clearLocalInterval()
  }

  clearLocalInterval = () => {
    this.setState({ lottoStatus: 'CLOSE' })
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
    }
  }

  countingdown = () => {
    const endedTime = this.props.location.state.selectedLottoGame.endTime
    const momentEndAt = moment(replace(endedTime!, /\s/g, ''))
    const momentEndTime = momentEndAt.clone().add(-7, 'hour')
    this.intervalId = setInterval(() => {
      const duration = moment.duration(momentEndTime.diff(moment()))
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
    const generateSlug = (slugName: TLottoGameType) => {
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

    const remainingTime = `${number.padNumber(String(this.state.remainingTime.hours), 2)} : ${number.padNumber(String(this.state.remainingTime.minutes), 2)} : ${number.padNumber(String(this.state.remainingTime.seconds), 2)}`

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
          <div className="row mb-3">
            <div className="col d-flex justify-content-center">
              <div className="remaining-time-lotto">{remainingTime}</div>
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