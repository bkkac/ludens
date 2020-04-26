import React, { SFC } from 'react'
import { isEmpty, noop } from 'lodash'
import './inputRadioImage.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IInputRadioImgae = {
  image: '',
  name: '',
  alt: '',
  value: '',
  checked: false,
  onBlur() { noop() },
  onChange() { noop() },
}

const InputRadioImgae: SFC<IInputRadioImgae & DefaultProps> = (props) => {

  const {
    image,
    name,
    alt,
    value,
    checked,
    onBlur,
    onChange,
  } = props

  if (isEmpty(image)) {
    return <div />
  }

  return (
    <div className="input-radio">
      <input
        name={name}
        type="radio"
        className="radio-core"
        value={value}
        checked={checked}
        onBlur={onBlur}
        onChange={onChange}
      />
      <div className="radio-wrapper" />
      <img src={image} alt={`radio-${alt}`} className="radio-image" />
    </div>
  )
}

export default InputRadioImgae