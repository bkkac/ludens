import React, { SFC } from 'react'
import './inputCheckbox.style.scss'

interface IInputCheckbox {
  name: string
  label: string
}

const InputCheckbox: SFC<IInputCheckbox> = (props) => {

  const {
    name,
    label,
  } = props

  return (
    <label className="input-checkbox">
      <span className="checkbox-label">{label}</span>
      <input type="checkbox" className="core-checkbox" name={name} />
      <span className="checkbox-checkmark" />
    </label>
  )
}

export default InputCheckbox