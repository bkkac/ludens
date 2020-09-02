import React, { Component } from 'react'
import { map } from 'lodash'
import { ResponsiveIcon } from 'components'
import casinos from 'assets/images/casino'
import LogoIcon from 'assets/images/logo/logothailandbet.png'
import './casino.style.scss'

const constants = {
  comingSoon: 'พบกันเร็วๆนี้',
}

class CasinoContainer extends Component {

  renderCasino = () => {
    const CasinoComponent = map(casinos, (casino, _) => {
      return (
        <div className="col-12 col-md-6 m3-b" key={`casino-${casino.id}`}>
          <div className="casino-button-wrapper secondary-bg text-center" id={`casino-${casino.id}`}>
            <ResponsiveIcon icon={casino.image} alt={`casino-${casino.id}-alt`} className="casino-image" />
          </div>
        </div>
      )
    })

    return <>{CasinoComponent}</>
  }

  render() {
    const CasinoComponent = this.renderCasino
    return (
      <div className="casino-container primary-bg">
        <div className="container">
          <div className="row">
            <CasinoComponent />
          </div>
        </div>
        <div className="casino-block-wrapper">
          <div className="background-water-line d-flex flex-column align-items-center justify-content-center">
            <img src={LogoIcon} alt="logo" className="logo-icon" />
            <h1 className="m4-t">{constants.comingSoon}</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default CasinoContainer