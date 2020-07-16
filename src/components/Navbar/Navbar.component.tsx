import React, { SFC } from 'react'
import ThaiFlagIcon from 'assets/images/flags/thailand.png'
import { THEME_MODE } from 'constants/variables'
import { noop } from 'lodash'
import { number } from 'utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faBars } from '@fortawesome/free-solid-svg-icons'
import './navbar.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: INavbarProps = {
  mode: THEME_MODE.DARKER,
  isDisplayWallet: true,
  isAuthorized: false,
  wallet: {},
  onPressesLogo() { noop() },
  onPressesMenu() { noop() },
}

const Navbar: SFC<INavbarProps & DefaultProps> = ({
  mode,
  wallet,
  isAuthorized,
  isDisplayWallet,
  onPressesLogo,
  onPressesMenu,
}) => {

  const CreditBadgeComponent = () => {
    if (isAuthorized) {
      if (!isDisplayWallet) { return <></> }
      return (
        <div className={`credit-badge-wrapper ${mode}`}>
          <span className="credit-badge-text">
            <FontAwesomeIcon icon={faCreditCard} className="font-awsome-creditbadge" />
            {number.castToMoney(wallet?.money || 0)}</span>
        </div>
      )
    }
    return <></>
  }

  const BurgerComponent = () => {
    if (isAuthorized) {
      return (<FontAwesomeIcon icon={faBars} className="burger-container" onClick={onPressesMenu} />)
    }
    return <></>
  }

  return (
    <div className={`col-12 navbar-container position-fixed ${mode}`}>
      <div className="container">
        <div className="leading-navbar-container" onClick={onPressesLogo}>
          <img src={ThaiFlagIcon} alt="thailand" className="logo-container" />
          <div className="name-container d-none d-sm-none d-md-block">THAILAND<span>BET</span></div>
        </div>
        <div className="trailing-navbar-container">
          <CreditBadgeComponent />
          <BurgerComponent />
        </div>
      </div>
    </div>
  )
}

Navbar.defaultProps = defaultProps

export default Navbar