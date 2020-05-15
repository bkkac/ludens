import React, { Component } from 'react'
import { LudensContext } from 'configs/context'
import { THEME_MODE } from 'constants/variables'
import { RouteComponentProps } from 'react-router-dom'
import { ButtonMenu, ResponsiveIcon, ALink } from 'components'

import WalletIcon from 'assets/images/global/wallet/wallet.png'
import WalletIcon2x from 'assets/images/global/wallet/wallet@2x.png'
import WalletIcon3x from 'assets/images/global/wallet/wallet@3x.png'

import TicketIcon from 'assets/images/main/ticket/ticket.png'
import TicketIcon2x from 'assets/images/main/ticket/ticket@2x.png'
import TicketIcon3x from 'assets/images/main/ticket/ticket@3x.png'

import CreditIcon from 'assets/images/main/credit/credit.png'
import CreditIcon2x from 'assets/images/main/credit/credit@2x.png'
import CreditIcon3x from 'assets/images/main/credit/credit@3x.png'

import PurseIcon from 'assets/images/main/purse/purse.png'
import PurseIcon2x from 'assets/images/main/purse/purse@2x.png'
import PurseIcon3x from 'assets/images/main/purse/purse@3x.png'

import MegaphoneIcon from 'assets/images/main/megaphone/megaphone.png'
import MegaphoneIcon2x from 'assets/images/main/megaphone/megaphone@2x.png'
import MegaphoneIcon3x from 'assets/images/main/megaphone/megaphone@3x.png'

import ProblemIcon from 'assets/images/main/problem/problem.png'
import ProblemIcon2x from 'assets/images/main/problem/problem@2x.png'
import ProblemIcon3x from 'assets/images/main/problem/problem@3x.png'

import ContactIcon from 'assets/images/main/contacts/contacts.png'
import ContactIcon2x from 'assets/images/main/contacts/contacts@2x.png'
import ContactIcon3x from 'assets/images/main/contacts/contacts@3x.png'

import './main.style.scss'

const constants = {
  creditLabel: 'ยอดเครดิต',
  conditionText: 'ข้อตกลงการใช้งาน',
  creditText: 'เติมเครดิต',
  gotoLotto: 'แทงหวย',
  gotoCredit: 'ข้อมูลเครดิต',
  gotoWD: 'ฝาก - ถอน',
  gotoAffli: 'ระบบแนะนำ',
  gotoHowto: 'วิธีใช้งาน',
  gotoContact: 'ติดต่อทีมงาน',
}

class MainContainer extends Component<RouteComponentProps> {

  static contextType = LudensContext

  componentDidMount() {
    this.context.theme.changeMode(THEME_MODE.LIGHT)
  }

  componentWillUnmount() {
    this.context.theme.changeMode(THEME_MODE.DARK)
  }

  onPressAddingCredit = () => this.props.history.push('/deposit')

  render() {
    const creditTotal = '0.00'
    const currency = '฿'
    return (
      <div className="main-container">
        <div className="main-background" />
        <div className="container ">
          <div className="row">
            <div className="col">
              <div className="d-flex flex-row">
                <ResponsiveIcon
                  icon={{ x1: WalletIcon, x2: WalletIcon2x, x3: WalletIcon3x }}
                  className="wallet-icon-main"
                  alt="wallet-icon"
                />
                <div className="credit-total-container">
                  <div className="credit-label">{constants.creditLabel}</div>
                  <div className="credit-total-text">{creditTotal} {currency}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="credit-button-wrapper">
                <div className="condition-text-label"><ALink text={constants.conditionText} /></div>
                <div className="crefit-text-label" onClick={this.onPressAddingCredit}>{constants.creditText}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-2 col-md-4 col-6 mb-4 justify-center">
              <ButtonMenu
                text={constants.gotoLotto}
                icon={{ x1: TicketIcon, x2: TicketIcon2x, x3: TicketIcon3x }}
              />
            </div>
            <div className="col-xl-2 col-md-4 col-6 mb-4">
              <ButtonMenu
                text={constants.gotoCredit}
                icon={{ x1: CreditIcon, x2: CreditIcon2x, x3: CreditIcon3x }}
              />
            </div>
            <div className="col-xl-2 col-md-4 col-6 mb-4">
              <ButtonMenu
                text={constants.gotoWD}
                icon={{ x1: PurseIcon, x2: PurseIcon2x, x3: PurseIcon3x }}
              />
            </div>
            <div className="col-xl-2 col-md-4 col-6 mb-4">
              <ButtonMenu
                text={constants.gotoAffli}
                icon={{ x1: MegaphoneIcon, x2: MegaphoneIcon2x, x3: MegaphoneIcon3x }}
              />
            </div>
            <div className="col-xl-2 col-md-4 col-6 mb-4">
              <ButtonMenu
                text={constants.gotoHowto}
                icon={{ x1: ProblemIcon, x2: ProblemIcon2x, x3: ProblemIcon3x }}
              />
            </div>
            <div className="col-xl-2 col-md-4 col-6 mb-4">
              <ButtonMenu
                text={constants.gotoContact}
                icon={{ x1: ContactIcon, x2: ContactIcon2x, x3: ContactIcon3x }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainContainer