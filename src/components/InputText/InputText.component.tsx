import React, { Component, ComponentClass } from 'react'
import { noop } from 'lodash'
import './inputText.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IInputTextProps = {
  placeholder: '',
  type: 'text',
  name: '',
  value: '',
  errorMessage: '',
  error: false,
  disabled: false,
  useNumberpad: false,
  hiddenErrorBlock: false,
  onBlur() { noop() },
  onChange() { noop() },
}

const InputText = class extends Component<IInputTextProps & DefaultProps> {

  static defaultProps = defaultProps

  render() {
    const {
      name,
      value,
      onBlur,
      onChange,
      type,
      error,
      hiddenErrorBlock,
      useNumberpad,
      errorMessage,
      placeholder,
      disabled,
    } = this.props

    const hasErrorClass = error ? 'error' : ''

    const Message = () => hiddenErrorBlock
      ? <></>
      : <div className="input-error-message">{errorMessage}</div>

    return (
      <div className={`input-text ${hasErrorClass}`}>
        <input
          disabled={disabled}
          id={name}
          name={name}
          type={type}
          value={value}
          autoCapitalize="none"
          pattern={useNumberpad ? '\\d*' : undefined}
          onBlur={onBlur}
          onChange={onChange}
          className="input-core"
          placeholder={placeholder}
        />
        <div className="input-underline" />
        <Message />
      </div>
    )
  }
} as ComponentClass<IInputTextProps>

export default InputText