import React, { SFC, useState, Fragment } from 'react'
import { number } from 'utils'
import moment from 'moment'
import { split, groupBy, Dictionary, isEmpty, map, keys } from 'lodash'
import { Badge } from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './transactionItemCollapsible.style.scss'

const statusName: { [status in TBetStatus | TFinanceStatus]: { name: string; color: string } } = {
  WAIT: { name: 'รอตรวจสอบ', color: '#ffb751' },
  SUCCESS: { name: 'สำเร็จ', color: '#66c6b9' },
  FAIL: { name: 'ไม่สำเร็จ', color: '#dd3d45' },
  WINNER: { name: 'ได้', color: '#66c6b9' },
  LOSER: { name: 'เสีย', color: '#dd3d45' },
}

const creditTypeNames: { [type in TLottoGameType | ICreditWalletType]: string } = {
  RUN_UP: 'วิ่งบน',
  RUN_DOWN: 'วิ่งลาง',
  THREE_TOAST: 'สามตัวโต้ท',
  THREE_UP: 'สามตัวบน',
  TWO_DOWN: 'สองตัวล่าง',
  TWO_UP: 'สองตัวบน',
  DEPOSIT: 'ฝากเครดิต',
  WITHDRAW: 'ถอนเครดิต',
}

const lottoTypeNames: { [type in TLottoType]: string } = {
  GOVERNMENT: 'รัฐบาล',
  YEGEE: 'ยี่กี',
}

const creditInfoType: { [name: string]: string } = {
  WITHDRAW: 'ถอนเครดิต',
  DEPOSIT: 'ฝากเครดิต',
  LOTTER: 'หวย',
}

declare interface ITransactionItemCollapsible {
  credit: ICredit
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ITransactionItemCollapsible = {
  credit: {
    money: 0,
    status: '',
    createdAt: '',
    groupType: '',
    slug: '',
    list: [],
  },
}

const TransactionItemCollapsible: SFC<ITransactionItemCollapsible & DefaultProps> = (props) => {

  const [isExpand, setExpand] = useState<boolean>(false)

  const { credit } = props

  const handleOnExpandClick = () => {
    setExpand(!isExpand)
  }

  const getGroupType = () => {
    const [nameSplited, typeSplited, subTypeSplited] = split(credit.groupType, '_')
    return {
      name: nameSplited,
      type: typeSplited,
      subType: subTypeSplited || '',
    }
  }

  const getSlug = () => {
    const [slugName, slugType, slugRound] = split(credit.slug || '', '_')
    return {
      name: slugName,
      type: slugType,
      round: slugRound,
    }
  }

  const { name, type, subType } = getGroupType()
  const displayName = `${creditInfoType[type]}${lottoTypeNames[subType as TLottoType] || ''}`

  const displayTime = moment(credit.createdAt).format('DD MMM YYYY HH:mm')
  const round = (subType === 'YEGEE')
    ? ` (รอบที่ ${Number(getSlug().round)})`
    : ''

  const getStatus = () => {
    if (name === 'FINANCE') {
      return statusName[credit.status as TFinanceStatus]
    } else if (name === 'BET') {
      if (credit.status === 'WAIT') {
        return { name: 'แทง', color: statusName[credit.status as TBetStatus].color }
      }
      return statusName[credit.status as TBetStatus]
    }
    return { name: '', color: 'transparent' }
  }

  const CreditInfoListComponent = () => {

    if (name === 'FINANCE') {
      return map(credit.list, (cred, creditIndex) => {
        return (
          <div
            className="d-flex flex-row align-items-center transaction-description-row"
            key={`transaction-description-amount-${creditIndex}`}
          >
            <div className="transaction-description-name-text">
              {creditTypeNames[cred.type]}
              {' '}
              <span className="transaction-description-lotto-number">{cred.number}</span>
              {' '}
              (<span style={{ color: statusName[cred.status].color }}>{statusName[cred.status].name}</span>)
            </div>
            <div className="transaction-description-amount">{number.castToMoney(Number(cred.money))}</div>
          </div>
        )
      })
    } else {

      const creditGroupList: Dictionary<ICreditDetail[]> = groupBy<ICreditDetail>(credit.list, 'type')
      if (isEmpty(creditGroupList)) { return <></> }

      return map(keys(creditGroupList), (key, keyIndex) => {
        const creditDetails = creditGroupList[key]

        const DetailComponents = map(creditDetails, (detail, detailIndex) => {
          const subCreditStatus = () => {
            if (name === 'FINANCE') {
              return statusName[detail.status].name
            } else {
              if (detail.status === 'WAIT') {
                return 'รอผลออก'
              }
              return statusName[detail.status].name
            }
          }

          return (
            <div
              className="d-flex flex-row align-items-center transaction-description-row"
              key={`transaction-description-detail-${detailIndex}`}
            >
              <div className="transaction-description-name-text">
                <span className="transaction-description-lotto-number">{detail.number}</span>
                {' '}
            (<span style={{ color: statusName[detail.status].color }}>{subCreditStatus()}</span>)
          </div>
              <div className="transaction-description-amount">{number.castToMoney(Number(detail.money))}</div>
            </div>
          )
        })

        return (
          <Fragment key={`transaction-description-amount-${keyIndex}`}>
            <div className="row mt-3">
              <div className="col transaction-description-name-text">
                {creditTypeNames[key as TLottoGameType]}
              </div>
            </div>
            {DetailComponents}
          </ Fragment>
        )
      })
    }
  }

  return (
    <div className="row py-3 credit-info-item-container" onClick={handleOnExpandClick}>
      <div className="col d-flex credit-info-item-wrapper">
        <div className="d-flex flex-column transaction-leading-wrapper">
          <div className="transaction-name-text d-flex align-items-center">
            {displayName}
            <span className="transaction-badge-wrapper">
              <Badge text={getStatus().name} color="white" backgroundColor={getStatus().color} />
            </span>
          </div>
          <div className="transaction-time-text py-2">{displayTime} {round}</div>
        </div>
        <div className="transaction-amount-text" style={{ color: getStatus().color }}>
          {number.castToMoney(Number(credit.money))}
        </div>
        <div className="d-flex transaction-chevron-right-icon">
          <FontAwesomeIcon icon={faChevronRight} className={`chevron-right-icon ${isExpand ? 'expanded' : ''}`} />
        </div>
      </div>
      <div className={`transaction-description-container ${isExpand ? 'expanded' : ''}`}>
        <div className="d-flex flex-column transaction-description-wrapper">
          {CreditInfoListComponent()}
        </div>
      </div>
    </div>
  )
}

TransactionItemCollapsible.defaultProps = defaultProps

export default TransactionItemCollapsible