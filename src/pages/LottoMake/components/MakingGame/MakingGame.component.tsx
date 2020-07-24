import React, { Component, ChangeEvent } from 'react'
import {
  NumberPad,
  Button,
} from 'components'
import { isEmpty, noop } from 'lodash'
import './makingGame.style.scss'

const constants = {
  addNumber: 'ยิงเลข',
  sampleGamePlaceHoder: 'กรอกตัวเลข 5 หลัก',
  nameList: 'รายการยิงเลข',
}

const defaultProps: IMakingGameComponentProps = {
  onClickAddNumber() { noop() },
}

class MakingGame extends Component<IMakingGameComponentProps, IMakingGameComponentState> {

  static defaultProps = defaultProps

  state: IMakingGameComponentState = {
    numberSet: '',
    collapseState: false,
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

  renderMakingGameNumber = () => {
    if (isEmpty(this.state.numberSet)) {
      return <h3 className="placeholder-making-game-number secondary-text">{constants.sampleGamePlaceHoder}</h3>
    }
    return <h2 className="making-game-number-text">{this.state.numberSet}</h2>
  }

  render() {
    const MakingGameNumberComponent = this.renderMakingGameNumber

    return (
      <div>
        <div className="row m4-t">
          <div className="col d-flex">
            <div className="flex m-auto text-center">
              <MakingGameNumberComponent />
            </div>
            <div className="add-number-action-wrapper">
              <Button
                id="add-number-game"
                disabled={this.state.numberSet.length < 5}
                text={constants.addNumber}
                onClick={this.handleOnClickAddNumber}
              />
            </div>
          </div>
        </div>
        <div className="row m3-t">
          <div className="col">
            <NumberPad onNumberPresses={this.handleOnClickNumberPad} />
          </div>
        </div>
      </div>
    )
  }
}

export default MakingGame