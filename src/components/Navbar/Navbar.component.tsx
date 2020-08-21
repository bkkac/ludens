import React, { SFC } from 'react'
import LogoThailandBet from 'assets/images/logo/logothailandbet.png'
import { noop } from 'lodash'
import { number } from 'utils'
import routers from 'constants/routes'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faBars } from '@fortawesome/free-solid-svg-icons'
import './navbar.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: INavbarProps = {
  mode: 'dark-mode',
  isDisplayWallet: true,
  isAuthorized: false,
  wallet: {},
  onPressesMenu() { noop() },
}

const Navbar: SFC<INavbarProps & DefaultProps> = ({
  mode,
  wallet,
  isAuthorized,
  isDisplayWallet,
  onPressesMenu,
}) => {

  const history = useHistory()

  const handleOnClick = () => {
    history.replace(routers.main.path)
  }

  const CreditBadgeComponent = () => {
    if (isAuthorized) {
      if (!isDisplayWallet) { return <></> }
      return (
        <div className={`credit-badge-wrapper ${mode}`}>
          <h6>
            <FontAwesomeIcon icon={faCreditCard} className="m0-r" />
            {number.castToMoney(wallet?.money || 0)}
          </h6>
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
        <div className="leading-navbar-container" onClick={handleOnClick}>
          <img src={LogoThailandBet} alt="thailand" className="logo-container" />
          <h4 className="name-container p1-l m0-t d-none d-sm-none d-md-block">THAILAND<span>BET</span></h4>
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