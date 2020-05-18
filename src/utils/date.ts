import moment, { Moment } from 'moment'

const convertTimeToMoment = (hours: string = '00', minutes: string = '00'): Moment => {
  const momentTime = moment(`${hours}:${minutes}`, 'HH:mm')
  return momentTime
}

export default {
  convertTimeToMoment,
}