import {
  string,
  addMethod,
  StringSchema,
} from 'yup'
import { scheme as schemeUtil, number as numberUtil } from 'utils'

// Minimum Money Required
const minimumMoneyRequireName = 'minimumMoneyRequire'
addMethod<StringSchema>(
  string,
  minimumMoneyRequireName,
  function (minimum: number, message: string) {
    return this.test(minimumMoneyRequireName, message, (value) => schemeUtil.minimumRequireTest(value, minimum))
  })

// Maximum Money Required
const maximumMoneyRequireName = 'maximumMoneyRequire'
addMethod<StringSchema>(
  string,
  maximumMoneyRequireName,
  function (maximum: number, message: string) {
    return this.test(maximumMoneyRequireName, message, (value) => schemeUtil.maximumRequireTest(value, maximum))
  })

// Transform Money to Integer string
const transformIntegerMoneyName = 'transformIntegerMoney'
addMethod<StringSchema>(
  string,
  transformIntegerMoneyName,
  function () {
    return this.transform((value) => numberUtil.castToInteger(value))
  })

// Transform Fixed ditgits
const transformFixedDitgitsName = 'transformFixedDitgits'
addMethod<StringSchema>(
  string,
  transformFixedDitgitsName,
  function (ditgits: number) {
    return this.transform((value) => numberUtil.padNumber(numberUtil.castToInteger(value).trim(), ditgits))
  })