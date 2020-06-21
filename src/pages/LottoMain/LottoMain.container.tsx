import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  ALink,
  Breadcrumb,
  LottoActionCard,
} from 'components'
import './lottoMain.style.scss'
import { noop } from 'lodash'

const constants = {
  back: '< ย้อนกลับ',
  lottoLabel: 'แทงหวย',
}
// Temporary
declare interface ILottoList {
  name: string
  subLotto: ILottoActionCard[]
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IMainLottoProps & IMainLottoActionProps = {
  loader() { noop() },
}

class LottoMainContainer extends Component<
  IMainLottoProps & IMainLottoActionProps & DefaultProps & RouteComponentProps<{}>,
  IMainLottoState> {

  static defaultProps = defaultProps

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

  handleOnClickBreadcrumb = (path: string) => {
    this.props.history.replace(path)
  }

  render() {
    const lottos: ILottoList[] = [
      {
        name: 'หวยยี่กี',
        subLotto: [
          {
            name: 'ยี่กี', status: 'OPEN', countdownTime: 'N/A',
            rangeTimeLabel: 'เปิดรับ', rangeTime: '88 รอบ',
          },
          {
            name: 'ยี่กี (พื้นบ้าน)', status: 'CLOSE', countdownTime: 'N/A',
            rangeTimeLabel: 'เปิดรับ', rangeTime: '88 รอบ',
          },
        ],
      },
    ]

    const navigates: IBreadcrumbItem[] = [
      { label: constants.lottoLabel, active: true },
    ]

    return (
      <div className="container lotto-main-container">
        <div className="row mb-3">
          <div className="col">
            <ALink color="#ff9b96" bold onClick={() => this.props.history.replace('/main')}>
              {constants.back}
            </ALink>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Breadcrumb items={navigates} />
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