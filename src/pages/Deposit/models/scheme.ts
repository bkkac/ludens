import { string, object, ObjectSchema } from 'yup'
// import { NUMBER } from 'constants/regex'

// const constants = {
//   phoneNumber: 'กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก',
//   onlyNumber: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
//   otp: 'กรุณากรอก OTP',
//   otpLenght: 'กรุณากรอกไม่เกิน 6 ตัว',
//   username: 'กรุณากรอกชื่อผู้ใช้',
//   usernameMinLength: 'กรุณากรอกชื่อผู้ใช้ 6 ตัวขึ้นไป',
//   password: 'กรุณากรอกรหัสผ่าน',
//   passwordMinLength: 'กรุณากรอกรหัสผ่าน 6 ตัวขึ้นไป',
//   confirmPassword: 'กรุณากรอกรหัสผ่าน',
//   passwordMustEqual: 'กรุณากรอกรหัสผ่านให้เหมือนกัน',
//   bankType: 'กรุญาเลือกธนาคาร',
//   bankNumber: 'กรุณากรอกหมายเลขบัญชีธนาคาร',
//   ownerName: 'กรุญากรอกชื่อเจ้าของบัญชี',
//   ownerSurname: 'กรุญากรอกนามสกุล',
// }

const scheme: ObjectSchema<IDeposit> = object().shape({
  amount: string(),
  bankType: string(),
  depositHours: string(),
  depositMinuite: string(),
  remark: string(),
})

export default scheme