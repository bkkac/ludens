import React, { Component, ChangeEvent } from 'react'
import moment from 'moment'
import {
  NumberPad,
  Button,
} from 'components'
import './makingGame.style.scss'
import { isEmpty } from 'lodash'

const constants = {
  addNumber: 'ยิงเลข',
  sampleGamePlaceHoder: 'กรอกตัวเลข 5 หลัก',
  nameList: 'รายชื่อผลรวม',
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
        <div className="row">
          <div className="col">
            {/* Collapse */}
            {/* <div className="row mt-3 mb-4 mx-1">
          <div className="col played-game-container py-3">
            <div className="played-game-title-wrapper">
              <div className="played-game-title">{constants.nameList}</div>
            </div>
            {this.renderPlayedGame()}
          </div>
        </div> */}
          </div>
        </div>
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