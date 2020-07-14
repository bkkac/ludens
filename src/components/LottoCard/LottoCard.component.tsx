import React, { SFC } from 'react'
import { Badge } from 'components'
import moment from 'moment'
import { get } from 'lodash'
import colors from 'constants/colors'
import ThaiFlagIcon from 'assets/images/flags/thailand.png'
import './lottoCard.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoCard = {
  type: 'YEEGE',
  data: {
    name: '',
    code: '',
    updateTime: '',
    lotto: [],
  },
}

const LottoCard: SFC<ILottoCard & DefaultProps> = (props) => {

  const { data, type } = props

  const {
    name: lottoName,
    updateTime,
    lotto,
  } = data

  // const dateDisplay = moment(replace(updateTime, /\s/g, '')).format('Do MMM YY')
  const dateDisplay = moment(updateTime, 'YYYY-MM-DD').format('Do MMM YY')

  const NumberComponent = ({ name, numbers }: ILottoResult) => {
    const Numbers = numbers!.map((num, index) => (
      <div className="row" key={`number-${num}-${index}`}>
        <div className="col text-center"><h1 className="lotto secondary-blue-text">{num}</h1></div>
      </div>
    ))
    return (
      <>
        <div className="row pt-1">
          <div className="col text-center lotto-title">
            <h5 className="secondary-text">{name}</h5>
          </div>
        </div>
        {Numbers}
      </>
    )
  }

  const LottoNumbersFormat = () => {
    switch (type) {
      case 'GOVN':
        const govSet1 = get(lotto, '0', { name: '', numbers: '' }) as ILottoResult
        const govSet2 = get(lotto, '1', { name: '', numbers: '' }) as ILottoResult
        const govSet3 = get(lotto, '2', { name: '', numbers: '' }) as ILottoResult
        const govSet4 = get(lotto, '3', { name: '', numbers: '' }) as ILottoResult

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
      case 'LAO':
        return (
          <>{lotto.map(({ name, numbers }, index) =>
            <NumberComponent key={`lao-${name}-${index}`} name={name} numbers={numbers} />)}</>
        )
      case 'THAI_BROKER':
      case 'FOREIGN_BROKER':
      case 'YEEGE':
        const LottoList = lotto.map(({ name, lotto: lottoNumber = [] }, index) => {
          const Numbers = lottoNumber.map(({ name: numberName, numbers: numberSet }: ILottoResult) => (
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
    <div className="col-12">
      <div className="lotto-card-container secondary-bg p3">
        <div className="row mb-2">
          <div className="col text-left d-flex flex-row align-items-center">
            <h3>{lottoName}</h3>
            <img alt="thailand" src={ThaiFlagIcon} className="flag-icon" />
          </div>
          <div className="col-auto text-right m-auto">
            <Badge text={dateDisplay} backgroundColor={colors.PRIMARY_GREEN} />
            </div>
        </div>
        <LottoNumbersFormat />
      </div>
    </div>
  )
}

export default LottoCard