import React, { Component, ComponentClass, ChangeEvent } from 'react'
import { noop } from 'lodash'
import './inputText.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IInputTextProps = {
  placeholder: '',
  type: 'text',
  name: '',
  value: '',
  errorMessage: '',
  toLowercase: false,
  error: false,
  disabled: false,
  useNumberpad: false,
  hiddenErrorBlock: false,
  onBlur() { noop() },
  onChange() { noop() },
  setFieldValue() { noop() },
}

const InputText = class extends Component<IInputTextProps & DefaultProps> {

  static defaultProps = defaultProps

  render() {
    const {
      name,
      value,
      onBlur,
      onChange,
      setFieldValue,
      type,
      error,
      hiddenErrorBlock,
      useNumberpad,
      errorMessage,
      placeholder,
      disabled,
      toLowercase,
    } = this.props

    const hasErrorClass = error ? 'error' : ''

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (toLowercase) {
        const fieldValue = (event.target.value || '').toLowerCase()
        const fieldName = event.target.name
        setFieldValue!(fieldName, fieldValue)
      } else {
        onChange!(event)
      }
    }

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
          onChange={handleOnChange}
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