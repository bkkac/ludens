import React, { SFC, useState, useEffect } from 'react'
import { replace, isNaN } from 'lodash'
import { ResponsiveIcon, Badge } from 'components'
import colors from 'constants/colors'
import moment from 'moment'
import { number } from 'utils'
import './lottoActionCard.style.scss'

const constants = {
  day: 'วัน',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoActionCard = {
  id: '',
  title: '',
  subTitle: '',
  isCountingdown: false,
  expire: '',
  status: 'UNKNOWN',
  openedStatusText: '',
  waitingStatusText: '',
  closedStatusText: '',
  description: '',
  backgroundColor: colors.SECONDARY_BG,
  icon: '',
}

const LottoActionCard: SFC<ILottoActionCard & DefaultProps> = (props) => {

  const {
    id,
    title,
    subTitle,
    isCountingdown,
    expire,
    status,
    openedStatusText,
    waitingStatusText,
    closedStatusText,
    backgroundColor,
    description,
    icon,
    onClick,
  } = props

  let intervalId: NodeJS.Timeout | null = null

  const [remain, setRemain] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const clearLocalInterval = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
    }
  }

  const countingdown = () => {
    clearLocalInterval()

    if (isCountingdown) {
      const expireMoment = moment(replace(expire!, /\s/g, ''))
      const expireWithCastTimezone = expireMoment.clone().add(-7, 'hour')
      intervalId = setInterval(() => {
        const duration = moment.duration(expireWithCastTimezone.diff(moment()))
        const days = duration.days()
        const hours = duration.hours()
        const minutes = duration.minutes()
        const seconds = duration.seconds()

        if ((hours <= 0 && minutes <= 0 && seconds <= 0)
          || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
          setRemain({ days: 0, hours: 0, minutes: 0, seconds: 0 })
          clearLocalInterval()
        } else {
          setRemain({ days, hours, minutes, seconds })
        }
      }, 1000);
    }
  }

  useEffect(() => {
    if (isCountingdown) {
      countingdown()
    }
    return clearLocalInterval
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCountingdown])

  const BadgeComponent = ({ text }: { text: string }) => {
    if (status === 'OPEN') {
      return <Badge text={text} backgroundColor={colors.PRIMARY_GREEN} color={colors.PRIMARY_TEXT} />
    } else if (status === 'CLOSE') {
      return <Badge text={text} backgroundColor={colors.SECONDARY_RED} color={colors.PRIMARY_TEXT} />
    } else if (status === 'WAIT') {
      return <Badge text={text} backgroundColor={colors.SECONDARY_BLUE} color={colors.PRIMARY_TEXT} />
    } else if (status === 'UNKNOWN') {
      return <Badge text={text} backgroundColor={colors.PRIMARY_BG} color={colors.PRIMARY_TEXT} />
    }
    return <></>
  }

  const handleOnClick = () => {
    if (typeof onClick === 'function') {
      onClick()
    }
  }

  const statusText = (): string => {
    if (isCountingdown) {
      if (remain.days > 0) { return `${number.padNumber(String(remain.hours), 2)} ${constants.day}` }
      return `${number.padNumber(String(remain.hours), 2)}:${number.padNumber(String(remain.minutes), 2)}:${number.padNumber(String(remain.seconds), 2)}`
    } else if (status === 'OPEN') {
      return openedStatusText || ''
    } else if (status === 'WAIT') {
      return waitingStatusText || ''
    } else if (status === 'CLOSE') {
      return closedStatusText || ''
    }
    return '-'
  }

  return (
    <div
      className={`lotto-action-card-container ${typeof onClick === 'function' ? '' : 'disabled'} ${status}`}
      style={{ backgroundColor }}
      onClick={handleOnClick}
      id={id}
    >
      <div className="sub-background" />
      <div className="lotto-action-text-wrapper">
        <ResponsiveIcon icon={icon!} alt="flag" className="lotto-action-card-flag m2-r" />
        <h3 className="d-flex flex">
          {title}
        </h3>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <h6 className="sub-title-label">{subTitle}<span className="subtitle-1 primary-text">{description}</span></h6>
        <BadgeComponent text={statusText()} />
      </div>
    </div>
  )
}

LottoActionCard.defaultProps = defaultProps

export default LottoActionCard