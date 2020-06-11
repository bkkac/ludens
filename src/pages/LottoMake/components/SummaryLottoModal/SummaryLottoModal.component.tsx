import React, { SFC, useState, useEffect } from 'react'
import {
  Button,
  ButtonIcon,
  ResponsiveIcon,
} from 'components'
import { groupBy, keys, noop, reduce, sum } from 'lodash'
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

const lottoTypeNames: { [type in ILottoType]: string } = {
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

  const calculateBenefitValue = (betValueString: string) => {
    const betValue = Number(number.castToInteger(betValueString))
    return number.castToMoney(betValue)
  }

  const calculateTotalValue = () => {
    const totally: number = reduce(betList, (prev, curr) => {
      const betValue = Number(number.castToInteger(curr.value || '0'))
      return sum([prev, betValue])
    }, 0)
    return number.castToMoney(totally)
  }

  const RenderLottoList = () => {
    const groupingLottoListObject: { [name in ILottoType]?: ILottoNumber[] } = groupBy<ILottoNumber>(betList, 'type')
    const GroupingLottoListComponent = keys(groupingLottoListObject).map((lottos, lottosIndex) => {
      const LottoListComponent = groupingLottoListObject[lottos as ILottoType]?.map((lotto, lottoIndex) => {
        return (
          <div className="row lotto-row" key={`lotto-${lotto.type}-${lottoIndex}`}>
            <div className="col lotto-wrapper">
              <div>{lotto.number}</div>
              <div>{lotto.value}</div>
              <div>
                <span>{constants.win}</span>
                <span>{calculateBenefitValue(lotto.value || '0')}</span>
              </div>
              <div>
                <div className="delete-lotto-button-container">
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
              <div className="col lotto-name-type">{lottoTypeNames[lottos as ILottoType]}</div>
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
            <div className="trailing-summary pl-2">{100}</div>
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