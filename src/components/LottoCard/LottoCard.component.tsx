import React, { SFC } from 'react'
import { Badge } from 'components'
import moment from 'moment'
import { get } from 'lodash'
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

// const lottoSection = ''

// const lottos: ILotto[] = [
//   {
//     name: 'หวยรัฐบาล',
//     code: 'GOVN',
//     date: '2020-04-07T16:53:24.648Z',
//     updateTime: '2020-04-07T16:53:24.648Z',
//     lotto: [
//       { name: 'รางวัลที่ 1', numbers: ['439344'] },
//       { name: 'สองตัวหลัง', numbers: ['64'] },
//       { name: 'สามตัวหน้า', numbers: ['206', '678'] },
//       { name: 'สามตัวหน้า', numbers: ['206', '678'] },
//     ],
//   },
//   {
//     name: 'หวยธกส',
//     code: 'BAAC',
//     date: '2020-04-07T16:53:24.648Z',
//     updateTime: '2020-04-07T16:53:24.648Z',
//     lotto: [
//       { name: 'สองตัวล่าง', numbers: ['99'] },
//       { name: 'สามตัวหน้า', numbers: ['206'] },
//     ],
//   },
//   {
//     name: 'หวยหุ้นไทย',
//     code: 'BROKER_TH',
//     date: '2020-04-07T16:53:24.648Z',
//     updateTime: '2020-04-07T16:53:24.648Z',
//     lotto: [
//       {
//         name: 'หุ้นไทยเช้า',
//         lotto: [
//           { name: 'สามตัวบน', numbers: ['949'] },
//           { name: 'สองตัวล่าง', numbers: ['20'] },
//         ],
//       },
//       {
//         name: 'หุ้นไทยเที่ยง',
//         lotto: [
//           { name: 'สามตัวบน', numbers: ['949'] },
//           { name: 'สองตัวล่าง', numbers: ['20'] },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'หวยยี่กี',
//     code: 'YEEGE',
//     date: '2020-04-07T16:53:24.648Z',
//     updateTime: '2020-04-07T16:53:24.648Z',
//     lotto: [
//       {
//         name: '1',
//         lotto: [
//           { name: 'สามตัวบน', numbers: ['949'] },
//           { name: 'สองตัวล่าง', numbers: ['20'] },
//         ],
//       },
//       {
//         name: '2',
//         lotto: [
//           { name: 'สามตัวบน', numbers: ['949'] },
//           { name: 'สองตัวล่าง', numbers: ['20'] },
//         ],
//       },
//     ],
//   },
// ]

const LottoCard: SFC<ILottoCard & DefaultProps> = (props) => {

  const { data } = props

  const {
    name: lottoName,
    date,
    lotto,
  } = data

  const dateDisplay = moment(date).format('Do MMM YY')

  const LottoNumberComponent = ({ name, numbers }: ILottoNumber) => {
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

  const numbersSet1 = get(lotto, '0', { name: '', numbers: '' }) as ILottoNumber
  const numbersSet2 = get(lotto, '1', { name: '', numbers: '' }) as ILottoNumber
  const numbersSet3 = get(lotto, '2', { name: '', numbers: '' }) as ILottoNumber
  const numbersSet4 = get(lotto, '3', { name: '', numbers: '' }) as ILottoNumber

  return (
    <div className="col-12 lotto-card-container">
      <div className="row mb-2">
        <div className="col text-left d-flex flex-row align-items-center lotto-name">{lottoName}<div className="flag-icon" /></div>
        <div className="col-auto text-right m-auto"><Badge text={dateDisplay} /></div>
      </div>
      <LottoNumberComponent name={numbersSet1.name} numbers={numbersSet1.numbers} />
      <LottoNumberComponent name={numbersSet2.name} numbers={numbersSet2.numbers} />
      <div className="row">
        <div className="col">
          <LottoNumberComponent name={numbersSet3.name} numbers={numbersSet3.numbers} />
        </div>
        <div className="col">
          <LottoNumberComponent name={numbersSet4.name} numbers={numbersSet4.numbers} />
        </div>
      </div>
    </div>
  )
}

export default LottoCard