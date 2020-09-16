import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  ALink,
  Breadcrumb,
  LottoActionCard,
} from 'components'
import colors from 'constants/colors'
import routes from 'constants/routes'
import { LOTTO_SLUG_NAME } from 'constants/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { isEmpty, noop } from 'lodash'
import moment from 'moment'
import './lottoListChrildren.style.scss'

const constants = {
  lottoLabel: 'แทงหวย',
  back: 'กลับ',
  round: 'รอบที่',
  closedStatus: 'หมดเวลา',
  closedMakeTime: 'เวลาที่ปิดรับ: ',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoListChrildrenProps & ILottoListChrildrenActionProps = {
  getYeegeGameList() { noop() },
  loader() { noop() },
  getYeegeGameListCode: 0,
  getYeegeGameListError: '',
  getYeegeGameListIsFetching: false,
  yeegeGameList: [],
}

class LottoListChrildrenContainer extends Component<
  ILottoListChrildrenProps
  & ILottoListChrildrenActionProps
  & DefaultProps
  & RouteComponentProps<{ type: TLottoSlug }>>
{

  static defaultProps = defaultProps

  componentDidMount() {
    this.props.loader(false)
    if (this.props.match.params.type === 'LOTTER_YEGEE') {
      this.props.loader(true)
      this.props.getYeegeGameList()
    }
  }

  componentDidUpdate(prevProps: ILottoListChrildrenProps) {
    if (prevProps.getYeegeGameListIsFetching !== this.props.getYeegeGameListIsFetching
      && !this.props.getYeegeGameListIsFetching) {
      this.props.loader(false)
    }
  }

  componentWillUnmount() {
    this.props.loader(false)
  }

  handleOnClickPlay = (game: ILottoGame) => {
    this.props.history.push(routes.lottoMaking.exactPath(this.props.match.params.type), { selectedLottoGame: game })
  }

  handleOnClickBreadcrumb = (path: string) => {
    this.props.history.replace(path)
  }

  renderSubLottoList = () => {
    if (!isEmpty(this.props.yeegeGameList)) {
      const ListComponent = this.props.yeegeGameList.map((yeege: ILottoGame, index) => {
        const yeegeRound = `${constants.round} ${yeege.round}`
        const expireTime = moment.utc(yeege.endTime).format('DD MMM YY HH:mm')

        return (
          <div className="col-12 col-md-6 col-lg-4 m2-t" key={`sub-${yeege.round}-${index}`}>
            <LottoActionCard
              id={`yeege-round-${yeege.round}`}
              onClick={() => this.handleOnClickPlay(yeege)}
              title={yeegeRound}
              subTitle={constants.closedMakeTime}
              status={yeege.status}
              isCountingdown={(yeege.status === 'OPEN')}
              closedStatusText={constants.closedStatus}
              description={expireTime}
              expire={yeege.endTime}
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
      { label: LOTTO_SLUG_NAME[this.props.match.params.type] || '', active: true },
    ]

    return (
      <div className="lotto-sub-container primary-bg">
        <div className="container">
          <div className="row">
            <div className="col">
              <ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={() => this.props.history.replace('/lotto')}>
                <FontAwesomeIcon icon={faChevronLeft} className="m1-r" />
                {constants.back}
              </ALink>
            </div>
          </div>
          <div className="row m3-t">
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
      </div>
    )
  }
}

export default LottoListChrildrenContainer