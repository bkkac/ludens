import { string, object, ObjectSchema } from 'yup'

const constants = {
  moneyRequired: 'กรุณากรอกจำนวนเงิน',
  moneyMinimunRequired: 'จำนวนเงินถอนขั้นต่ำ 1 บาท',
  moneyMaximunRequired: 'จำนวนเงินถอนได้ครั้งละไม่เกิน 100,000 บาท',
}

const scheme: ObjectSchema<IWithdraw> = object().shape({
  money: string()
    .required(constants.moneyRequired)
    .minimumMoneyRequire(1, constants.moneyMinimunRequired)
    .maximumMoneyRequire(100000, constants.moneyMaximunRequired)
    .transformIntegerMoney(),
  description: string(),
})

export default scheme