import { DECIMAL_DITGITS, COMMA } from 'constants/regex'

const castToInteger = (numberString: string = '') => {
  const result = numberString.replace(COMMA, '').replace(DECIMAL_DITGITS, '')
  return result
}

const padNumber = (value: string, ditgit: number) => {
  const padString = '0'
  return (value.length >= ditgit)
    ? value
    : new Array(ditgit - value.length + 1).join(padString) + value;
}

const castToMoney = (value: number) => {
  const locals = 'th-TH'
  const currency = 'THB'
  const money = new Intl.NumberFormat(locals, { style: 'currency', currency }).format(value || 0)
  return money
}

export default {
  castToInteger,
  castToMoney,
  padNumber,
}