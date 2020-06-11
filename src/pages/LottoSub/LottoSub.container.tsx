import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  ALink,
  Breadcrumb,
  UsernameText,
  LottoActionCard,
  CreditAmountCard,
} from 'components'
import response from 'constants/response'
import { isEmpty } from 'lodash'
import moment from 'moment'
import './lottoSub.style.scss'

const constants = {
  lottoLabel: 'แทงหวย',
  back: '< ย้อนกลับ',
}

const lottoTypes: { [name: string]: string } = {
  yeege: 'ยี่กี',
}

class LottoSubContainer extends Component<
  ISubLottoProps & ISubLottoActionProps & RouteComponentProps<{ type: string }>,
  ISubLottoState> {

  componentDidMount() {
    this.props.loader(true)
    this.props.getYeegeGameList()
  }

  componentDidUpdate(prevProps: ISubLottoProps) {
    if (prevProps.getYeegeGameListIsFetching !== this.props.getYeegeGameListIsFetching
      && !this.props.getYeegeGameListIsFetching) {
      if (this.props.getYeegeGameListCode === response.OK) {
        this.props.loader(false)
      }
    }
  }

  handleOnClickBreadcrumb = (path: string) => {
    this.props.history.replace(path)
  }

  handleOnClickPlay = (path: string) => {
    this.props.history.replace('/lotto/making/yeege')
  }

  renderSubLottoList = () => {
    if (!isEmpty(this.props.yeegeGameList)) {
      const ListComponent = this.props.yeegeGameList.map((yeege: IYeegeGame, index) => {
        const yeegeRound = `รอบที่ ${yeege.round}`
        const rangeLabel = 'ปิดรับ'
        const rangeTime = moment(yeege.endTime).format('DD MMM YY HH:mm')
        return (
          <div className="col-6 my-2" key={`sub-${yeege.round}-${index}`}>
            <LottoActionCard
              onClick={() => this.handleOnClickPlay('')}
              name={yeegeRound}
              status={yeege.status}
              countdownTime={yeege.endTime}
              rangeTimeLabel={rangeLabel}
              rangeTime={rangeTime}
            />
          </div>
        )
      })
      return (<div className="row">{ListComponent}</div>)
    }
    return <></>
  }

  render() {
    const navigates: IBreadcrumbItem[] = [
      { label: constants.lottoLabel, path: '/lotto' },
      { label: lottoTypes[this.props.match.params.type] || '', active: true },
    ]

    return (
      <div className="container lotto-sub-container">
        <div className="row mb-3">
          <div className="col">
            <ALink text={constants.back} color="#ff9b96" bold onClick={() => this.props.history.replace('/lotto')} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Breadcrumb items={navigates} handleOnClickItem={this.handleOnClickBreadcrumb} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col d-flex justify-content-center">
            <UsernameText username={this.props.user.username!} />
          </div>
        </div>
        <div className="row mt-2 mb-4">
          <div className="col d-flex justify-content-center">
            <CreditAmountCard creditAmount={this.props.user.wallet?.money!} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            {this.renderSubLottoList()}
          </div>
        </div>
      </div>
    )
  }
}

export default LottoSubContainer