import React, { Component } from 'react'
import { noop } from 'lodash'
import { LudensContext } from 'configs/context'
import { RouteComponentProps } from 'react-router-dom'
import colors from 'constants/colors'
import { ButtonMenu, ALink, CreditCard } from 'components'

import CreditIcon from 'assets/images/main/credit/credit-card.svg'
import WalletIcon from 'assets/images/main/wallet/wallet.svg'
import LottoIcon from 'assets/images/main/lotto/lotto.svg'
import ContactIcon from 'assets/images/main/contacts/contacts.svg'
import ProblemIcon from 'assets/images/main/problem/problem.svg'
import MegaphoneIcon from 'assets/images/main/megaphone/megaphone.svg'
import CasinoIcon from 'assets/images/main/casino/casino.svg'
import SlotIcon from 'assets/images/main/slot/slot.svg'

import './main.style.scss'
import routes from 'constants/routes'

const constants = {
  creditLabel: 'ยอดเครดิต',
  conditionText: 'ข้อตกลงการใช้งาน',
  creditText: 'เติมเครดิต',
  gotoLotto: 'แทงหวย',
  gotoCredit: 'ข้อมูลเครดิต',
  gotoWD: 'ฝาก - ถอน',
  gotoAffli: 'ระบบแนะนำ',
  gotoNews: 'ข่าวสาร',
  gotoContact: 'ติดต่อทีมงาน',
  gotoCasino: 'คาสิโน',
  gotoGame: 'เกมส์/สล๊อต',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IMainProps & IMainActionProps = {
  user: {},
  wallet: {},
  getUser() { noop() },
}

class MainContainer extends Component<IMainProps & IMainActionProps & DefaultProps & RouteComponentProps> {

  static contextType = LudensContext

  static defaultProps = defaultProps


  componentDidMount() {
    this.props.getUser()
    this.context.wallet.changeShown(false)
  }

  componentWillUnmount() {
    this.context.wallet.changeShown(true)
  }

  onNavigateTo = (path: string) => this.props.history.push(path)

  render() {
    return (
      <div className="main-container primary-bg">
        <div className="container ">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-4">
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <CreditCard
                    credit={this.props.wallet.money || 0}
                    onClick={() => this.onNavigateTo(routes.creditInfo.path)}
                  />
                </div>
              </div>
              <div className="row m2-t m4-b">
                <div className="col text-center">
                  <ALink
                    onClick={() => this.onNavigateTo(routes.qaType.exactPath('privacy'))}
                    id="goto-privacy-condition"
                    color={colors.PRIMARY_TEXT}
                    underline
                  >
                    {constants.conditionText}
                  </ALink>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="row">
                <div className="col-12 col-xl-6">
                  <div className="row">
                    <div className="col-12 m3-b">
                      <ButtonMenu
                        id="goto-lotto-button"
                        onClick={() => this.onNavigateTo(routes.lotto.path)}
                        text={constants.gotoLotto}
                        icon={LottoIcon}
                      />
                    </div>
                    <div className="col-6 m3-b">
                      <ButtonMenu
                        id="goto-casino-button"
                        onClick={() => this.onNavigateTo(routes.casino.path)}
                        text={constants.gotoCasino}
                        icon={CasinoIcon}
                      />
                    </div>
                    <div className="col-6 m3-b">
                      <ButtonMenu
                        id="goto-slot-button"
                        onClick={() => this.onNavigateTo(routes.games.path)}
                        text={constants.gotoGame}
                        icon={SlotIcon}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div className="row">
                    <div className="col-6 m3-b">
                      <ButtonMenu
                        id="goto-credit-info-button"
                        onClick={() => this.onNavigateTo(routes.creditInfo.path)}
                        text={constants.gotoCredit}
                        icon={CreditIcon}
                      />
                    </div>
                    <div className="col-6 m3-b">
                      <ButtonMenu
                        id="goto-transaction-button"
                        onClick={() => this.onNavigateTo(routes.transaction.path)}
                        text={constants.gotoWD}
                        icon={WalletIcon}
                      />
                    </div>
                    <div className="col-12 m3-b">
                      <ButtonMenu
                        id="goto-affilate-button"
                        onClick={() => this.onNavigateTo(routes.affiliate.path)}
                        text={constants.gotoAffli}
                        icon={MegaphoneIcon}
                      />
                    </div>
                    <div className="col-6 m3-b">
                      <ButtonMenu
                        id="goto-contact-button"
                        onClick={() => this.onNavigateTo(routes.contactus.path)}
                        text={constants.gotoContact}
                        icon={ContactIcon}
                      />
                    </div>
                    <div className="col-6 m3-b">
                      <ButtonMenu
                        id="goto-news-button"
                        onClick={() => this.onNavigateTo(routes.newsroom.path)}
                        text={constants.gotoNews}
                        icon={ProblemIcon}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainContainer