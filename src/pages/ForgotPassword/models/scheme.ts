import { string, object, ObjectSchema } from 'yup'
import { NUMBER, ENG, LOWERCASE } from 'constants/regex'

const constants = {
  username: 'กรุณากรอกชื่อผู้ใช้',
  usernameMinLength: 'กรุณากรอกชื่อผู้ใช้ 6 ตัวขึ้นไป',
  phoneNumber: 'กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก',
  onlyNumber: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
  otp: 'กรุณากรอก OTP',
  otpLenght: 'กรุณากรอกไม่เกิน 6 ตัว',

  password: 'กรุณากรอกรหัสผ่าน',
  passwordMinLength: 'กรุณากรอกรหัสผ่าน 6 ตัวขึ้นไป',
  confirmPassword: 'กรุณากรอกรหัสผ่าน',
  passwordMustEqual: 'กรุณากรอกรหัสผ่านให้เหมือนกัน',

  lowercase: 'กรุณากรอกเฉพาะตัวหนังสือตัวเล็ก',
  englishRequire: 'กรุณากรอกเฉพาะตัวหนังสือภาษาอังกฤษและตัวเลข',
}

const scheme: ObjectSchema<IForgotPasswordForm> = object().shape({
  username: string()
    .min(6, constants.usernameMinLength)
    .matches(ENG, constants.englishRequire)
    .matches(LOWERCASE, constants.lowercase)
    .required(constants.username),
  phoneNumber: string()
    .length(10, constants.phoneNumber)
    .required(constants.phoneNumber)
    .matches(NUMBER, constants.onlyNumber),
  otp: string()
    .required(constants.otp),
  newPassword: string()
    .min(6, constants.passwordMinLength)
    .required(constants.password),
  confirmNewPassword: string()
    .required(constants.confirmPassword)
    .test(
      'samePasswordRequire',
      constants.passwordMustEqual,
      function (value: string) {
        return (value === this.parent.newPassword)
      }),
})

export default scheme