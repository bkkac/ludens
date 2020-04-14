import React from 'react'
import ThaiFlagIcon from 'assets/images/flags/thailand.png'
import './navbar.style.scss'

function Navbar(props: INavbarProps) {

  return (
    <div className="col-12 navbar-container position-fixed">
      <div className="container">
        <div className="leading-navbar-container">
          <img src={ThaiFlagIcon} alt="thailand" className="logo-container" />
          <div className="name-container">THAILAND<span>BET</span></div>
        </div>
        <div className="trailing-navbar-container">
          <div className="burger-container" />
        </div>
      </div>
    </div>
  )
}

export default Navbar