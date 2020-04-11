import React, { SFC } from 'react'
import { Badge } from 'components'
import moment from 'moment'
import { get } from 'lodash'
import ThaiFlagIcon from 'assets/images/flags/thailand.png'
import './lottoCard.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoCard = {
  type: 'YEEGE',
  data: {
    name: '',
    code: '',
    date: '',
    updateTime: '',
    lotto: [],
  },
}

const LottoCard: SFC<ILottoCard & DefaultProps> = (props) => {

  const { data, type } = props

  const {
    name: lottoName,
    date,
    lotto,
  } = data

  const dateDisplay = moment(date).format('Do MMM YY')

  const NumberComponent = ({ name, numbers }: ILottoNumber) => {
    const Numbers = numbers!.map((num, index) => (
      <div className="row" key={`number-${num}-${index}`}>
        <div className="col text-center lotto">{num}</div>
      </div>
    ))
    return (
      <>
        <div className="row pt-1">
          <div className="col text-center lotto-title">{name}</div>
        </div>
        {Numbers}
      </>
    )
  }

  const LottoNumbersFormat = () => {
    switch (type) {
      case 'GOVERNMENT':
        const govSet1 = get(lotto, '0', { name: '', numbers: '' }) as ILottoNumber
        const govSet2 = get(lotto, '1', { name: '', numbers: '' }) as ILottoNumber
        const govSet3 = get(lotto, '2', { name: '', numbers: '' }) as ILottoNumber
        const govSet4 = get(lotto, '3', { name: '', numbers: '' }) as ILottoNumber

        return (
          <>
            <NumberComponent name={govSet1.name} numbers={govSet1.numbers} />
            <NumberComponent name={govSet2.name} numbers={govSet2.numbers} />
            <div className="row">
              <div className="col">
                <NumberComponent name={govSet3.name} numbers={govSet3.numbers} />
              </div>
              <div className="col">
                <NumberComponent name={govSet4.name} numbers={govSet4.numbers} />
              </div>
            </div>
          </>
        )
      case 'GSB':
      case 'BAAC':
        return (
          <div className="row">
            {lotto.map(({ name, numbers }, index) => (
              <div className="col" key={`bank-${name}-${index}`}>
                <NumberComponent name={name} numbers={numbers} />
              </div>
            ))}
          </div>
        )
      case 'LAO_SET':
        return (
          <>{lotto.map(({ name, numbers }, index) =>
            <NumberComponent key={`lao-${name}-${index}`} name={name} numbers={numbers} />)}</>
        )
      case 'THAI_BROKER':
      case 'FOREIGN_BROKER':
      case 'YEEGE':
        const LottoList = lotto.map(({ name, lotto: lottoNumber = [] }, index) => {
          const Numbers = lottoNumber.map(({ name: numberName, numbers: numberSet }: ILottoNumber) => (
            <div className="col" key={`${numberName}-${index}`}>
              <NumberComponent name={numberName} numbers={numberSet} />
            </div>
          ))
          return (
            <div key={`uni-${name}-${index}`} className="mb-2">
              <div className="row"><div className="col text-center lotto-section">{name}</div></div>
              <div className="row">{Numbers}</div>
            </div>
          )
        })
        return (<>{LottoList}</>)
      default:
        return <></>
    }
  }

  return (
    <div className="col-12 lotto-card-container">
      <div className="row mb-2">
        <div className="col text-left d-flex flex-row align-items-center lotto-name">
          {lottoName}
          <img alt="thailand" src={ThaiFlagIcon} className="flag-icon" />
        </div>
        <div className="col-auto text-right m-auto"><Badge text={dateDisplay} /></div>
      </div>
      <LottoNumbersFormat />
    </div>
  )
}

export default LottoCard