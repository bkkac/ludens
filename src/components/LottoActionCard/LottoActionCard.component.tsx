import React, { SFC } from 'react'
import { isEmpty, noop } from 'lodash'
import { ResponsiveIcon } from 'components'
import './lottoActionCard.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoActionCard = {
  name: '',
  icon: '',
  status: 'unavailable',
  countdownTime: '',
  rangeTimeLabel: '',
  rangeTime: '',
  onClick() { noop() },
}

const LottoActionCard: SFC<ILottoActionCard & DefaultProps> = (props) => {

  const {
    name,
    icon,
    status,
    countdownTime,
    rangeTimeLabel,
    rangeTime,
    onClick,
  } = props

  const ClosedTimeBadge = (badgeProps: IClosedTimeBadge) => (
    <div className={`closed-time-badge ${badgeProps.status}`} >
      <span className="closed-time-badge-text">
        {badgeProps.text}
      </span>
    </div>
  )

  const FlagIcon = () => {
    if (!isEmpty(icon)) { return <ResponsiveIcon icon={icon!} alt="flag-icon" className="lotto-action-card-flag" /> }
    return <></>
  }

  const handleOnClick = () => {
    if (status === 'unavailable') { return }
    onClick!()
  }

  return (
    <div className={`lotto-action-card-container ${status}`} onClick={handleOnClick}>
      <div className="row">
        <div className="my-1 col-12 col-sm-12 col-md-6 lotto-action-name">
          {name} <span><FlagIcon /></span>
        </div>
        <div className="my-1 col-12 col-sm-12 col-md-6 d-flex justify-content-start justify-content-md-end justify-content-lg-end justify-content-xl-end">
          <ClosedTimeBadge status={status} text={countdownTime} />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col d-flex flex-column text-left flex-sm-column flex-md-row lotto-status-label justify-content-start justify-content-md-end justify-content-lg-end justify-content-xl-end">
          {rangeTimeLabel}
          <div className="lotto-status-time pl-md-3">{rangeTime}</div>
        </div>
      </div>
      <div className={`lotto-status-bar ${status}`} />
    </div>
  )
}

LottoActionCard.defaultProps = defaultProps

export default LottoActionCard