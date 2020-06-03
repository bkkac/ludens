import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Breadcrumb,
  UsernameText,
  LottoActionCard,
  CreditAmountCard,
} from 'components'
import './lottoSub.style.scss'

const lottosMock: ILottoActionCard[] = [
  { name: 'รอบที่ 1', status: 'available', countdownTime: '00:10:50', rangeTimeLabel: 'ปิดรับ', rangeTime: '16 มี.ค. 63 08:00' },
  { name: 'รอบที่ 2', status: 'available', countdownTime: '00:20:50', rangeTimeLabel: 'ปิดรับ', rangeTime: '16 มี.ค. 63 08:10' },
  { name: 'รอบที่ 3', status: 'available', countdownTime: '00:30:50', rangeTimeLabel: 'ปิดรับ', rangeTime: '16 มี.ค. 63 08:20' },
]

const constants = {
  lottoLabel: 'แทงหวย',
}

const lottoTypes: { [name: string]: string } = {
  yeege: 'ยี่กี',
}

class LottoSubContainer extends Component<RouteComponentProps<{ type: string }>> {

  subLotto = (lottos: ILottoActionCard[]) => {
    const ListComponent = lottos.map((lotto, index) => (
      <div className="col-6 my-2" key={`sub-${lotto.name}-${index}`}>
        <LottoActionCard
          name={lotto.name}
          status={lotto.status}
          countdownTime={lotto.countdownTime}
          rangeTimeLabel={lotto.rangeTimeLabel}
          rangeTime={lotto.rangeTime}
        />
      </div>
    ))
    return (<div className="row">{ListComponent}</div>)
  }

  handleOnClickBreadcrumb = (path: string) => {
    this.props.history.replace(path)
  }

  render() {
    const money = 100
    const username = 'Biwswalker'
    const navigates: IBreadcrumbItem[] = [
      { label: constants.lottoLabel, path: '/lotto' },
      { label: lottoTypes[this.props.match.params.type] || '', active: true },
    ]

    return (
      <div className="container lotto-main-container">
        <div className="row">
          <div className="col d-flex justify-content-center">
            <UsernameText username={username} />
          </div>
        </div>
        <div className="row mt-2 mb-4">
          <div className="col d-flex justify-content-center">
            <CreditAmountCard creditAmount={money} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Breadcrumb items={navigates} handleOnClickItem={this.handleOnClickBreadcrumb} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            {this.subLotto(lottosMock)}
          </div>
        </div>
      </div>
    )
  }
}

export default LottoSubContainer