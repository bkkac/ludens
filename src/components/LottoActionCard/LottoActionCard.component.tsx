import React, { SFC } from 'react'
import { ResponsiveIcon } from 'components'
import './lottoActionCard.style.scss'

const constants = {
  openLotto: 'เปิดแทง',
  closeLotto: 'ปิดรับ',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoActionCard = {
  name: '',
  status: 'unavailable',
  closedTime: '',
  time: '',
}

const LottoActionCard: SFC<ILottoActionCard & DefaultProps> = (props) => {


  const {
    name,
    time,
    status,
    closedTime,
  } = props

  const ClosedTimeBadge = (badgeProps: IClosedTimeBadge) => (
    <div className={`closed-time-badge ${badgeProps.status}`} >
      <span className="closed-time-badge-text">
        {badgeProps.text}
      </span>
    </div>
  )

  const FlagIcon = () => {
    if (false) {
      return <ResponsiveIcon icon="" alt="flag-icon" className="lotto-action-card-flag" />
    }
    return <></>
  }

  return (
    <div className={`lotto-action-card-container ${status}`}>
      <div className="row">
        <div className="my-1 col-12 col-sm-12 col-md-6 lotto-action-name">
          {name} <span><FlagIcon /></span>
        </div>
        <div className="my-1 col-12 col-sm-12 col-md-6 d-flex justify-content-start justify-content-md-end justify-content-lg-end justify-content-xl-end">
          <ClosedTimeBadge status={status} text={closedTime} />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col d-flex flex-column text-left flex-sm-column flex-md-row lotto-status-label justify-content-start justify-content-md-end justify-content-lg-end justify-content-xl-end">
          {constants.openLotto}
          <div className="lotto-status-time pl-md-3">{time}</div>
        </div>
      </div>
      <div className={`lotto-status-bar ${status}`} />
    </div>
  )
}

export default LottoActionCard