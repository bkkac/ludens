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

  onPressAddingCredit = () => this.props.history.push('/deposit')

  onNavigateTo = (path: string) => this.props.history.push(path)

  render() {
    return (
      <div className="main-container primary-bg">
        <div className="container ">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-4">
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <CreditCard credit={this.props.wallet.money || 0} onClick={() => this.onNavigateTo('/credit-info')} />
                </div>
              </div>
              <div className="row m2-t m4-b">
                <div className="col text-center">
                  <ALink color={colors.PRIMARY_TEXT} underline>{constants.conditionText}</ALink>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                      <div className="row">
                        <div className="col-6 col-md-12 m3-b d-flex">
                          <ButtonMenu
                            onClick={() => this.onNavigateTo('/credit-info')}
                            text={constants.gotoCredit}
                            icon={CreditIcon}
                          />
                        </div>
                        <div className="col-6 col-md-12 m3-b d-flex">
                          <ButtonMenu
                            onClick={() => this.onNavigateTo('/transaction')}
                            text={constants.gotoWD}
                            icon={WalletIcon}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-7 col-lg-7 col-xl-7 m3-b d-flex">
                      <ButtonMenu
                        onClick={() => this.onNavigateTo('/lotto')}
                        text={constants.gotoLotto}
                        icon={LottoIcon}
                      />
                    </div>
                    <div className="col-6 d-md-none m3-b d-flex">
                      <ButtonMenu
                        text={constants.gotoContact}
                        icon={ContactIcon}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                  <div className="row">
                    <div className="d-none d-sm-none d-md-flex col-md-3 col-lg-3 col-xl-6 m3-b">
                      <ButtonMenu
                        text={constants.gotoContact}
                        icon={ContactIcon}
                      />
                    </div>
                    <div className="col-6 col-md-3 col-lg-3 m3-b col-xl-6 d-flex">
                      <ButtonMenu
                        text={constants.gotoHowto}
                        icon={ProblemIcon}
                      />
                    </div>
                    <div className="col-6 col-md-6 col-lg-6 col-xl-12 m3-b d-flex">
                      <ButtonMenu
                        onClick={() => this.onNavigateTo('/affilate')}
                        text={constants.gotoAffli}
                        icon={MegaphoneIcon}
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