import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  ALink,
  Breadcrumb,
  LottoActionCard,
} from 'components'
import response from 'constants/response'
import { isEmpty, noop } from 'lodash'
import moment from 'moment'
import './lottoSub.style.scss'

const constants = {
  lottoLabel: 'แทงหวย',
  back: '< ย้อนกลับ',
}

const lottoTypes: { [name: string]: string } = {
  yeege: 'ยี่กี',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ISubLottoProps & ISubLottoActionProps = {
  getYeegeGameList() { noop() },
  loader() { noop() },
  getYeegeGameListCode: 0,
  getYeegeGameListError: '',
  getYeegeGameListIsFetching: false,
  yeegeGameList: [],
}

class LottoSubContainer extends Component<
  ISubLottoProps & ISubLottoActionProps & DefaultProps & RouteComponentProps<{ type: string }>,
  ISubLottoState> {

  static defaultProps = defaultProps

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

  handleOnClickPlay = (game: IYeegeGame) => {
    this.props.history.replace('/lotto/making/yeege', { selectedLottoGame: game })
  }

  handleOnClickBreadcrumb = (path: string) => {
    this.props.history.replace(path)
  }

  renderSubLottoList = () => {
    if (!isEmpty(this.props.yeegeGameList)) {
      const ListComponent = this.props.yeegeGameList.map((yeege: IYeegeGame, index) => {
        const yeegeRound = `รอบที่ ${yeege.round}`
        const rangeLabel = 'เวลาที่ปิดรับ'
        const rangeTime = moment(yeege.endTime).format('DD MMM YY HH:mm')
        return (
          <div className="col-6 my-2" key={`sub-${yeege.round}-${index}`}>
            <LottoActionCard
              onClick={() => this.handleOnClickPlay(yeege)}
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
            <ALink color="#ff9b96" bold onClick={() => this.props.history.replace('/lotto')}>
              {constants.back}
            </ALink>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Breadcrumb items={navigates} handleOnClickItem={this.handleOnClickBreadcrumb} />
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