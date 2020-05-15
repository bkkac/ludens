import React, { SFC } from 'react'
import ThaiFlagIcon from 'assets/images/flags/thailand.png'
import { THEME_MODE } from 'constants/variables'
import './navbar.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: INavbarProps = {
  mode: THEME_MODE.DARK,
}

const Navbar: SFC<INavbarProps & DefaultProps> = ({
  mode,
  onPressesLogo,
}) => {

  return (
    <div className={`col-12 navbar-container position-fixed ${mode}`}>
      <div className="container">
        <div className="leading-navbar-container" onClick={onPressesLogo}>
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

Navbar.defaultProps = defaultProps

export default Navbar