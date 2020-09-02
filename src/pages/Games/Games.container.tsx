import React, { Component } from 'react'
import { map } from 'lodash'
import { ResponsiveIcon } from 'components'
import games from 'assets/images/games'
import LogoIcon from 'assets/images/logo/logothailandbet.png'
import './games.style.scss'

const constants = {
  comingSoon: 'พบกันเร็วๆนี้',
}

class GamesContainer extends Component {

  renderGames = () => {
    const GamesComponent = map(games, (game, _) => {
      return (
        <div className="col-6 col-md-3 m3-b" key={`game-${game.id}`}>
          <div className="game-button-wrapper secondary-bg text-center" id={`game-${game.id}`}>
            <ResponsiveIcon icon={game.image} alt={`game-${game.id}-alt`} className="game-image" />
          </div>
        </div>
      )
    })

    return <>{GamesComponent}</>
  }

  render() {
    const GameComponent = this.renderGames
    return (
      <div className="games-container primary-bg">
        <div className="container">
          <div className="row">
            <GameComponent />
          </div>
        </div>
        <div className="game-block-wrapper">
          <div className="background-water-line d-flex flex-column align-items-center justify-content-center">
            <img src={LogoIcon} alt="logo" className="logo-icon" />
            <h1 className="m4-t">{constants.comingSoon}</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default GamesContainer