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
import { LOTTO_SLUG_NAME, LOTTO_FLAG_ALPHA, LOTTO_SLUG_TO_TYPE } from 'constants/variables'
import LottoFlags from 'assets/images/global/flags'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './lottoList.style.scss'
import routes from 'constants/routes'

const constants = {
  back: 'กลับ',
  lottoLabel: 'แทงหวย',
  closedLabel: 'เวลาที่ปิดรับ: ',
  openedYeegeLabel: 'เปิดรับ: ',
  closedStatusLabel: 'ปิดรับแทง',
  waitingStatusLabel: 'รอเปิดรับแทง',
  openedYeegeStatusLabel: '24 ชม.',
  round: 'รอบ',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoListProps & ILottoListActionProps = {
  getLottoScheduleIsFetching: false,
  getLottoScheduleCode: 0,
  getLottoScheduleError: '',
  lottoSchedule: [],
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
        : moment(lotto.endTime).add(-7, 'hour').format('DD MMM YY')
    const isCountingDown = (lotto.code === 'LOTTER_YEGEE')
      ? false
      : (lotto.status === 'OPEN')


    // Faking lotto game object
    const lottoGame: ILottoGame = {
      id: 0,
      round: '',
      status: lotto.status,
      createdAt: lotto.startTime,
      endTime: lotto.endTime,
      startTime: lotto.startTime,
    }

    const navigate = (lotto.code === 'LOTTER_YEGEE')
      ? () => this.props.history.push(routes.lottoChrildren.exactPath(lotto.code))
      : (lotto.status === 'OPEN')
        ? () => this.props.history.push(routes.lottoMaking.exactPath(lotto.code), { selectedLottoGame: lottoGame })
        : undefined

    const FlagIcon = LottoFlags[LOTTO_FLAG_ALPHA[LOTTO_SLUG_TO_TYPE[lotto.code]]].Icon
    return (
      <div className="col-12 col-md-6 col-lg-4 m2-t" key={`lotto-${lotto.code}-${index}`}>
        <LottoActionCard
          id={`lotto-${lotto.code}`}
          onClick={navigate}
          title={LOTTO_SLUG_NAME[lotto.code]}
          subTitle={subtitle}
          icon={FlagIcon}
          backgroundColor={backgroundColor}
          status={lotto.status}
          isCountingdown={isCountingDown}
          closedStatusText={constants.closedStatusLabel}
          waitingStatusText={constants.waitingStatusLabel}
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