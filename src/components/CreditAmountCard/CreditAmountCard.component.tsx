import React, { SFC } from 'react'
import './creditAmountCard.style.scss'
import { ResponsiveIcon } from 'components'
import WalletIcon from 'assets/images/global/wallet/wallet.png'
import WalletIcon2x from 'assets/images/global/wallet/wallet@2x.png'
import WalletIcon3x from 'assets/images/global/wallet/wallet@3x.png'

const constants = {
  creditAmountLabel: 'ยอดเครดิต',
  curency: '฿',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ICreditAmountCardProps = {
  creditAmount: '0.00',
}

const CreditAmountCard: SFC<ICreditAmountCardProps & DefaultProps> = (props) => {

  const {
    creditAmount,
  } = props

  return (
    <div className="credit-amount-card-container">
      <ResponsiveIcon
        icon={{ x1: WalletIcon, x2: WalletIcon2x, x3: WalletIcon3x }}
        className="wallet-credit-icon"
        alt="wallet-icon"
      />
      <div className="credit-amount-description-wrapper">
        <div className="credit-amount-label">{constants.creditAmountLabel}</div>
        <div className="credit-amount-text">{creditAmount} {constants.curency}</div>
      </div>
    </div>
  )
}

CreditAmountCard.defaultProps = defaultProps

export default CreditAmountCard