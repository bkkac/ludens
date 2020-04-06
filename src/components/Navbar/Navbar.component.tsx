import React from 'react'
import './navbar.style.scss'

function Navbar(props: INavbarProps) {

  return (
    <div className="col-12 navbar-container">
      <div className="container">
        <div className="leading-navbar-container">
          <div className="logo-container" />
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