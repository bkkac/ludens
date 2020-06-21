import React, { SFC, Component, ChangeEvent } from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'
import {
  NumberPad,
} from 'components'
import './makingGame.style.scss'

const constants = {
  makingGameLabel: 'ผลรวม (ยิงเลข)',
  addNumber: 'เพิ่มเลข',
  sampleGamePlaceHoder: 'กรอกตัวเลข 5 หลัก',
}

const InputGameComponent: SFC<IInputTextProps & NumberFormatProps> = (inputProps) => {

  const InputComponent: SFC<IInputTextProps> = ({
    name,
    type,
    value,
    onBlur,
    onChange,
  }) => (
      <div className="input-game-container">
        <input
          name={name}
          type={type}
          value={value}
          placeholder={constants.sampleGamePlaceHoder}
          onBlur={onBlur}
          onChange={onChange}
          className="input-game-core"
        />
      </div>
    )

  return (
    <NumberFormat
      {...inputProps}
      format="#####"
      decimalScale={0}
      customInput={InputComponent}
    />
  )
}

class MakingGame extends Component<IMakingGameComponentProps, IMakingGameComponentState> {

  state: IMakingGameComponentState = {
    numberSet: '',
  }

  onChangeNumberValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    this.setState({
      numberSet: value,
    })
  }

  handleOnClickNumberPad = (num: number) => {
    if (num === -1) {
      return this.setState({ numberSet: this.state.numberSet.slice(0, -1) })
    } else if(this.state.numberSet.length >= 5) { return }
    const newValue = this.state.numberSet.concat(String(num))
    return this.setState({ numberSet: newValue })
  }

  handleOnClickAddNumber = () => {
    this.props.onClickAddNumber(this.state.numberSet)
    this.setState({
      numberSet: '',
    })
  }

  render() {
    return (
      <>
        <div className="row mt-3 mb-4 mx-1">
          <div className="col making-game-container">
            <div className="making-game-title mt-3">{constants.makingGameLabel}</div>
            <div className="making-game-result mt-3">{this.props.yeegeSum || '0'}</div>
            <div className="row mt-4">
              <div className="col-8" style={{ padding: 0 }}>
                <InputGameComponent
                  name="gameNumber"
                  value={this.state.numberSet}
                  onChange={this.onChangeNumberValue}
                />
              </div>
              <div className="col-4" style={{ padding: 0 }}>
                <div
                  className={`making-game-button ${this.state.numberSet.length === 5 ? '' : 'disabled'}`}
                  onClick={this.handleOnClickAddNumber}
                >
                  {constants.addNumber}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col" style={{ padding: 0 }}>
                <NumberPad onNumberPresses={this.handleOnClickNumberPad} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default MakingGame