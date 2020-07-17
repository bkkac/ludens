import React, { Component, ChangeEvent } from 'react'
import {
  Button,
  ButtonIcon,
  InputNumber,
  ResponsiveIcon,
} from 'components'
import { get, groupBy, keys, noop, reduce, sum, filter, split } from 'lodash'
import { number } from 'utils'
import { LOTTO_GAME_TYPE } from 'constants/variables'
import './summaryLottoModal.style.scss'

import CloseIcon from 'assets/images/global/closePink/closePink.png'
import CloseIcon2x from 'assets/images/global/closePink/closePink@2x.png'
import CloseIcon3x from 'assets/images/global/closePink/closePink@3x.png'

const constants = {
  lottoListTitle: 'รายการแทง',
  win: 'ชนะ',
  makeLotto: 'แทงหวย',
  defaultValue: 'เดิมพันราคาเท่ากัน',
  totalToPay: 'จำนวนเงินทั้งหมด',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ISummaryLottoModalProps = {
  betRates: [],
  lottoList: [],
  onClickBet() { noop() },
  onClickClose() { noop() },
}

class SummaryLottoModal extends Component<ISummaryLottoModalProps & DefaultProps, ISummaryLottoModalState> {

  state: ISummaryLottoModalState = {
    betList: [],
  }

  componentDidMount() {
    this.setState({ betList: this.props.lottoList })
  }

  handleOnClickBet = () => {
    this.props.onClickBet(this.state.betList)
  }

  handleOnClickClose = () => {
    this.props.onClickClose(this.state.betList)
  }

  handleOnRemove = (seq: number) => {
    const newBetList: ILottoNumber[] = filter<ILottoNumber>(this.state.betList, (_, index) => index !== seq)
    this.setState({ betList: newBetList })
  }

  handleOnChangeValue = (value: string, seq: number) => {
    const betArray: ILottoNumber[] = filter<ILottoNumber>(this.state.betList, (_, index) => index === seq)
    const betObject: ILottoNumber = get(betArray, '0', {})
    const newObject: ILottoNumber = { ...betObject, value }
    const newBetList: ILottoNumber[] = this.state.betList
    newBetList[seq] = newObject
    this.setState({ betList: newBetList })
  }

  calculateBenefitValue = (betValueString: string = '0', rate: string = '0') => {
    const betValue = Number(number.castToInteger(betValueString)) || 0
    const calculatedBenefit = Number(rate) * betValue // TODO: Temp
    return number.castToMoney(calculatedBenefit)
  }

  calculateTotalValue = () => {
    const totally: number = reduce(this.state.betList, (prev, curr) => {
      const betValue = Number(number.castToInteger(curr.value || '0'))
      return sum([prev, betValue])
    }, 0)
    return number.castToMoney(totally)
  }

  renderLottoList = () => {
    const groupingLottoListObject: { [name in TLottoGameType]?: (ILottoNumber & { seq?: number })[] }
      = groupBy<(ILottoNumber & { seq?: number })>(
        this.state.betList.map((bet, betIndex) => ({ ...bet, seq: betIndex })),
        'type')
    const GroupingLottoListComponent = keys(groupingLottoListObject).map((lottos, lottosIndex) => {
      const LottoListComponent = groupingLottoListObject[lottos as TLottoGameType]?.map((lotto, lottoIndex) => {
        const lotterType = split(lotto.slug!, '_', 2).reduce((prev, curr) => `${prev}_${curr}`)
        const betType = `${lotterType}_${lotto.type}`
        const betRate: IBetRate = get(this.props.betRates.filter((rate) => rate.type === betType), '0', {})
        return (
          <div className="row lotto-row" key={`lotto-${lotto.type}-${lottoIndex}`}>
            <div className="col lotto-wrapper">
              <div className="lotto-number-text">{lotto.number}</div>
              <div className="lotto-value-wrapper">
                <div className="lotto-value-container">
                  <InputNumber
                    thousandSeparator
                    decimalScale={0}
                    name={`values-${lotto.seq}`}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      this.handleOnChangeValue(event.target.value, lotto.seq!)}
                    value={lotto.value}
                  />
                </div>
              </div>
              <div className="lotto-rate-text">x {betRate.rate}</div>
              <div className="lotto-win-label">{constants.win}</div>
              <div className="lotto-benefit-text">
                {this.calculateBenefitValue(lotto.value || '0', betRate.rate || '0')}
              </div>
              <div className="lotto-remove-wrapper">
                <div className="delete-lotto-button-container" onClick={() => this.handleOnRemove(lotto.seq!)}>
                  <ResponsiveIcon
                    icon={{ x1: CloseIcon, x2: CloseIcon2x, x3: CloseIcon3x }}
                    className="delete-lotto-button-icon"
                    alt="delete-lotto-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })

      return (
        <div className="row mt-4" key={`lotto-type-${lottosIndex}`}>
          <div className="col">
            <div className="row">
              <div className="col lotto-name-type">{LOTTO_GAME_TYPE[lottos as TLottoGameType]}</div>
            </div>
            <div className="row mt-2">
              <div className="col">
                {LottoListComponent}
              </div>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div>{GroupingLottoListComponent}</div>
    )
  }

  renderSummaryTotal = () => {
    return (
      <>
        {/* <div className="row summary-lotto-row mx-4">
          <div className="col summary-lotto-wrapper">
            <div className="leading-summary pl-2">{constants.defaultValue}</div>
            <div className="trailing-summary-wrapper">
              <div className="trailing-summary-value-container">
                {100}
              </div>
            </div>
          </div>
        </div> */}
        <div className="row summary-lotto-row mx-4">
          <div className="col summary-lotto-wrapper">
            <div className="leading-summary pl-2">{constants.totalToPay}</div>
            <div className="trailing-summary pl-2">{this.calculateTotalValue()}</div>
          </div>
        </div>
      </>
    )
  }

  render() {
    const LottoListComponent = this.renderLottoList
    const SummaryTotalComponent = this.renderSummaryTotal

    return (
      <div className="container">
        <div className="row">
          <div className="col summary-lotto-modal-container px-3 py-4">
            <div className="row">
              <div className="col">
                <span className="summary-lotto-modal-title">{constants.lottoListTitle}</span>
              </div>
              <div className="col d-flex justify-content-end">
                <ButtonIcon type="close" onClick={this.handleOnClickClose} />
              </div>
            </div>
            <LottoListComponent />
            <div className="row mt-5">
              <div className="col">
                <SummaryTotalComponent />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <Button onClick={this.handleOnClickBet} text={constants.makeLotto} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SummaryLottoModal