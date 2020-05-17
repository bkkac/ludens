import moment from 'moment'

const convertStringToMoment = () => {
  const momentTime = moment().format()
  return momentTime
}

export default {
  convertStringToMoment,
}