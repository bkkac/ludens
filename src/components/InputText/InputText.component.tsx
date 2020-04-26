import React, { Component, ComponentClass } from 'react'
import { noop } from 'lodash'
import { isEmpty } from 'lodash'
import './inputText.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IInputProps = {
  error: false,
  type: 'text',
  placeholder: '',
  name: '',
  icon: '',
  value: '',
  errorMessage: '',
  onBlur() { noop() },
  onChange() { noop() },
  useNumberpad: false,
}

const InputText = class extends Component<IInputProps & DefaultProps> {

  static defaultProps = defaultProps

  render() {
    const {
      name,
      value,
      onBlur,
      onChange,
      icon,
      type,
      error,
      errorMessage,
      placeholder,
      useNumberpad,
    } = this.props

    const RenderIcon = () => isEmpty(icon)
      ? <></>
      : <img alt={`input-icon-${name}`} className="input-icon" src={icon} />

    const hasErrorClass = error ? 'error' : ''
    return (
      <div className={`col input-text ${hasErrorClass}`}>
        <input
          name={name}
          type={type}
          value={value}
          pattern={useNumberpad ? '\\d*' : undefined}
          onBlur={onBlur}
          onChange={onChange}
          className="input-core"
          placeholder={placeholder}
          style={{ paddingLeft: isEmpty(icon) ? 11 : 32 }}
        />
        <div className="input-placehoder-wrapper d-flex">
          <RenderIcon />
          <div className="input-placehoder-label-wrapper">
            <div className="input-placehoder-label">{placeholder}</div>
          </div>
        </div>
        <div className="input-underline" />
        <div className="input-error-message">{errorMessage}</div>
      </div>
    )
  }
} as ComponentClass<IInputProps>

export default InputText