import React, { SFC, useState, useEffect } from 'react'
import {
  Button,
  ButtonIcon,
  ResponsiveIcon,
} from 'components'
import { groupBy, keys, noop, reduce, sum, filter } from 'lodash'
import { number } from 'utils'
import './summaryLottoModal.style.scss'

import CloseIcon from 'assets/images/global/closePink/closePink.png'
import CloseIcon2x from 'assets/images/global/closePink/closePink@2x.png'
import CloseIcon3x from 'assets/images/global/closePink/closePink@3x.png'

const constants = {
  lottoListTitle: 'รายหารแทง',
  win: 'ชนะ',
  makeLotto: 'แทงหวย',
  defaultValue: 'เดิมพันราคาเท่ากัน',
  totalToPay: 'จำนวนเงินทั้งหมด',
}

const lottoTypeNames: { [type in TLottoGameType]: string } = {
  RUN_UP: 'วงบน',
  RUN_DOWN: 'วงลาง',
  THREE_TOAST: 'สามตวโตท',
  THREE_UP: 'สามตวบน',
  TWO_DOWN: 'สองตวลาง',
  TWO_UP: 'สองตวบน',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ISummaryLottoModalProps = {
  lottoList: [],
  onClickBet() { noop() },
  onClickClose() { noop() },
}

const SummaryLottoModal: SFC<ISummaryLottoModalProps & DefaultProps> = ({
  lottoList,
  onClickBet,
  onClickClose,
}) => {

  const [betList, setBetList] = useState<ILottoNumber[]>([])

  useEffect(() => {
    setBetList(lottoList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnClickBet = () => {
    onClickBet(betList)
  }

  const handleOnClickClose = () => {
    onClickClose(betList)
  }

  const handleOnRemove = (seq: number) => {
    const newBetList: ILottoNumber[] = filter<ILottoNumber>(betList, (_, index) => index !== seq)
    setBetList(newBetList)
  }

  const calculateBenefitValue = (betValueString: string = '0') => {
    const betValue = Number(number.castToInteger(betValueString)) || 0
    const calculatedBenefit = 1.2 * betValue // TODO: Temp
    return number.castToMoney(calculatedBenefit)
  }

  const calculateTotalValue = () => {
    const totally: number = reduce(betList, (prev, curr) => {
      const betValue = Number(number.castToInteger(curr.value || '0'))
      return sum([prev, betValue])
    }, 0)
    return number.castToMoney(totally)
  }

  const RenderLottoList = () => {
    const groupingLottoListObject: { [name in TLottoGameType]?: (ILottoNumber & { seq?: number })[] }
      = groupBy<(ILottoNumber & { seq?: number })>(betList.map((bet, betIndex) => ({ ...bet, seq: betIndex })), 'type')
    const GroupingLottoListComponent = keys(groupingLottoListObject).map((lottos, lottosIndex) => {
      const LottoListComponent = groupingLottoListObject[lottos as TLottoGameType]?.map((lotto, lottoIndex) => {
        return (
          <div className="row lotto-row" key={`lotto-${lotto.type}-${lottoIndex}`}>
            <div className="col lotto-wrapper">
              <div className="lotto-number-text">{lotto.number}</div>
              <div className="lotto-value-wrapper">
                <div className="lotto-value-container">
                  {lotto.value}
                </div>
              </div>
              <div className="lotto-rate-text">x 0.2</div>
              <div className="lotto-win-label">{constants.win}</div>
              <div className="lotto-benefit-text">{calculateBenefitValue(lotto.value || '0')}</div>
              <div className="lotto-remove-wrapper">
                <div className="delete-lotto-button-container" onClick={() => handleOnRemove(lotto.seq!)}>
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
              <div className="col lotto-name-type">{lottoTypeNames[lottos as TLottoGameType]}</div>
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

  const RenderSummaryTotal = () => {
    return (
      <>
        <div className="row summary-lotto-row mx-4">
          <div className="col summary-lotto-wrapper">
            <div className="leading-summary pl-2">{constants.defaultValue}</div>
            <div className="trailing-summary-wrapper">
              <div className="trailing-summary-value-container">
                {100}
              </div>
            </div>
          </div>
        </div>
        <div className="row summary-lotto-row mx-4">
          <div className="col summary-lotto-wrapper">
            <div className="leading-summary pl-2">{constants.totalToPay}</div>
            <div className="trailing-summary pl-2">{calculateTotalValue()}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col summary-lotto-modal-container px-3 py-4">
          <div className="row">
            <div className="col">
              <span className="summary-lotto-modal-title">{constants.lottoListTitle}</span>
            </div>
            <div className="col d-flex justify-content-end">
              <ButtonIcon type="close" onClick={handleOnClickClose} />
            </div>
          </div>
          <RenderLottoList />
          <div className="row mt-5">
            <div className="col">
              <RenderSummaryTotal />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <Button onClick={handleOnClickBet} text={constants.makeLotto} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SummaryLottoModal.defaultProps = defaultProps

export default SummaryLottoModal