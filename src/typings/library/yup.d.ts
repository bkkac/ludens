import { StringSchema } from 'yup'

declare module 'yup' {
  interface StringSchema {
    minimumMoneyRequire(minimum: number, message: string): StringSchema
    maximumMoneyRequire(maximum: number, message: string): StringSchema
    transformIntegerMoney(): StringSchema
    transformFixedDitgits(ditgits: number): StringSchema
  }
}