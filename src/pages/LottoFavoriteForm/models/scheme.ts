import { string, object, ObjectSchema } from 'yup'

const constants = {
  titleReq: 'กรุณากรอกชื่อเลขชุด',
  typeReq: 'กรุณาเลือกประเภทแทงหวย',
  numberReq: 'กรุณากรอกเลข',
}

const schemeSet: ObjectSchema<{ title: string }> = object().shape({
  title: string().required(constants.titleReq),
})

const schemeNumber: ObjectSchema<IFavoriteNumberRequest> = object().shape({
  type: string().required(constants.typeReq),
  number: string().required(constants.numberReq),
})

export default {
  set: schemeSet,
  number: schemeNumber,
}