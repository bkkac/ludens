import React, { SFC } from 'react'
import { isEmpty } from 'lodash'
import './inputRadioImage.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IInputRadioImgae = {
  image: '',
  name: '',
  alt: '',
}

const InputRadioImgae: SFC<IInputRadioImgae & DefaultProps> = (props) => {

  const { image, name, alt } = props

  if (isEmpty(image)) {
    return <div />
  }

  return (
    <div className="input-radio">
      <input
        name={name}
        type="radio"
        className="radio-core"
      />
      <div className="radio-wrapper" />
      <img src={image} alt={`radio-${alt}`} className="radio-image" />
    </div>
  )
}

export default InputRadioImgae