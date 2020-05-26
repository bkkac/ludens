import React, { Component } from 'react'
import { UsernameText, CreditAmountCard, LottoActionCard } from 'components'
import './lottoMain.style.scss'

// Temporary
declare interface ILottoList {
  name: string
  subLotto: ILottoActionCard[]
}

class LottoMainContainer extends Component {

  renderLottoList = (lottos: ILottoList[]) => lottos.map((lotto, index) => {
    const SubLotto = lotto.subLotto.map((subLotto, subIndex) => (
      <div className="col-6 my-2" key={`sub-${subLotto.name}-${subIndex}`}>
        <LottoActionCard
          name={subLotto.name}
          time={subLotto.time}
          status={subLotto.status}
          closedTime={subLotto.closedTime}
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
          { name: 'ยี่กี', closedTime: '00:10:50', time: '88 รอบ', status: 'active' },
          { name: 'ยี่กี (พื่นบ้าน)', closedTime: '00:20:50', time: '16 มี.ค. 63 18:00', status: 'unavailable' },
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