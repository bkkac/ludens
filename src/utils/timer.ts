import moment from 'moment'

/**
 * Use 'clearInterval(interval)' to destroy all time when countdown success
 * @param timeRange
 * @param callback
 */
export const intervalDuration = (
  timeRange: moment.Moment,
  callback: (interval: NodeJS.Timeout, duration: moment.Duration) => void
) => {
  const coreInterval = setInterval(() => {
    callback(coreInterval, moment.duration(timeRange.diff(moment())))
  }, 1000);
}

export default {
  intervalDuration,
}