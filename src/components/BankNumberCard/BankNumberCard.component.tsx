import React, { SFC } from 'react'
import { get } from 'lodash'
import { ResponsiveIcon } from 'components'
import BankImage from 'assets/images/global/bank'
import './bankNumberCard.style.scss'

const constants = {
  bankNameTitle: 'ชื่อบัญชี',
  bankNumberTitle: 'เลขที่บัญชี: ',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: { bank: IBank } = {
  bank: {
    id: 0,
    name: '',
    number: '',
    type: '',
    createdAt: '',
    updatedAt: '',
  },
}

const BankNumberCard: SFC<{ bank: IBank } & DefaultProps> = (props) => {
  const { bank } = props
  const Image = get(BankImage, `${bank.type}.Icon`, '') as string

  return (
    <div className="bankcard-number-container">
      <ResponsiveIcon
        alt="bank-image"
        className="bank-image"
        icon={Image}
      />
      <div className="bank-information-wrapper">
        <div className="bank-name-title">{constants.bankNameTitle}</div>
        <div className="bank-name">
          <div className="text-truncate">{props.bank.name}</div>
        </div>
        <div className="bank-number-wrapper">
          <div className="bank-number-title">{constants.bankNumberTitle}</div>
          <div className="bank-number">{props.bank.number}</div>
        </div>
      </div>
    </div>
  )
}

BankNumberCard.defaultProps = defaultProps

export default BankNumberCard