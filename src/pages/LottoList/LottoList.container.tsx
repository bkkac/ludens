import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  ALink,
  Breadcrumb,
  LottoActionCard,
} from 'components'
import moment from 'moment'
import { noop, isEmpty, map } from 'lodash'
import colors from 'constants/colors'
import { LOTTO_SLUG_NAME } from 'constants/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './lottoList.style.scss'

const constants = {
  back: 'กลับ',
  lottoLabel: 'แทงหวย',
  closedLabel: 'เวลาที่ปิดรับ: ',
  openedYeegeLabel: 'เปิดรับ: ',
  closedStatusLabel: 'ปิดรับแทง',
  openedYeegeStatusLabel: '24 ชม.',
  round: 'รอบ',
}

type DefaultProps = Readonly<typeof defaultProps>

const lottos: ILottoSchedule[] = [
  {
    id: 1,
    code: 'LOTTER_YEGEE',
    mode: 'AUTOMATIC',
    status: 'OPEN',
    startTime: '',
    endTime: '',
    updatedAt: '',
  },
  {
    id: 2,
    code: 'LOTTER_GOVN',
    mode: 'AUTOMATIC',
    status: 'CLOSE',
    startTime: '',
    endTime: '',
    updatedAt: '',
  },
]

const defaultProps: ILottoListProps & ILottoListActionProps = {
  getLottoScheduleIsFetching: false,
  getLottoScheduleCode: 0,
  getLottoScheduleError: '',
  lottoSchedule: lottos, // TODO: replace when api integrated
  loader() { noop() },
  getLottoSchedule() { noop() },
}

class LottoListContainer extends Component<
  ILottoListProps & ILottoListActionProps & DefaultProps & RouteComponentProps> {

  static defaultProps = defaultProps

  componentDidMount() {
    this.props.loader(true)
    this.props.getLottoSchedule()
  }

  componentDidUpdate(prevProps: ILottoListProps) {
    if (prevProps.getLottoScheduleIsFetching !== this.props.getLottoScheduleIsFetching
      && !this.props.getLottoScheduleIsFetching) {
      this.props.loader(false)
    }
  }

  renderLottoList = () => map(this.props.lottoSchedule, (lotto, index) => {
    const subtitle = (lotto.code === 'LOTTER_YEGEE') ? constants.openedYeegeLabel : constants.closedLabel
    const backgroundColor = (lotto.code === 'LOTTER_YEGEE') ? colors.SECONDARY_BLUE : colors.SECONDARY_BG
    const description = (lotto.code === 'LOTTER_YEGEE')
      ? `88 ${constants.round}`
      : isEmpty(lotto.endTime)
        ? '-'
        : moment(lotto.endTime).add(-7, 'hour').format('DD MMM YY HH:mm')
    const isCountingDown = (lotto.code === 'LOTTER_YEGEE')
      ? false
      : (lotto.status === 'OPEN')

    const navigate = (lotto.code === 'LOTTER_YEGEE')
      ? () => this.props.history.push(`/lotto/${lotto.code}`)
      : undefined

    return (
      <div className="col-12 col-md-6 col-lg-4 m1-t" key={`lotto-${lotto.code}-${index}`}>
        <LottoActionCard
          onClick={navigate}
          title={LOTTO_SLUG_NAME[lotto.code]}
          subTitle={subtitle}
          backgroundColor={backgroundColor}
          status={lotto.status}
          isCountingdown={isCountingDown}
          closedStatusText={constants.closedStatusLabel}
          openedStatusText={constants.openedYeegeStatusLabel}
          description={description}
          expire={lotto.endTime}
        />
      </div>
    )
  })

  handleOnClickBreadcrumb = (path: string) => {
    this.props.history.replace(path)
  }

  render() {
    const navigates: IBreadcrumbItem[] = [
      { label: constants.lottoLabel, active: true },
    ]

    return (
      <div className="lotto-list-container primary-bg">
        <div className="container">
          <div className="row">
            <div className="col">
              <ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={() => this.props.history.replace('/main')}>
                <FontAwesomeIcon icon={faChevronLeft} className="m1-r" />
                {constants.back}
              </ALink>
            </div>
          </div>
          <div className="row m3-t">
            <div className="col">
              <Breadcrumb items={navigates} />
            </div>
          </div>
          <div className="row m2-t">
            {this.renderLottoList()}
          </div>
        </div>
      </div>
    )
  }
}

export default LottoListContainer