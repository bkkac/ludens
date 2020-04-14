import React, { SFC } from 'react'
import { LottoCard, Button } from 'components'
import TrophyIcon from 'assets/images/home/trophy.png'
import './lottoList.style.scss'

const constants = {
  headerTitle: 'ผลรางวัล',
  filtGove: 'หวยรัฐบาล',
  filtBaac: 'หวยธกส',
  filtGsb: 'หวยออมสิน',
  filtLao: 'หวยลาว',
  filtHanoi: 'หวยฮานอย',
  filtThaiBroker: 'หุ้นไทย',
  filtForeBroker: 'หุ้นตปท',
  filyYeege: 'หวยยี่กี',
  filyYeegeUni: 'หวยยี่กีพื้นบ้าน',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoListProps = {
  data: [],
}

const LottoList: SFC<ILottoListProps & DefaultProps> = (props) => {

  const LottoCardComponents = props.data.map((lotto, index) =>
    <div key={`lotto-card-${index}`} className="mt-3"><LottoCard type={lotto.code as LottoType} data={lotto} /></div>)

  return (
    <div className="lotto-list-container">
      <div className="row mb-4 px-2">
        <div className="col-4 mb-2 px-1"><Button text={constants.filtGove} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filtBaac} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filtGsb} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filtLao} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filtHanoi} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filtThaiBroker} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filtForeBroker} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filyYeege} type="outline" size="small" /></div>
        <div className="col-4 mb-2 px-1"><Button text={constants.filyYeegeUni} type="outline" size="small" /></div>
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

LottoList.defaultProps = defaultProps

export default LottoList