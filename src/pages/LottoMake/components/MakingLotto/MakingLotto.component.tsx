import React, { Component, createRef, RefObject } from 'react'
import { get, noop, isEmpty } from 'lodash'
import {
  NumberPad,
  InputSelect,
  SelectorItem,
  ALink,
  ButtonRadio
} from 'components'
import {
  LOTTO_GAME_TYPES,
  LOTTO_GAME_TYPE_NAME,
  LOTTO_GAME_TYPE_LENGTH
} from 'constants/variables'
import colors from 'constants/colors'
import './makingLotto.style.scss'

const constants = {
  switchNumberMode: 'กลับเลข',
  numberSetMode: 'โหมดชุดตัวเลข',
  betRate: 'บาทละ',
  placeholderGameType: 'เลือกประเภทหวย',
  placeholderNumber: (numberSet: number) => `เลข ${numberSet} ตัว`,
}

const defaultProps: IMakingLottoComponentProps = {
  betRates: [],
  gameSlug: 'LOTTER_YEGEE',
  onAddedNumber() { noop() },
}

class MakingLotto extends Component<IMakingLottoComponentProps, IMakingLottoComponentState> {

  static defaultProps = defaultProps

  makingLottoRef: RefObject<HTMLDivElement> = createRef()

  state: IMakingLottoComponentState = {
    animated: false,
    numberSet: '',
    gameType: 'THREE_UP',
  }

  isRejectAddingNumber = () => {
    const length = LOTTO_GAME_TYPE_LENGTH[this.state.gameType]
    return this.state.numberSet.length < length
  }

  handleOnClickNumberPad = (num: number) => {
    this.makingLottoRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'end',
    })
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
    this.props.onAddedNumber(lottoNumber)
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

  handleOnChangeSwitchMode = (switchState: boolean) => {
    // TODO: When implement switch number mode
  }

  renderLottoGameTypeOption = ({ item, ...selectProps }: IInputDefaultSelectProps<TLottoGameType>): JSX.Element => {
    const combindedBetRateType = `${this.props.gameSlug}_${item}` as TBetType
    const betRate: IBetRate = get(this.props.betRates.filter((rate) => rate.type === combindedBetRateType), '0', {})
    const betRateText = `${constants.betRate} ${betRate.rate || '0'}`
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

  render() {
    const gameList = LOTTO_GAME_TYPES[this.props.gameSlug]

    const LottoNumbersets = this.renderLottoNumber

    return (
      <div ref={this.makingLottoRef}>
        <div className="row">
          <div className="col">
            <InputSelect<TLottoGameType, TLottoGameType>
              name="lotto-game-type"
              items={gameList}
              value={this.state.gameType}
              onChange={(type) => this.setState({ gameType: type, numberSet: '' })}
              placeholder={constants.placeholderGameType}
              RenderSelected={this.renderLottoGameTypeOption}
            />
          </div>
        </div>
        {/* TODO: When implement numberset and switch number */}
        <div className="row m2-t">
          <div className="col text-center">
            <ALink id="changeto-number-set-mode" color={colors.PRIMARY_BLUE}>{constants.numberSetMode}</ALink>
          </div>
        </div>
        <div className="row m2-t">
          <div className="col text-center">
            <ButtonRadio
              id="switch-number-mode"
              text={constants.switchNumberMode}
              onChangeState={this.handleOnChangeSwitchMode}
            />
          </div>
        </div>
        <div className="row m4-t">
          <div className="col text-center">
            <LottoNumbersets />
          </div>
        </div>
        <div className="row m3-t">
          <div className="col">
            <NumberPad onNumberPresses={this.handleOnClickNumberPad} />
          </div>
        </div>
      </div>
    )
  }

}

export default MakingLotto