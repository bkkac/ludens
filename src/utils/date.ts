import moment, { Moment } from 'moment-timezone'
import { ESCAPED_TIMEZONE } from 'constants/regex'
import { isEmpty, get } from 'lodash'

const convertTimeToMoment = (hours: string = '00', minutes: string = '00'): Moment => {
  const momentTime = moment(`${hours}:${minutes}`, 'HH:mm')
  return momentTime
}

const calibratingTime = (timeasString?: string): Moment => {
  const localTime = moment().local()
  if (isEmpty(timeasString)) { return localTime }

  const localTimezoneArray = localTime.format().match(ESCAPED_TIMEZONE)
  const escapedTimezoneArray = timeasString!.match(ESCAPED_TIMEZONE)

  const servertime = get(escapedTimezoneArray, '0', '')
  const localTimezone = get(localTimezoneArray, '1', '')
  if (isEmpty(servertime)) { return localTime }

  const calibratedTimeString = `${servertime}${localTimezone}`
  const calibratedTime = moment(calibratedTimeString).local()

  return calibratedTime
}

export default {
  convertTimeToMoment,
  calibratingTime,
}