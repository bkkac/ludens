import React, { SFC, useState, Fragment } from 'react'
import { number } from 'utils'
import moment from 'moment'
import { split, groupBy, Dictionary, isEmpty, map, keys, get } from 'lodash'
import { Badge } from 'components'
import { LOTTO_TYPE, LOTTO_GAME_TYPE_NAME, TRANSACTION_TYPE } from 'constants/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './transactionItemCollapsible.style.scss'

const constants = {
  round: 'รอบที่',
  makeLotto: 'แทง',
  waitResult: 'รอผลออก',
  actureResult: 'เลขที่ออก',
}

const statusName: { [status in TBetStatus | TFinanceStatus]: { name: string; color: string } } = {
  WAIT: { name: 'รอตรวจสอบ', color: '#ffb751' },
  SUCCESS: { name: 'สำเร็จ', color: '#66c6b9' },
  FAIL: { name: 'ไม่สำเร็จ', color: '#dd3d45' },
  WINNER: { name: 'ได้', color: '#66c6b9' },
  LOSER: { name: 'เสีย', color: '#dd3d45' },
}

const creditInfoType: { [name: string]: string } = {
  WITHDRAW: 'ถอนเครดิต',
  DEPOSIT: 'ฝากเครดิต',
  LOTTER: '',
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
  const displayName = `${creditInfoType[type]}${LOTTO_TYPE[subType as TLottoType] || ''}`

  const displayTime = moment(credit.createdAt).format('DD MMM YYYY HH:mm')
  const round = (subType === 'YEGEE')
    ? ` (${constants.round} ${Number(getSlug().round)})`
    : ''

  const getStatus = () => {
    if (name === 'FINANCE') {
      return statusName[credit.status as TFinanceStatus]
    } else if (name === 'BET') {
      if (credit.status === 'WAIT') {
        return { name: constants.makeLotto, color: statusName[credit.status as TBetStatus].color }
      }
      return statusName[credit.status as TBetStatus]
    }
    return { name: '', color: 'transparent' }
  }

  const CreditInfoListComponent = () => {


    if (name === 'FINANCE') {
      return map(credit.list, (cred, creditIndex) => {
        const stColor = get(statusName, `${cred.status}.color`, '')
        const stName = get(statusName, `${cred.status}.name`, '')
        // TODO: Recheck get(...)
        return (
          <div
            className="d-flex flex-row align-items-center transaction-description-row"
            key={`transaction-description-amount-${creditIndex}`}
          >
            <div className="transaction-description-name-text">
              {
                cred.type === 'DEPOSIT' || cred.type === 'WITHDRAW'
                  ? TRANSACTION_TYPE[cred.type]
                  : LOTTO_GAME_TYPE_NAME[cred.type]
              }
              {' '}
              <span className="transaction-description-lotto-number">{cred.numbers}</span>
              {' '}
              (<span style={{ color: stColor }}>{stName}</span>)
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
          const stName = get(statusName, `${detail.status}.name`, '')
          const stColor = get(statusName, `${detail.status}.color`, '')

          const subCreditStatus = () => {
            if (name === 'FINANCE') {
              return stName
            } else {
              if (detail.status === 'WAIT') {
                return constants.waitResult
              }
              return stName
            }
          }

          return (
            <div
              className="d-flex flex-row align-items-center transaction-description-row"
              key={`transaction-description-detail-${detailIndex}`}
            >
              <div className="transaction-description-name-text">
                <span className="transaction-description-lotto-number">{detail.numbers}</span>
                {' '}
            (<span style={{ color: stColor }}>{subCreditStatus()}</span>)
            {' '}
                <span className="secondary-text">{(type === 'LOTTER' && detail.status === 'LOSER') ? `${constants.actureResult} ${detail.numbersBetResult}` : ''}</span>
              </div>
              <div className="transaction-description-amount">{number.castToMoney(Number(detail.money))}</div>
            </div>
          )
        })

        return (
          <Fragment key={`transaction-description-amount-${keyIndex}`}>
            <div className="row mt-3">
              <div className="col transaction-description-name-text">
                {LOTTO_GAME_TYPE_NAME[key as TLottoGameType]}
              </div>
            </div>
            {DetailComponents}
          </ Fragment>
        )
      })
    }
  }

  const trxName = get(getStatus(), 'name', '')
  const trxColor = get(getStatus(), 'color', '')

  return (
    <div className="row py-3 credit-info-item-container" onClick={handleOnExpandClick}>
      <div className="col d-flex credit-info-item-wrapper">
        <div className="d-flex flex-column transaction-leading-wrapper">
          <div className="transaction-name-text d-flex align-items-center">
            {displayName}
            <span className="transaction-badge-wrapper">
              <Badge text={trxName} color="white" backgroundColor={trxColor} />
            </span>
          </div>
          <div className="transaction-time-text py-2">{displayTime} {round}</div>
        </div>
        <div className="transaction-amount-text" style={{ color: trxColor }}>
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