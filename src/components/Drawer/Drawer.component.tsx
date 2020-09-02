import React, { SFC, useState, useEffect } from 'react'
import { ButtonIcon, ALink, ResponsiveIcon } from 'components'
import { noop } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, useLocation } from 'react-router-dom'
import {
  faSignOutAlt,
  faHome,
  faDice,
  faBook,
  faReceipt,
  faPhoneAlt,
  faNewspaper,
  faCreditCard,
  faChessQueen,
  faUserFriends,
  faMoneyBillAlt,
  faQuestionCircle,
  faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons'
import Logo from 'assets/images/logo/logothailandbet.png'
import './drawer.style.scss'
import routes from 'constants/routes'

declare interface IDrawer {
  mode: TThemeMode
  isOpen: boolean
  onCloseDrawer?(): void
  onPressBackground?(): void
  onPressLogout?(): void
}

const constants = {
  signout: 'ออกจากระบบ',
  home: 'หน้าหลัก',
  lotto: 'แทงหวย',
  casino: 'คาสิโน',
  slot: 'เกมส์/สล๊อต',
  favorite: 'โพยหวย',
  finance: 'ฝาก/ถอน',
  credit: 'รายงานเครดิต',
  affiliate: 'ระบบแนะนำ',
  content: 'ข่าวสาร',
  contactus: 'ติดต่อเรา',
  privacy: 'ข้อตกลงการใช้งาน',
  qa: 'ถาม - ตอบ',
}

const defaultProps: IDrawer = {
  mode: 'dark-mode',
  isOpen: false,
  onCloseDrawer() { noop() },
  onPressBackground() { noop() },
  onPressLogout() { noop() },
}

const DrawerComponent: SFC<IDrawer> = ({
  mode,
  isOpen,
  onPressLogout,
  onCloseDrawer,
  onPressBackground,
}) => {

  const [opened, setOpen] = useState(false)

  const history = useHistory()
  const location = useLocation()
  const currentMenu = location.pathname

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleOnChangePage = (path: string) => {
    history.push(path)
    onCloseDrawer!()
  }

  return (
    <div className={`drawer-container d-flex flex-row ${mode} ${opened ? 'opened' : ''}`}>
      <div className="flex" onClick={onPressBackground} />
      <div className="drawer-wrapper p4-y d-flex">
        <div className="container flex d-flex flex-column">
          <div className="flex m2-b">
            <div className="d-flex flex-row-reverse">
              <ButtonIcon onClick={onCloseDrawer} type="close" id="close-drawer" />
            </div>
            <div className="text-center m3-b">
              <ResponsiveIcon icon={Logo} className="thailandbet-logo" />
            </div>
            <div>
              <div
                className={`drawer-item-container ${currentMenu === routes.main.path ? 'active' : ''}`}
                onClick={() => handleOnChangePage(routes.main.path)}
              >
                <h5 className="icon-container"><FontAwesomeIcon icon={faHome} className="m1-r" /></h5>
                <h5>{constants.home}</h5>
              </div>
              <div
                className={`drawer-item-container ${currentMenu === routes.lotto.path ? 'active' : ''}`}
                onClick={() => handleOnChangePage(routes.lotto.path)}
              >
                <h5 className="icon-container"><FontAwesomeIcon icon={faReceipt} className="m1-r" /></h5>
                <h5>{constants.lotto}</h5>
              </div>
              <div
                className={`drawer-item-container ${currentMenu === routes.casino.path ? 'active' : ''}`}
                onClick={() => handleOnChangePage(routes.casino.path)}
              >
                <h5 className="icon-container"><FontAwesomeIcon icon={faDice} className="m1-r" /></h5>
                <h5>{constants.casino}</h5>
              </div>
              <div
                className={`drawer-item-container ${currentMenu === routes.games.path ? 'active' : ''}`}
                onClick={() => handleOnChangePage(routes.games.path)}
              >
                <h5 className="icon-container"><FontAwesomeIcon icon={faChessQueen} className="m1-r" /></h5>
                <h5>{constants.slot}</h5>
              </div>
              <div className="drawer-item-container disabled">
                <h5 className="icon-container"><FontAwesomeIcon icon={faFileInvoiceDollar} className="m1-r" /></h5>
                <h5>{constants.favorite}</h5>
              </div>
              <div
                className={`drawer-item-container ${currentMenu === routes.transaction.path ? 'active' : ''}`}
                onClick={() => handleOnChangePage(routes.transaction.path)}
              >
                <h5 className="icon-container"><FontAwesomeIcon icon={faMoneyBillAlt} className="m1-r" /></h5>
                <h5>{constants.finance}</h5>
              </div>
              <div
                className={`drawer-item-container ${currentMenu === routes.creditInfo.path ? 'active' : ''}`}
                onClick={() => handleOnChangePage(routes.creditInfo.path)}
              >
                <h5 className="icon-container"><FontAwesomeIcon icon={faCreditCard} className="m1-r" /></h5>
                <h5>{constants.credit}</h5>
              </div>
              <div
                className={`drawer-item-container ${currentMenu === routes.affiliate.path ? 'active' : ''}`}
                onClick={() => handleOnChangePage(routes.affiliate.path)}
              >
                <h5 className="icon-container"><FontAwesomeIcon icon={faUserFriends} className="m1-r" /></h5>
                <h5>{constants.affiliate}</h5>
              </div>
              <div
                className={`drawer-item-container ${currentMenu === routes.newsroom.path ? 'active' : ''}`}
                onClick={() => handleOnChangePage(routes.newsroom.path)}
              >
                <h5 className="icon-container"><FontAwesomeIcon icon={faNewspaper} className="m1-r" /></h5>
                <h5>{constants.content}</h5>
              </div>
              <div
                className={`drawer-item-container ${currentMenu === routes.contactus.path ? 'active' : ''}`}
                onClick={() => handleOnChangePage(routes.contactus.path)}
              >
                <h5 className="icon-container"><FontAwesomeIcon icon={faPhoneAlt} className="m1-r" /></h5>
                <h5>{constants.contactus}</h5>
              </div>
              <div
                className={`drawer-item-container ${currentMenu === routes.qa.path ? 'active' : ''}`}
                onClick={() => handleOnChangePage(routes.qa.path)}
              >
                <h5 className="icon-container"><FontAwesomeIcon icon={faQuestionCircle} className="m1-r" /></h5>
                <h5>{constants.qa}</h5>
              </div>
              <div className="drawer-item-container disabled">
                <h5 className="icon-container"><FontAwesomeIcon icon={faBook} className="m1-r" /></h5>
                <h5>{constants.privacy}</h5>
              </div>
            </div>
          </div>
          <div className="m2-b">
            <div className="text-center">
              <ALink id="signout-button" onClick={onPressLogout}>
                {constants.signout}
                <FontAwesomeIcon icon={faSignOutAlt} className="m1-l" />
              </ALink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

DrawerComponent.defaultProps = defaultProps

export default DrawerComponent