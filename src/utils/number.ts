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

export default {
  castToInteger,
  padNumber,
}