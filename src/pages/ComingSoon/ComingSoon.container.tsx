import React, { SFC } from 'react'
import SafetyIcon from 'assets/images/comingSoon/safety.png'
import './comingSoon.style.scss'

const ComingSoon: SFC<{}> = () => {

  return (
    <div className="container py-4">
      <div className="p-3 pt-5 text-center comingsoon-container">
        <img src={SafetyIcon} alt="safety" className="comingsoon-icon m-auto" />
        {/* <div className="comingsoon-title mt-4">THAILAND BET</div> */}
        <div className="comingsoon-title mt-5">COMING SOON</div>
        <div className="comingsoon-description mt-3">Stay turned for something amazing</div>
      </div>
    </div>
  )
}

export default ComingSoon