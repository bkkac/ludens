import React, { SFC } from 'react'
import { number } from 'utils'
import moment from 'moment'
import './transactionItem.style.scss'

const constants = {
  remainingAmount: 'คงเหลือ',
}

const transactionName: { [name: string]: string } = {
  DEPOSIT: 'ฝากเครดิต',
  WITHDRAW: 'ถอนเครดิต',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ITransactionItem = {
  status: '',
  money: 0,
  time: '',
  type: '',
  containerClassName: '',
}

const TransactionItem: SFC<ITransactionItem & DefaultProps> = (props) => {

  const {
    status,
    money,
    time,
    type,
    onClick,
    containerClassName,
  } = props

  const name = `${transactionName[type]} ${status === 'WAIT' ? '(รอตรวจสอบ)' : (status === 'FAIL' ? '(ไม่สำเร็จ)' : '')}`
  const displayMoney = number.castToMoney(money)
  const displayTime = moment(time, 'YYYYMMDDHHmmss').format('lll')
  const statusClass = () => {
    switch (type) {
      case 'DEPOSIT':
        return `deposit ${status === 'WAIT' ? 'pending' : (status === 'FAIL' ? 'failed' : '')}`
      case 'WITHDRAW':
        return `withdraw ${status === 'WAIT' ? 'pending' : (status === 'FAIL' ? 'failed' : '')}`
      default:
        return ''
    }
  }

  return (
    <div className={`row ${containerClassName}`} onClick={onClick}>
      <div className="col d-flex flex-row transaction-item-container">
        <div className="d-flex flex-column display-transaction-wrapper">
          <div className="transaction-name">{name}</div>
          <div className="transaction-time">{displayTime}</div>
        </div>
        <div className="d-flex flex-column text-right">
          <div className={`transaction-money ${statusClass()}`}>{displayMoney}</div>
          <div className="transaction-remaining">{constants.remainingAmount}</div>
        </div>
      </div>
    </div>
  )
}

TransactionItem.defaultProps = defaultProps

export default TransactionItem