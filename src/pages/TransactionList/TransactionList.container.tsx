import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  get,
  map,
  noop,
  keys,
  sortBy,
  isEmpty,
  reverse,
  groupBy,
  Dictionary,
} from 'lodash'
import moment from 'moment-timezone'
import { date, number } from 'utils'
import colors from 'constants/colors'
import response from 'constants/response'
import { ALink, Modal, TransactionItem } from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './transactionList.style.scss'

const constants = {
  titleText: 'ฝาก - ถอน',
  remainingLabel: 'เครดิตคงเหลือ',
  deposit: 'ฝาก',
  withdraw: 'ถอน',
  back: '< ย้อนกลับ',
  latedUpdate: 'อัพเดทล่าสุด:',
  ok: 'ตกลง',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ITransactionListProps & ITransactionListActionProps = {
  getTransactionList() { noop() },
  getTransactionListCode: 0,
  getTransactionListError: '',
  getTransactionListIsFetching: false,
  transactionList: [],
  wallet: {},
  loader() { noop() },
  getUser() { noop() },
}

class TransactionListContainer extends
  Component<ITransactionListProps & ITransactionListActionProps & DefaultProps & RouteComponentProps> {

  componentDidMount() {
    this.props.loader(true)
    this.props.getUser()
    this.props.getTransactionList()
  }

  componentDidUpdate(prevProps: ITransactionListProps) {
    if (prevProps.getTransactionListIsFetching !== this.props.getTransactionListIsFetching
      && !this.props.getTransactionListIsFetching) {
      this.props.loader(false)
      if (this.props.getTransactionListCode !== response.OK
        && this.props.getTransactionListCode !== response.NOT_FOUND) {
        Modal.error.show({
          action: Modal.error.hide,
          description: this.props.getTransactionListError,
          actionText: constants.ok,
        })
      }
    }
  }

  onPressBack = () => {
    this.props.history.goBack()
  }

  onPressDeposit = () => {
    this.props.history.push('/deposit')
  }

  onPresWithdraw = () => {
    this.props.history.push('/withdraw')
  }

  onPressTransactionDetail = (transaction: ITransaction) => {
    // this.props.history.push('/transaction/detail', { transaction })
  }

  renderTransactionList = () => {
    if (isEmpty(this.props.transactionList)) { return <></> }

    const transactionGroupList: Dictionary<ITransaction[]> = groupBy<ITransaction>(
      map(this.props.transactionList, (transaction) =>
        ({ ...transaction, createdAt: date.calibratingTime(get(transaction, 'updatedAt', '')).format('YYYYMMDD') })),
      'createdAt')

    return map(reverse(keys(transactionGroupList).sort()), (key, index) => {
      const TransactionDay = reverse(sortBy(
        map(transactionGroupList[key], ts => ({ ...ts, updatedAt: moment(ts.updatedAt).format('YYYYMMDDHHmmss') })),
        ['createdAt', 'updatedAt']))
        .map((transaction, transactionIndex) => {
          return (
            <TransactionItem
              onClick={() => this.onPressTransactionDetail(transaction)}
              containerClassName="mt-2"
              key={`${transaction.type}-${transaction.createdAt}-${transactionIndex}`}
              money={transaction.money}
              status={transaction.status}
              time={transaction.updatedAt}
              type={transaction.type}
            />
          )
        })

      const dayString = moment(key, 'YYYYMMDD').format('DD MMM YYYY')
      return (
        <div className="row mt-5" key={`${key}-${index}`}>
          <div className="col px-5">
            <div className="display-date-text">{dayString}</div>
            {TransactionDay}
          </div>
        </div>
      )
    })
  }

  render() {
    const time = this.props.wallet.updatedTime || ''
    const updatedTime = date.calibratingTime(time).format('lll') || ''
    const updatedTimeText = `${constants.latedUpdate} ${updatedTime}`

    const total = this.props.wallet.money || 0
    const credit = number.castToMoney(total)

    const TransactionList = this.renderTransactionList()

    return (
      <div className="transaction-list-container">
        <div className="transaction-list-background" />
        <div className="container ">
          <div className="large-screen-container">
            <div className="row">
              <div className="col">
                <ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={this.onPressBack}>
                  {constants.back}
                </ALink></div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <div className="transaction-list-title-text">{constants.titleText}</div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <div className="remaining-label mx-auto">{constants.remainingLabel}</div>
                <div className="credit-amount-text">{credit}</div>
                <div className="updated-time-text">{updatedTimeText}</div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <div className="credit-panel-action-wrapper">
                  <div className="temprary-button-wrapper mx-2" onClick={this.onPressDeposit}>
                    <div className="temp-text-button">
                      <FontAwesomeIcon icon={faPlus} className="temp-icon-button" />
                      {constants.deposit}
                    </div>
                  </div>
                  <div className="temprary-button-wrapper mx-2" onClick={this.onPresWithdraw}>
                    <div className="temp-text-button">
                      <FontAwesomeIcon icon={faMinus} className="temp-icon-button" />
                      {constants.withdraw}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="transaction-list row mb-4">
            <div className="col">
              {TransactionList}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TransactionListContainer