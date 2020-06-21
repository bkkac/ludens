import React, { SFC, useState } from 'react'
import { number } from 'utils'
import moment from 'moment'
import { reduce, get, isEmpty, find } from 'lodash'
import { Badge } from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './transactionItemCollapsible.style.scss'

const statusName: { [status in TBetStatus | TFinanceStatus]: { name: string; color: string } } = {
  WAIT: { name: 'รอตรวจสอบ', color: '#ffb751' },
  SUCCESS: { name: 'สำเร็จ', color: '#66c6b9' },
  FAIL: { name: 'ไม่สำเร็จ', color: '#dd3d45' },
  WINNER: { name: 'ชนะ', color: '#66c6b9' },
  LOSER: { name: 'แพ้', color: '#dd3d45' },
}

const creditTypeNames: { [type in TLottoType | ICreditWalletType]: string } = {
  RUN_UP: 'วงบน',
  RUN_DOWN: 'วงลาง',
  THREE_TOAST: 'สามตวโตท',
  THREE_UP: 'สามตวบน',
  TWO_DOWN: 'สองตวลาง',
  TWO_UP: 'สองตวบน',
  DEPOSIT: 'ฝากเครดิต',
  WITHDRAW: 'ถอนเครดิต',
}

declare interface ITransactionItemCollapsible {
  credit: ICredit
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ITransactionItemCollapsible = {
  credit: {
    createdAt: '',
    groupType: 'WALLET',
    list: [],
  },
}

const TransactionItemCollapsible: SFC<ITransactionItemCollapsible & DefaultProps> = (props) => {

  const [isExpand, setExpand] = useState<boolean>(false)

  const { credit } = props

  // const name = `${transactionName[type]} ${status === 'WAIT'
  // ? '(รอตรวจสอบ)' : (status === 'FAIL' ? '(ไม่สำเร็จ)' : '')}`

  const handleOnExpandClick = () => {
    setExpand(!isExpand)
  }

  const displayTime = moment(credit.createdAt).format('DD MMM YYYY HH:mm')
  const money = reduce(credit.list, (prev, curr) => (prev + Number(curr.money)), 0)
  const status: { name: string; color: string } = (credit.groupType === 'WALLET')
    ? !isEmpty(get(credit.list, '0', {}))
      ? statusName[credit.list[0].status]
      : { name: '', color: 'transparent' }
    : !isEmpty(find(credit.list, ['status', 'WAIT']))
      ? { name: 'รอผลออก', color: '#ffb751' }
      : !isEmpty(find(credit.list, ['status', 'WINNER']))
        ? statusName.WINNER
        : statusName.LOSER

  const CreditInfoList = credit.list.map((cred, creditIndex) => {
    return (
      <div
        className="d-flex flex-row align-items-center transaction-description-row"
        key={`transaction-description-amount-${creditIndex}`}
      >
        <div className="transaction-description-name-text">
          {creditTypeNames[cred.type]}
          {' '}
          <span className="transaction-description-lotto-number">456</span>
          {' '}
          (<span style={{ color: statusName[cred.status].color }}>{
            (cred.status === 'WAIT')
              ? (credit.groupType === 'BET') ? 'รอผลออก' : statusName[cred.status].name
              : statusName[cred.status].name
          }</span>)
        </div>
        <div className="transaction-description-amount">{number.castToMoney(Number(cred.money))}</div>
      </div>
    )
  })

  return (
    <div className="row py-3 credit-info-item-container" onClick={handleOnExpandClick}>
      <div className="col d-flex credit-info-item-wrapper">
        <div className="d-flex flex-column transaction-leading-wrapper">
          <div className="transaction-name-text d-flex align-items-center">
            {credit.groupType}
            <span className="transaction-badge-wrapper">
              <Badge text={status.name} color="white" backgroundColor={status.color} />
            </span>
          </div>
          <div className="transaction-time-text py-2">{displayTime}</div>
        </div>
        <div className="transaction-amount-text">{number.castToMoney(money)}</div>
        <div className="d-flex transaction-chevron-right-icon">
          <FontAwesomeIcon icon={faChevronRight} className={`chevron-right-icon ${isExpand ? 'expanded' : ''}`} />
        </div>
      </div>
      <div className={`transaction-description-container ${isExpand ? 'expanded' : ''}`}>
        <div className="d-flex flex-column transaction-description-wrapper">
          {CreditInfoList}
        </div>
      </div>
    </div>
  )
}

TransactionItemCollapsible.defaultProps = defaultProps

export default TransactionItemCollapsible