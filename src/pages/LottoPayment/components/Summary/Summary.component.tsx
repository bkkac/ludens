import React, { Component, ChangeEvent } from 'react'
import {
  Badge,
  ALink,
  Button,
  InputNumber,
  ResponsiveIcon,
} from 'components'
import { get, groupBy, keys, noop, reduce, sum, filter, split, map } from 'lodash'
import { number } from 'utils'
import colors from 'constants/colors'
import { LOTTO_GAME_TYPE_NAME } from 'constants/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './summary.style.scss'

import CloseIcon from 'assets/images/global/closePink/closePink.png'
import CloseIcon2x from 'assets/images/global/closePink/closePink@2x.png'
import CloseIcon3x from 'assets/images/global/closePink/closePink@3x.png'

const constants = {
  lottoListTitle: 'รายการแทง',
  historyMakedList: 'ดึงโพย',
  makeLotto: 'แทงหวย',
  perBath: 'บาทละ',
  win: 'ชนะได้: ',
  defaultValue: 'เดิมพันราคาเท่ากัน',
  totalToPay: 'เดิมพันทั้งหมด',
  totalBenefit: 'เมื่อชนะทั้งหมด',
  clean: 'ล้าง',
}

const defaultProps: ILottoPaymentSummaryProps = {
  betRates: [],
  lottoList: [],
  onClickBet() { noop() },
  onBetListChanged() { noop() },
  onNavigateToFavorite() { noop() },
}

class SummaryLottoComponent extends Component<ILottoPaymentSummaryProps, ILottoPaymentSummaryState> {

  static defaultProps = defaultProps

  state: ILottoPaymentSummaryState = {
    betList: [],
    defaultValue: '1',
  }

  componentDidMount() {
    this.setState({ betList: this.props.lottoList })
  }

  componentDidUpdate(prevProps: ILottoPaymentSummaryProps) {
    if (prevProps.lottoList !== this.props.lottoList || this.props.lottoList !== this.state.betList) {
      this.setState({ betList: this.props.lottoList })
    }
  }

  handleOnClickBet = () => {
    this.props.onClickBet(this.state.betList)
  }

  handleOnRemove = (seq: number) => {
    const newBetList: ILottoNumber[] = filter<ILottoNumber>(this.state.betList, (_, index) => index !== seq)
    this.setState({ betList: newBetList }, () => {
      this.props.onBetListChanged!(newBetList)
    })
  }

  handleOnChangeValue = (value: string, seq: number) => {
    const betArray: ILottoNumber[] = filter<ILottoNumber>(this.state.betList, (_, index) => index === seq)
    const betObject: ILottoNumber = get(betArray, '0', {})
    const newObject: ILottoNumber = { ...betObject, value }
    const newBetList: ILottoNumber[] = this.state.betList
    newBetList[seq] = newObject
    this.setState({ betList: newBetList })
  }

  handleOnBlurValue = (value: string, seq: number) => {
    const betArray: ILottoNumber[] = filter<ILottoNumber>(this.state.betList, (_, index) => index === seq)
    const betObject: ILottoNumber = get(betArray, '0', {})
    const newObject: ILottoNumber = { ...betObject, value }
    const newBetList: ILottoNumber[] = this.state.betList
    newBetList[seq] = newObject
    this.setState({ betList: newBetList }, () => {
      this.props.onBetListChanged!(newBetList)
    })
  }

  handleOnDefaultValueBlur = () => {
    const newBetList = map(this.props.lottoList, item => ({ ...item, value: this.state.defaultValue }))
    this.setState({ betList: newBetList }, () => {
      this.props.onBetListChanged!(newBetList)
    })
  }

  handleOnGotoFavoriteSelect = () => {
    this.props.onNavigateToFavorite!()
  }

  handleOnCleanLit = () => {
    this.setState({ betList: [] }, () => {
      this.props.onBetListChanged!([])
    })
  }

  calculateBenefitValue = (betValueString: string = '0', rate: string = '0') => {
    const betValue = Number(number.castToInteger(betValueString)) || 0
    const calculatedBenefit = Number(rate) * betValue
    return number.castToMoney(calculatedBenefit)
  }

  calculateTotalValue = () => {
    const totally: number = reduce(this.state.betList, (prev, curr) => {
      const betValue = Number(number.castToInteger(curr.value || '0'))
      return sum([prev, betValue])
    }, 0)
    return number.castToMoney(totally)
  }

  calculateTotalBenefit = () => {
    const totally: number = reduce(this.state.betList, (prev, curr) => {
      const lotterType = split(curr.slug!, '_', 2).reduce((prevType, currType) => `${prevType}_${currType}`)
      const betType = `${lotterType}_${curr.type}`
      const betRate: IBetRate = get(this.props.betRates.filter((rate) => rate.type === betType), '0', {})
      const betValue = number.castToInteger(curr.value || '0')
      const total = Number(betRate.rate) * Number(number.castToInteger(betValue))
      return sum([prev, total])
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
          <div className="row lotto-row primary-bg p2-y p2-x" key={`lotto-${lotto.type}-${lottoIndex}`}>
            <div className="col-12 lotto-wrapper">
              <Badge text={lotto.number} backgroundColor={colors.SECONDARY_RED} />
              <div className="p2-x flex">
                <InputNumber
                  hiddenErrorBlock
                  thousandSeparator
                  allowNegative={false}
                  decimalScale={0}
                  name={`values-${lotto.seq}`}
                  onBlur={(event: ChangeEvent<HTMLInputElement>) =>
                    this.handleOnBlurValue(event.target.value, lotto.seq!)}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    this.handleOnChangeValue(event.target.value, lotto.seq!)}
                  value={lotto.value}
                />
              </div>
              <div className="text-center p2-r">
                <h6 className="subtitle-1 secondary-text">{constants.perBath}</h6>
                <h6 className="subtitle-2">x {number.castToMoney(Number(betRate.rate))}</h6>
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
            <div className="col-12 lotto-win-rate-wrapper p2-t">
              <h4>
                <span className="subtitle-1 secondary-text">{constants.win}</span>
                {this.calculateBenefitValue(lotto.value || '0', betRate.rate || '0')}
              </h4>
            </div>
          </div>
        )
      })

      return (
        <div className="row m4-t" key={`lotto-type-${lottosIndex}`}>
          <div className="col">
            <div className="row">
              <div className="col">
                <h4 className="p2-x">{LOTTO_GAME_TYPE_NAME[lottos as TLottoGameType]}</h4>
              </div>
            </div>
            <div className="row m2-t">
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
        <div className="row p2">
          <div className="col m-auto">
            <h4>{constants.defaultValue}</h4>
          </div>
          <div className="col m-auto">
            <InputNumber
              hiddenErrorBlock
              thousandSeparator
              decimalScale={0}
              name="maked-all-value"
              allowNegative={false}
              onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ defaultValue: event.target.value })}
              onBlur={this.handleOnDefaultValueBlur}
              value={this.state.defaultValue}
            />
          </div>
        </div>
        <div className="row p2 primary-bg">
          <div className="col m-auto">
            <h4>{constants.totalToPay}</h4>
          </div>
          <div className="col m-auto text-right">
            <h4>{this.calculateTotalValue()}</h4>
          </div>
        </div>
        <div className="row p2">
          <div className="col m-auto">
            <h4>{constants.totalBenefit}</h4>
          </div>
          <div className="col m-auto text-right">
            <h4>{this.calculateTotalBenefit()}</h4>
          </div>
        </div>
      </>
    )
  }

  render() {
    const LottoListComponent = this.renderLottoList
    const SummaryTotalComponent = this.renderSummaryTotal

    return (
      <div className="m2-b">
        <div className="row">
          <div className="col">
            <div className="summary-maked-list-container secondary-bg p2-b">
              <div className="row">
                <div className="col">
                  <div className="d-flex flex-row align-items-center p2-t p2-x">
                    <h3 className="flex">{constants.lottoListTitle}</h3>
                    <ALink
                      id="goto-maked-history-list"
                      color={colors.PRIMARY_BLUE}
                      onClick={this.handleOnGotoFavoriteSelect}
                    >
                      {constants.historyMakedList}
                      <FontAwesomeIcon icon={faChevronRight} className="ml-1" />
                    </ALink>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="d-flex flex-row justify-content-end p2-x p2-t p1-b">
                    <div>
                      <Button
                        size="small"
                        id="delete-all-lotto"
                        text={constants.clean}
                        onClick={this.handleOnCleanLit}
                        backgroundColor={colors.PRIMARY_RED}
                        backgroundHoverColor={colors.SECONDARY_RED}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row lotto-list-wrapper">
                <div className="col">
                  <LottoListComponent />
                </div>
              </div>
              <div className="row m3-t">
                <div className="col">
                  <SummaryTotalComponent />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <Button
                  id="maked-lotto-submit-button"
                  onClick={this.handleOnClickBet}
                  text={constants.makeLotto}
                  disabled={this.state.betList.length <= 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SummaryLottoComponent