import React, { SFC } from 'react'
import SafetyIcon from 'assets/images/comingSoon/safety.png'
import LogoIcon from 'assets/images/logo/logothailandbet.png'
import './comingSoon.style.scss'

const constants = {
  comingSoon: 'เร็วๆนี้',
  staytuned: 'คอยติดตามสิ่งที่น่าอัศจรรย์กำลังมาเร็วๆนี้',
}

const ComingSoon: SFC<{}> = () => {

  return (
    <div className="comingsoon-container primary-bg">
      <div className="container">
        <div className="p-3 pt-5 text-center comingsoon-wrapper secondary-bg">
          <div className="background-water-line">
            <img src={LogoIcon} alt="logo" className="logo-icon" />
          </div>
          <div className="content-wrapper p4-t">
            <img src={SafetyIcon} alt="safety" className="comingsoon-icon m-auto" />
            <h1 className="m4-t">{constants.comingSoon}</h1>
            <h3 className="m2-t secondary-text">{constants.staytuned}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon