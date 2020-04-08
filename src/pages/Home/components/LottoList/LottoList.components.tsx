import React from 'react'
import { LottoCard, Button } from 'components'
import TrophyIcon from 'assets/images/home/trophy.png'
import './lottoList.style.scss'

const lottos: ILotto[] = [
  {
    name: 'หวยรัฐบาล',
    code: 'GOVN',
    date: '2020-04-07T16:53:24.648Z',
    updateTime: '2020-04-07T16:53:24.648Z',
    lotto: [
      { name: 'รางวัลที่ 1', numbers: ['439344'] },
      { name: 'สองตัวหลัง', numbers: ['64'] },
      { name: 'สามตัวหน้า', numbers: ['206', '678'] },
      { name: 'สามตัวหน้า', numbers: ['206', '678'] },
    ],
  },
]

const constants = {
  headerTitle: 'ผลรางวัล',
  filtGove: 'หวยรัฐบาล',
  filtBaac: 'หวยธกส',
  filtLao: 'หวยลาว',
  filtThaiBroker: 'หวยหุ้นไทย',
  filtForeBroker: 'หวยหุ้นตปท',
  filyYeege: 'หวยยี่กี',
}

function LottoList() {

  const LottoCardComponents = lottos.map((lotto, index) =>
    <LottoCard key={`lotto-card-${index}`} type="GOVERNMENT" data={lotto} />)

  return (
    <div className="lotto-list-container">
      <div className="row mb-4 px-2">
        <div className="col-4 mb-2 px-1"><Button text={constants.filtGove} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filtBaac} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filtLao} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filtThaiBroker} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filtForeBroker} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filyYeege} type="outline" size="small" /></div>
      </div>
      <div className="row mb-2">
        <div className="col d-flex flex-row align-items-center header-text">
          <img src={TrophyIcon} className="header-icon mr-2" alt="trophy" />
          {constants.headerTitle}
        </div>
      </div>
      {LottoCardComponents}
    </div>
  )
}

export default LottoList