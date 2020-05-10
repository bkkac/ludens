import React, { SFC } from 'react'
import { ResponsiveIcon } from 'components'
import KasikornIcon from 'assets/images/global/bank/kasikorn.png'
import KrungsriIcon from 'assets/images/global/bank/krungsri.png'
import rungthaiIcon from 'assets/images/global/bank/krungthai.png'
import SCBIcon from 'assets/images/global/bank/scb.png'
import './bankNumberCard.style.scss'

const constants = {
  bankNameTitle: 'ชื่อบัญชี',
  bankNumberTitle: 'เลขที่บัญชี: ',
  bankName: 'นายเจนณรงค์ แสนแปง',
  bankNumber: '78x - xxx879 - 0',
}

declare interface IBankNumberCard {
  bankType: string
  bankName: string
  bankNumber: string
}

const BankNumberCard: SFC<IBankNumberCard> = (props) => {

  const {
    bankType,
    bankName,
    bankNumber,
  } = props

  const bankIcon = (): string => {
    if (bankType === 'kasikorn') {
      return KasikornIcon
    } else if (bankType === 'krungsri') {
      return KrungsriIcon
    } else if (bankType === 'krungthai') {
      return rungthaiIcon
    } else if (bankType === 'scb') {
      return SCBIcon
    }
    return ''
  }

  return (
    <div className="bankcard-number-container">
      <ResponsiveIcon
        alt="bank-image"
        className="bank-image"
        icon={bankIcon()}
      />
      <div className="bank-information-wrapper">
        <div className="bank-name-title">{constants.bankNameTitle}</div>
        <div className="bank-name">{bankName}</div>
        <div className="bank-number-wrapper">
          <div className="bank-number-title">{constants.bankNumberTitle}</div>
          <div className="bank-number">{bankNumber}</div>
        </div>
      </div>
    </div>
  )
}

export default BankNumberCard