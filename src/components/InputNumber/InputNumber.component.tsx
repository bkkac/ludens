
import React, { SFC } from 'react'
import { InputText } from 'components'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

const InputNumberComponent: SFC<IInputTextProps & NumberFormatProps> = (props) => {

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