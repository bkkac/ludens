import React, { SFC, Component, ChangeEvent } from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'
import moment from 'moment'
import {
  NumberPad,
} from 'components'
import './makingGame.style.scss'

const constants = {
  addNumber: 'เพิ่มเลข',
  sampleGamePlaceHoder: 'กรอกตัวเลข 5 หลัก',
  nameList: 'รายชื่อผลรวม',
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
    } else if (this.state.numberSet.length >= 5) { return }
    const newValue = this.state.numberSet.concat(String(num))
    return this.setState({ numberSet: newValue })
  }

  handleOnClickAddNumber = () => {
    if (this.state.numberSet.length < 5) { return }
    this.props.onClickAddNumber(this.state.numberSet)
    this.setState({
      numberSet: '',
    })
  }

  renderPlayedGame = () => this.props.playedYeegeList.map((played, playedIndex) => {
    const time = moment(played.createdAt).clone().format('HH:mm:ss')
    return (
      <div className="row played-game-row py-3" key={`played-game-user-${playedIndex}`}>
        <div className="col-1">{playedIndex + 1}</div>
        <div className="col">{played.userId?.username}</div>
        <div className="col">{played.number}</div>
        <div className="col">{time}</div>
      </div>
    )
  })

  render() {
    return (
      <>
        <div className="row mt-3 mb-4 mx-1">
          <div className="col making-game-container">
            <div className="row">
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

        <div className="row mt-3 mb-4 mx-1">
          <div className="col played-game-container py-3">
            <div className="played-game-title-wrapper">
              <div className="played-game-title">{constants.nameList}</div>
            </div>
            {this.renderPlayedGame()}
          </div>
        </div>
      </>
    )
  }
}

export default MakingGame