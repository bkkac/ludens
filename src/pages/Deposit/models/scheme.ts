import { string, object, ObjectSchema, number } from 'yup'

const constants = {
  moneyRequired: 'กรุณากรอกจำนวนเงิน',
  moneyMinimunRequired: 'จำนวนเงินถอนขั้นต่ำ 100 บาท',
  depositHoursRequired: 'กรุณากรอกชั่วโมง',
  depositHoursMaximumRequired: 'ชั่วโมงกรอกไม่เกิน 23',
  depositMinutesRequired: 'กรุณากรอกนาที',
  depositMinutesMaximumRequired: 'นาทีกรอกไม่เกิน 59',
  webBankRequired: 'กรุณาเลือกธนาคารที่ต้องการโอนไป',
}

const scheme: ObjectSchema<IDepositForm> = object().shape({
  money: string()
    .required(constants.moneyRequired)
    .transformIntegerMoney(),
  depositHours: string()
    .required(constants.depositHoursRequired)
    .maximumMoneyRequire(23, constants.depositHoursMaximumRequired)
    .transformFixedDitgits(2),
    depositMinutes: string()
    .required(constants.depositMinutesRequired)
    .maximumMoneyRequire(59, constants.depositMinutesMaximumRequired)
    .transformFixedDitgits(2),
  description: string(),
  webBankId: number().required(constants.webBankRequired),
})

export default scheme