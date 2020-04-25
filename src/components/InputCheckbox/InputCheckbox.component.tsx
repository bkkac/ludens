import React, { SFC } from 'react'
import { noop } from 'lodash'
import './inputCheckbox.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IInputCheckbox = {
  name: '',
  label: '',
  value: false,
  onBlur() { noop() },
  onChange() { noop() },
}

const InputCheckbox: SFC<IInputCheckbox & DefaultProps> = (props) => {

  const {
    name,
    label,
    value,
    onBlur,
    onChange,
  } = props

  return (
    <label className="input-checkbox">
      <span className="checkbox-label">{label}</span>
      <input
        type="checkbox"
        className="core-checkbox"
        name={name}
        checked={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      <span className="checkbox-checkmark" />
    </label>
  )
}

InputCheckbox.defaultProps = defaultProps

export default InputCheckbox