import React, { Component } from 'react'
import { get, noop, isEmpty, map, isEqual } from 'lodash'
import {
  ALink,
  NumberPad,
  ButtonRadio,
  SelectorItem,
} from 'components'
import {
  LOTTO_GAME_TYPES,
  LOTTO_GAME_TYPE_NAME,
  LOTTO_GAME_TYPE_LENGTH
} from 'constants/variables'
import { number } from 'utils'
import colors from 'constants/colors'
import { Numbersets } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRandom } from '@fortawesome/free-solid-svg-icons'
import './makingLotto.style.scss'

const constants = {
  switchNumberMode: 'กลับเลข',
  numberpadMode: 'โหมดแป้นตัวเลข',
  numbersetMode: 'โหมดชุดตัวเลข',
  betRate: 'บาทละ',
  gameType: 'ประเภทการแทง',
  placeholderGameType: 'เลือกประเภทการแทง',
  placeholderNumber: (numberSet: number) => `เลข ${numberSet} ตัว`,
}

const defaultProps: IMakingLottoComponentProps = {
  lottos: [],
  betRates: [],
  gameSlug: 'LOTTER_YEGEE',
  onAddedNumber() { noop() },
}

class MakingLotto extends Component<IMakingLottoComponentProps, IMakingLottoComponentState> {

  static defaultProps = defaultProps

  state: IMakingLottoComponentState = {
    animated: false,
    numberSet: '',
    gameType: 'THREE_UP',
    inputMode: 'NUMBERPAD',
    isSwitchedNumber: false,
  }

  isRejectAddingNumber = () => {
    const length = LOTTO_GAME_TYPE_LENGTH[this.state.gameType]
    return this.state.numberSet.length < length
  }

  handleOnClickNumberPad = (num: number) => {
    const length = LOTTO_GAME_TYPE_LENGTH[this.state.gameType]
    if (num === -1) {
      return this.setState({ numberSet: this.state.numberSet.slice(0, -1) })
    } else if (this.state.numberSet.length >= length) { return }

    const newValue = this.state.numberSet.concat(String(num))
    return this.setState({ numberSet: newValue }, () => {
      this.handleOnAddNumber()
    })
  }

  handleOnAddNumber = () => {
    if (this.isRejectAddingNumber()) { return }
    const lottoNumber: ILottoNumber = {
      number: this.state.numberSet,
      type: this.state.gameType,
    }
    this.props.onAddedNumber(lottoNumber, 'ADD', this.state.isSwitchedNumber)
    this.setState({ animated: true }, () => {
      const timeoutInstance = setTimeout(() => {
        this.setState({ numberSet: '', animated: false }, () => {
          clearTimeout(timeoutInstance)
        })
      }, 768)
    })
  }

  handleOnSwitchLottoTypeChanged = (currentTab: TLottoGameType) => {
    this.setState({ gameType: currentTab, numberSet: '' })
  }

  handleOnChangeInputMode = () => {
    if (this.state.inputMode === 'NUMBERPAD') {
      return this.setState({ inputMode: 'NUMBERSET', numberSet: '' })
    }
    return this.setState({ inputMode: 'NUMBERPAD', numberSet: '' })
  }

  handleOnChangeSwitchMode = () => this.setState({ isSwitchedNumber: !this.state.isSwitchedNumber })

  renderLottoGameTypeOption = ({ item, ...selectProps }: IInputDefaultSelectProps<TLottoGameType>): JSX.Element => {
    const combindedBetRateType = `${this.props.gameSlug}_${item}` as TBetType
    const betRate: IBetRate = get(this.props.betRates.filter((rate) => rate.type === combindedBetRateType), '0', {})
    const rateAsMoney = number.castToMoney(Number(betRate.rate || '0'))
    const betRateText = `${constants.betRate} ${rateAsMoney}`
    return (
      <SelectorItem
        title={LOTTO_GAME_TYPE_NAME[item]}
        subTitle={betRateText}
        {...selectProps}
      />
    )
  }

  renderLottoNumber = (): JSX.Element => {
    if (isEmpty(this.state.numberSet)) {
      return (
        <h2 className={`body-1 placeholder-numbersets-text secondary-text ${!this.state.animated ? 'animated' : ''}`}>
          {constants.placeholderNumber(LOTTO_GAME_TYPE_LENGTH[this.state.gameType])}
        </h2>
      )
    }
    return (
      <h2 className={`body-1 numbersets-text ${this.state.animated ? 'animated' : ''}`}>
        {this.state.numberSet}
      </h2>
    )
  }

  renderInputMode = (): JSX.Element => {
    switch (this.state.inputMode) {
      case 'NUMBERPAD':
        const LottoNumbersets = this.renderLottoNumber
        return (
          <>
            <div className="row m4-t">
              <div className="col text-center selected-number-ditgit">
                <LottoNumbersets />
              </div>
            </div>
            <div className="row m3-t">
              <div className="col">
                <NumberPad onNumberPresses={this.handleOnClickNumberPad} />
              </div>
            </div>
          </>
        )
      case 'NUMBERSET':
        return (
          <>
            <div className="row m4-t">
              <div className="col">
                <Numbersets
                  lottos={this.props.lottos}
                  gameMode={this.state.gameType}
                  onAddedNumber={(lottoNumbers, state) =>
                    this.props.onAddedNumber(lottoNumbers, state, this.state.isSwitchedNumber)}
                />
              </div>
            </div>
          </>
        )
      default:
        return (
          <></>
        )
    }
  }

  renderLottoGameTypes = (): JSX.Element => {
    const gameList = LOTTO_GAME_TYPES[this.props.gameSlug]

    const LottoGamTypesComponent = map(gameList, (gameType, gameTypeIndex) => {
      const isCurrentActive = isEqual(this.state.gameType, gameType)

      const combindedBetRateType = `${this.props.gameSlug}_${gameType}` as TBetType
      const betRate: IBetRate = get(this.props.betRates.filter((rate) => rate.type === combindedBetRateType), '0', {})
      const rateAsMoney = number.castToMoney(Number(betRate.rate || '0'))
      const betRateText = `${constants.betRate} ${rateAsMoney}`

      return (
        <div
          className="m1-t col-6 col-md-4 d-flex"
          key={`lotto-game-type-${gameTypeIndex}-${gameType}`}
          style={{ paddingRight: 4, paddingLeft: 4 }}
        >
          <ButtonRadio
            id={`lotto-game-type-${gameType}`}
            text={(
              <>
                <h4 className="primary-blue-text">{LOTTO_GAME_TYPE_NAME[gameType]}</h4>
                <h6 className="subtitle-2 secondary-text">{betRateText}</h6>
              </>
            )}
            paddingY={8}
            forceState={isCurrentActive}
            defaultState={isCurrentActive}
            onChangeState={state => {
              if (state) {
                if (gameType === 'RUN_DOWN' || gameType === 'RUN_UP') {
                  return this.setState({ gameType, numberSet: '', inputMode: 'NUMBERPAD' })
                }
                this.setState({ gameType, numberSet: '' })
              }
            }}
            backgroundColor={colors.PRIMARY_TEXT}
          />
        </div>
      )
    })

    return (<div className="row">{LottoGamTypesComponent}</div>)
  }

  render() {
    const GameInput = this.renderInputMode
    const LottoGameTypes = this.renderLottoGameTypes

    return (
      <div>
        <div className="row">
          <div className="col">
            <h4 className="m1-l m1-b">{constants.gameType}</h4>
            <LottoGameTypes />
          </div>
        </div>
        {
          (this.state.gameType === 'RUN_DOWN' || this.state.gameType === 'RUN_UP')
            ? <></>
            : (
              <>
                <div className="row m2-t">
                  <div className="col text-center">
                    <ALink
                      id="changeto-number-set-mode"
                      color={colors.PRIMARY_BLUE}
                      onClick={this.handleOnChangeInputMode}
                    >
                      {this.state.inputMode === 'NUMBERSET' ? constants.numberpadMode : constants.numbersetMode}
                      <FontAwesomeIcon icon={faRandom} className="m1-l" />
                    </ALink>
                  </div>
                </div>
                <div className="row m2-t">
                  <div className="col text-center">
                    <ButtonRadio
                      paddingX={32}
                      id="switch-number-mode"
                      text={constants.switchNumberMode}
                      onChangeState={this.handleOnChangeSwitchMode}
                    />
                  </div>
                </div>
              </>
            )
        }
        <GameInput />
      </div>
    )
  }

}

export default MakingLotto