import { string, object, ObjectSchema } from 'yup'

const constants = {
  phoneNumber: 'กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก',
  username: 'กรุณากรอกชื่อผู้ใช้',
  password: 'กรุณากรอกรหัสผ่าน',
  confirmPassword: 'กรุณากรอกรหัสผ่าน',
  passwordMustEqual: 'กรุณากรอกรหัสผ่านให้เหมือนกัน',
  bankType: 'กรุญาเลือกธนาคาร',
  bankNumber: 'กรุณากรอกหมายเลขบัญชีธนาคาร',
  ownerName: 'กรุญากรอกชื่อเจ้าของบัญชี',
  ownerSurname: 'กรุญากรอกนามสกุล',
}

const scheme: ObjectSchema<IRegister> = object().shape({
  phoneNumber: string().required(constants.phoneNumber),
  username: string().required(constants.username),
  password: string().required(constants.password),
  confirmPassword: string()
    .required(constants.confirmPassword)
    .test(
      'samePasswordRequire',
      constants.passwordMustEqual,
      function (value: string) {
        return (value === this.parent.password)
      }),
  bankType: string().required(constants.bankType),
  bankNumber: string().required(constants.bankNumber),
  ownerName: string().required(constants.ownerName),
  ownerSurname: string().required(constants.ownerSurname),
})

export default scheme