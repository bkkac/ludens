import { camelCase, snakeCase, keys } from 'lodash'

const isArray = (array: any) => Array.isArray(array)

const isObject = (object: any) => object === Object(object) && !isArray(object) && typeof object !== 'function';

const camelcaseTransform = (data: any): { [name: string]: any } | [] => {
  if (isObject(data)) {
    const objectData = data as { [name: string]: any }
    const newObject: { [name: string]: any } = {}
    keys(objectData).forEach((key) => {
      newObject[camelCase(key)] = camelcaseTransform(objectData[key]);
    })
    return newObject
  } else if (isArray(data)) {
    const arrayData = data as []
    const newArray = arrayData.map((i) => camelcaseTransform(i))
    return newArray
  }
  return data
}

const snakecaseTransform = (data: any): { [name: string]: any } | [] => {
  if (isObject(data)) {
    const objectData = data as { [name: string]: any }
    const newObject: { [name: string]: any } = {}
    keys(objectData).forEach((key) => {
      newObject[snakeCase(key)] = snakecaseTransform(objectData[key]);
    })
    return newObject
  } else if (isArray(data)) {
    const arrayData = data as []
    const newArray = arrayData.map((i) => snakecaseTransform(i))
    return newArray
  }
  return data
}

export default {
  camelcaseTransform,
  snakecaseTransform,
}