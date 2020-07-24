import React, { Component, ChangeEvent } from 'react'
import moment from 'moment'
import {
  NumberPad,
  Collapse,
  Button,
} from 'components'
import { isEmpty } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import './makingGame.style.scss'

const constants = {
  addNumber: 'ยิงเลข',
  sampleGamePlaceHoder: 'กรอกตัวเลข 5 หลัก',
  nameList: 'รายการยิงเลข',
}

class MakingGame extends Component<IMakingGameComponentProps, IMakingGameComponentState> {

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

  renderPlayedUsers = (): JSX.Element => {
    return (
      <div className="player-game-wrapper">
        {
          this.props.playedYeegeList.map((played, playedIndex) => {
            const time = moment(played.createdAt).clone().format('HH:mm:ss')
            return (
              <div className="row" key={`played-game-user-${playedIndex}`}>
                <div className="col">
                  <div className="d-flex flex-row p2-x p1-y">
                    <div className="seq-player-number"><h4>{playedIndex + 1}</h4></div>
                    <h4 className="flex">{played.userId?.username}</h4>
                    <div className="text-right">
                      <h4>{played.number}</h4>
                      <h4 className="secondary-text">{time}</h4>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  renderPlayedGame = (): JSX.Element => {
    const onCollapseStateChanged = (state: boolean) => {
      this.setState({ collapseState: state })
    }

    const Header = (): JSX.Element => (
      <div className="row">
        <div className="col">
          <div className="d-flex flex-row p2-x p3-b align-items-center">
            <h3 className="flex">{constants.nameList}</h3>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`chevron-right-icon ${this.state.collapseState ? 'expanded' : ''} primary-blue-text`}
            />
          </div>
        </div>
      </div>
    )
    return (
      <div className="played-game-container secondary-bg p2-t">
        <Collapse
          minCollapsedHeight={180}
          onStateChanged={onCollapseStateChanged}
          RenderHeaderComponent={Header}
          RenderBodyComponent={this.renderPlayedUsers}
        />
      </div>
    )
  }

  renderMakingGameNumber = () => {
    if (isEmpty(this.state.numberSet)) {
      return <h3 className="placeholder-making-game-number secondary-text">{constants.sampleGamePlaceHoder}</h3>
    }
    return <h2 className="making-game-number-text">{this.state.numberSet}</h2>
  }

  render() {
    const MakingGameNumberComponent = this.renderMakingGameNumber
    const PlayedGameListComponent = this.renderPlayedGame

    return (
      <div>
        <div className="row">
          <div className="col">
            <PlayedGameListComponent />
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