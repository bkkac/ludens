import { string, object, ObjectSchema } from 'yup'

const constants = {
  moneyRequired: 'กรุณากรอกจำนวนเงิน',
  moneyMinimunRequired: 'จำนวนเงินถอนขั้นต่ำ 100 บาท',
}

const scheme: ObjectSchema<IWithdraw> = object().shape({
  money: string()
    .required(constants.moneyRequired)
    .minimumMoneyRequire(100, constants.moneyMinimunRequired)
    .transformIntegerMoney(),
  description: string(),
})

export default scheme