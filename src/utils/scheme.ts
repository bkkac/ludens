import { number } from 'utils'

const minimumRequireTest = (inputNumber: string, minimum: number) => {
  const targetNumber: number = Number(number.castToInteger(inputNumber) || 0)
  return minimum <= targetNumber
}

const maximumRequireTest = (inputNumber: string, maximum: number) => {
  const targetNumber: number = Number(number.castToInteger(inputNumber) || 0)
  return maximum >= targetNumber
}

export default {
  minimumRequireTest,
  maximumRequireTest,
}