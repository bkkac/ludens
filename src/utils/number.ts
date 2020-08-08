import { DECIMAL_DITGITS, COMMA } from 'constants/regex'
import { padStart } from 'lodash'

const castToInteger = (numberString: string = '') => {
  const result = numberString.replace(COMMA, '').replace(DECIMAL_DITGITS, '')
  return result
}

const padNumber = (value: string, ditgit: number) => {
  const padString = '0'
  return padStart(value, ditgit, padString)
}

const castToMoney = (value: number, spacing?: boolean) => {
  const locals = 'th-TH'
  const currency = 'THB'
  const money = new Intl.NumberFormat(locals, { style: 'currency', currency }).format(value || 0)
  if (spacing) {
    return money.replace(/^(\D+)/, '$1 ')
  }
  return money
}

export default {
  castToInteger,
  castToMoney,
  padNumber,
}