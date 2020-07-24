import React, { SFC } from 'react'
import { noop, chunk } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'
import './numberPad.style.scss'

declare interface INumberPadProps {
  onNumberPresses?(value: number): void
}

type DefaultProps = Readonly<typeof defaultProps>

const numberSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, -2, 0, -1]

const arrageSet = chunk(numberSet, 3)

const defaultProps: INumberPadProps = {
  onNumberPresses() { noop() },
}

const PadSetComponent: SFC<INumberPadProps & DefaultProps> = ({ onNumberPresses }) => {
  const NumberPadSetComponent = arrageSet.map((numbers, index) => {

    const PadComponents = numbers.map((num, numIndex) => {
      const numberChar = (num === -1)
        ? <FontAwesomeIcon key="backspace-ico" icon={faBackspace} className="plus-icon-button" />
        : (num === -2) ? '' : num
      const disabled = (typeof numberChar === 'string')
      return (
        <div
          className={`number-pad p1-y ${disabled ? 'disabled' : ''}`}
          key={`number-${numIndex}`}
          onClick={() => disabled ? noop() : onNumberPresses!(num)}
        >
          <div className="number-wrapper">
            <h2 className="number-text">{numberChar}</h2>
          </div>
        </div>
      )
    })

    return (
      <div className="number-pad-wrapper" key={`pad-set-${index}`}>
        {PadComponents}
      </div>
    )
  })

  return <>{NumberPadSetComponent}</>
}

const NumberPad: SFC<INumberPadProps & DefaultProps> = (props) => {

  return (
    <div className="number-pad-container">
      <PadSetComponent {...props} />
    </div >
  )
}

NumberPad.defaultProps = defaultProps
PadSetComponent.defaultProps = defaultProps

export default NumberPad