import React, { Component, ComponentClass } from 'react'
import './inputText.style.scss'

const constants = {
  placeholder: 'ชื่อผู้ใช้งาน',
  errorMessage: 'กรุณากรอก',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IInputProps = {
  error: false,
}

const InputText = class extends Component<IInputProps & DefaultProps> {

  static defaultProps = defaultProps

  render() {
    const { error, placeholder } = this.props

    const hasErrorClass = error ? 'error' : ''
    return (
      <div className={`col-12 input-text ${hasErrorClass}`}>
        <input className="input-core" placeholder={placeholder} />
        <div className="input-placehoder-label">{placeholder}</div>
        <div className="input-underline" />
        <div className="input-error-message">{constants.errorMessage}</div>
      </div>
    )
  }
} as ComponentClass<IInputProps>

export default InputText