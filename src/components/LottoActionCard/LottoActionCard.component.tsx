import React, { SFC, useState, useEffect } from 'react'
import { isEmpty, noop, replace, isNaN } from 'lodash'
import { ResponsiveIcon } from 'components'
import moment from 'moment'
import { number } from 'utils'
import './lottoActionCard.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoActionCard = {
  name: '',
  icon: '',
  status: 'CLOSE',
  countdownTime: '',
  rangeTimeLabel: '',
  rangeTime: '',
  onClick() { noop() },
}


const LottoActionCard: SFC<ILottoActionCard & DefaultProps> = (props) => {

  let intervalId: NodeJS.Timeout | null = null

  const {
    name,
    icon,
    status,
    countdownTime,
    rangeTimeLabel,
    rangeTime,
    onClick,
  } = props

  const [remain, setRemain] = useState({ hours: 0, minutes: 0, seconds: 0 })

  const clearLocalInterval = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
    }
  }

  const countingdown = () => {
    const momentEndAt = moment(replace(countdownTime!, /\s/g, ''))
    const momentEndTime = momentEndAt.clone().add(-7, 'hour') // TODO: Temporary
    intervalId = setInterval(() => {
      const duration = moment.duration(momentEndTime.diff(moment()))
      const hours = duration.hours()
      const minutes = duration.minutes()
      const seconds = duration.seconds()

      if (hours <= 0 && minutes <= 0 && seconds < 0) {
        clearLocalInterval()
      } else if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        setRemain({ hours: 0, minutes: 0, seconds: 0 })
        clearLocalInterval()
      } else {
        setRemain({ hours, minutes, seconds })
      }

    }, 1000);
  }

  useEffect(() => {
    countingdown()
    return clearLocalInterval
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    if (status === 'CLOSE') { return }
    onClick!()
  }

  const countdownTimeString = `${number.padNumber(String(remain.hours), 2)}:${number.padNumber(String(remain.minutes), 2)}:${number.padNumber(String(remain.seconds), 2)}`

  return (
    <div className={`lotto-action-card-container ${status}`} onClick={handleOnClick}>
      <div className="row">
        <div className="my-1 col-12 col-sm-12 col-md-6 lotto-action-name">
          {name} <span><FlagIcon /></span>
        </div>
        <div className="my-1 col-12 col-sm-12 col-md-6 d-flex justify-content-start justify-content-md-end justify-content-lg-end justify-content-xl-end">
          <ClosedTimeBadge status={status} text={countdownTimeString} />
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