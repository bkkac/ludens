import { string, object, ObjectSchema } from 'yup'
import { NUMBER } from 'constants/regex'

const constants = {
  phoneNumber: 'กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก',
  onlyNumber: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
  otp: 'กรุณากรอก OTP',
  otpLenght: 'กรุณากรอกไม่เกิน 6 ตัว',
  username: 'กรุณากรอกชื่อผู้ใช้',
  usernameMinLength: 'กรุณากรอกชื่อผู้ใช้ 6 ตัวขึ้นไป',
  password: 'กรุณากรอกรหัสผ่าน',
  passwordMinLength: 'กรุณากรอกรหัสผ่าน 6 ตัวขึ้นไป',
  confirmPassword: 'กรุณากรอกรหัสผ่าน',
  passwordMustEqual: 'กรุณากรอกรหัสผ่านให้เหมือนกัน',
  bankType: 'กรุญาเลือกธนาคาร',
  bankNumber: 'กรุณากรอกหมายเลขบัญชีธนาคาร',
  ownerName: 'กรุณากรอกชื่อ - นามสกุลเจ้าของบัญชี',
}

const scheme: ObjectSchema<IRegister> = object().shape({
  phoneNumber: string()
    .length(10, constants.phoneNumber)
    .required(constants.phoneNumber)
    .matches(NUMBER, constants.onlyNumber),
  otp: string()
    .length(6, constants.otpLenght)
    .required(constants.otp),
  username: string()
    .min(6, constants.usernameMinLength)
    .required(constants.username),
  password: string()
    .min(6, constants.passwordMinLength)
    .required(constants.password),
  confirmPassword: string()
    .required(constants.confirmPassword)
    .test(
      'samePasswordRequire',
      constants.passwordMustEqual,
      function (value: string) {
        return (value === this.parent.password)
      }),
  affilateRef: string(),
  bankType: string().required(constants.bankType),
  bankNumber: string().required(constants.bankNumber),
  ownerName: string().required(constants.ownerName),
})

export default scheme