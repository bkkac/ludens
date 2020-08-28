import { string, object, ObjectSchema } from 'yup'

const constants = {
  moneyRequired: 'กรุณากรอกจำนวนเงิน',
  moneyMinimunRequired: 'จำนวนเงินถอนขั้นต่ำ 1 บาท',
}

const scheme: ObjectSchema<IWithdraw> = object().shape({
  money: string()
    .required(constants.moneyRequired)
    .minimumMoneyRequire(1, constants.moneyMinimunRequired)
    .transformIntegerMoney(),
  description: string(),
})

export default scheme