import React, { Component, SFC, ChangeEvent } from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'
import { get } from 'lodash'
import {
  NumberPad,
} from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

import './makingLotto.style.scss'

const constants = {
  make: 'เพิ่มเลข',
  numSet: 'สลับ',
}

const InputCellComponent: SFC<IInputTextProps & NumberFormatProps> = (inputProps) => {

  const InputComponent: SFC<IInputTextProps> = ({
    name,
    type,
    value,
    onBlur,
    onChange,
  }) => (
      <div className="input-cell-container m-1">
        <input
          name={name}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          className="input-cell-core"
        />
      </div>
    )

  return (
    <NumberFormat
      {...inputProps}
      format="#"
      decimalScale={0}
      customInput={InputComponent}
    />
  )
}

declare interface IIMakingLottoProps {
  numberMode: LottoGameMode
}

declare interface IMakingLottoState {
  numberSet: string
}

class MakingLotto extends Component<IIMakingLottoProps, IMakingLottoState> {

  state: IMakingLottoState = {
    numberSet: '',
  }

  renderInputCell = () => {
    if (this.props.numberMode === 'two') {
      const setOfNumber = [0, 1]

      return setOfNumber.map((num) => {
        const value = get(this.state.numberSet, num, '')
        return (
          <InputCellComponent
            key={`number-${num}`}
            value={value}
            name={`number-${num}`}
            onChange={this.onChangeNumberValue(num)}
          />
        )
      })
    } else if (this.props.numberMode === 'three') {
      const setOfNumber = [0, 1, 2]

      return setOfNumber.map((num) => {
        const value = get(this.state.numberSet, num, '')
        return (
          <InputCellComponent
            key={`number-${num}`}
            value={value}
            name={`number-${num}`}
            onChange={this.onChangeNumberValue(num)}
          />
        )
      })
    } else if (this.props.numberMode === 'run') {
      const setOfNumber = [0, 1, 2]

      return setOfNumber.map((num) => {
        const value = get(this.state.numberSet, num, '')
        return (
          <InputCellComponent
            key={`number-${num}`}
            value={value}
            name={`number-${num}`}
            onChange={this.onChangeNumberValue(num)}
          />
        )
      })
    }

    return <></>
  }

  onChangeNumberValue = (num: number) => (event: ChangeEvent<HTMLInputElement>) => {
    // const target = event.target.name
    const value = event.target.value
    const newValue = this.state.numberSet.concat(value)
    this.setState({
      numberSet: newValue,
    })
  }

  handleOnClickNumberPad = (num: number) => {
    if (num === -1) {
      return this.setState({ numberSet: this.state.numberSet.slice(0, -1) })
    }
    const newValue = this.state.numberSet.concat(String(num))
    return this.setState({ numberSet: newValue })
  }

  render() {

    return (
      <>
        <div className="row mb-4">
          <div className="col d-flex flex-row">
            <div className="leading-making-lotto-panel">
              <div className="button-making-lotto">
                <FontAwesomeIcon icon={faCircleNotch} className="plus-icon-button" />
                {constants.numSet}
              </div>
            </div>
            <div className="center-making-lotto-panel d-flex flex-row justify-content-center">
              {this.renderInputCell()}
            </div>
            <div className="trailing-making-lotto-panel">
              <div className="button-making-lotto">
                <FontAwesomeIcon icon={faPlus} className="plus-icon-button" />
                {constants.make}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <NumberPad onNumberPresses={this.handleOnClickNumberPad} />
          </div>
        </div>
      </>
    )
  }

}

export default MakingLotto