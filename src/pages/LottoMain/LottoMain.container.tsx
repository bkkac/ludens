import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  UsernameText,
  LottoActionCard,
  CreditAmountCard,
} from 'components'
import './lottoMain.style.scss'

// Temporary
declare interface ILottoList {
  name: string
  subLotto: ILottoActionCard[]
}

class LottoMainContainer extends Component<RouteComponentProps> {

  renderLottoList = (lottos: ILottoList[]) => lottos.map((lotto, index) => {
    const SubLotto = lotto.subLotto.map((subLotto, subIndex) => (
      <div className="col-6 my-2" key={`sub-${subLotto.name}-${subIndex}`}>
        <LottoActionCard
          onClick={() => this.props.history.push('/lotto/yeege')}
          name={subLotto.name}
          status={subLotto.status}
          countdownTime={subLotto.countdownTime}
          rangeTimeLabel={subLotto.rangeTimeLabel}
          rangeTime={subLotto.rangeTime}
        />
      </div>
    ))
    return (
      <div className="lotto-card-wrapper" key={`${lotto.name}-${index}`}>
        <div className="lotto-name-lebel mb-2">{lotto.name}</div>
        <div className="row">
          {SubLotto}
        </div>
      </div>
    )
  })

  render() {
    const money = 100
    const username = 'Biwswalker'

    const lottos: ILottoList[] = [
      {
        name: 'หวยยี่กี',
        subLotto: [
          {
            name: 'ยี่กี', status: 'available', countdownTime: '00:10:50',
            rangeTimeLabel: 'เปิดรับ', rangeTime: '88 รอบ',
          },
          {
            name: 'ยี่กี (พื่นบ้าน)', status: 'available', countdownTime: '01:10:50',
            rangeTimeLabel: 'เปิดรับ', rangeTime: '88 รอบ',
          },
        ],
      },
    ]

    return (
      <div className="container lotto-main-container">
        <div className="row">
          <div className="col d-flex justify-content-center">
            <UsernameText username={username} />
          </div>
        </div>
        <div className="row mt-2 mb-5">
          <div className="col d-flex justify-content-center">
            <CreditAmountCard creditAmount={money} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            {this.renderLottoList(lottos)}
          </div>
        </div>
      </div>
    )
  }
}

export default LottoMainContainer