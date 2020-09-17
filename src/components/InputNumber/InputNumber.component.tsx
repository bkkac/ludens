
import React, { FC } from 'react'
import { InputText } from 'components'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

const InputNumberComponent: FC<IInputTextProps & NumberFormatProps> = (props) => {

  const {
    placeholder,
    ...inputProps
  } = props

  return (
    <NumberFormat
      {...inputProps}
      hintText={placeholder}
      placeholder={placeholder}
      customInput={InputText}
    />
  )
}

export default InputNumberComponent