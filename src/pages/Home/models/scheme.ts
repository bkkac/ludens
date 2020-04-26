import { string, object, boolean, ObjectSchema } from 'yup'

const constants = {
  username: 'กรุณากรอกชื่อผู้ใช้',
  password: 'กรุณากรอกรหัสผ่าน',
}

const scheme: ObjectSchema<ILogin> = object().shape({
  username: string().required(constants.username),
  password: string().required(constants.password),
  remember: boolean(),
})

export default scheme