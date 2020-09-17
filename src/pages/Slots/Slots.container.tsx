import React, { Component } from 'react'
import { map } from 'lodash'
import { ResponsiveIcon } from 'components'
import slots from 'assets/images/slots'
import LogoIcon from 'assets/images/logo/logothailandbet.png'
import './slots.style.scss'

const constants = {
  comingSoon: 'พบกันเร็วๆนี้',
}

class SlotsContainer extends Component {

  renderSlots = () => {
    const SlotsComponent = map(slots, (slot, _) => {
      return (
        <div className="col-6 col-md-3 m3-b" key={`slot-${slot.id}`}>
          <div className="slot-button-wrapper secondary-bg text-center" id={`slot-${slot.id}`}>
            <ResponsiveIcon icon={slot.image} alt={`slot-${slot.id}-alt`} className="slot-image" />
          </div>
        </div>
      )
    })

    return <>{SlotsComponent}</>
  }

  render() {
    const SlotsComponent = this.renderSlots
    return (
      <div className="slots-container primary-bg">
        <div className="container">
          <div className="row">
            <SlotsComponent />
          </div>
        </div>
        <div className="slot-block-wrapper">
          <div className="background-water-line d-flex flex-column align-items-center justify-content-center">
            <img src={LogoIcon} alt="logo" className="logo-icon" />
            <h1 className="m4-t">{constants.comingSoon}</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default SlotsContainer