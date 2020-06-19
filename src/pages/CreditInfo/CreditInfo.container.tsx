import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  noop,
  keys,
  sortBy,
  isEmpty,
  reverse,
  groupBy,
  Dictionary,
} from 'lodash'
import moment from 'moment'
import { number } from 'utils'
import response from 'constants/response'
import { ALink, Modal } from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './creditInfo.style.scss'

const constants = {
  titleText: 'ข้อมูลเครดิต',
  remainingLabel: 'เครดิตคงเหลือ',
  deposit: 'ฝาก',
  withdraw: 'ถอน',
  back: '< ย้อนกลับ',
  latedUpdate: 'อัพเดทล่าสุด:',
  ok: 'ตกลง',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ICreditInfoProps & ICreditInfoActionProps = {
  getCreditInfoList() { noop() },
  getCreditInfoListCode: 0,
  getCreditInfoListError: '',
  getCreditInfoListIsFetching: false,
  creditInfo: [],
  wallet: {},
  loader() { noop() },
  getUser() { noop() },
}

class TransactionListContainer extends
  Component<ICreditInfoProps & ICreditInfoActionProps & DefaultProps & RouteComponentProps> {

  componentDidMount() {
    this.props.loader(true)
    this.props.getUser()
    this.props.getCreditInfoList()
  }

  componentDidUpdate(prevProps: ICreditInfoProps) {
    if (prevProps.getCreditInfoListIsFetching !== this.props.getCreditInfoListIsFetching
      && !this.props.getCreditInfoListIsFetching) {
      this.props.loader(false)
      console.log(this.props.creditInfo)
      if (this.props.getCreditInfoListCode !== response.OK
        && this.props.getCreditInfoListCode !== response.NOT_FOUND) {
        Modal.error.show({
          action: Modal.error.hide,
          description: this.props.getCreditInfoListError,
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

  onPressTransactionDetail = (credit: ICredit) => {
    this.props.history.push('/credit-info/detail', { credit })
  }

  renderTransactionList = () => {
    const creditGroupList: Dictionary<ICredit[]> = groupBy<ICredit>(
      this.props.creditInfo.map(credit => ({ ...credit, groupTime: moment(credit.createdAt).format('YYYYMMDD') })),
      'groupTime')

    if (isEmpty(creditGroupList)) { return <></> }

    return reverse(keys(creditGroupList).sort()).map((key, index) => {
      const CreditPerDay = reverse(sortBy(creditGroupList[key], ['createdAt']))
        .map((transaction, transactionIndex) => {
          const displayTime = moment(transaction.createdAt).format('DD MMM YYYY HH:mm')
          return (
            <div key={`transaction-${transactionIndex}`}>{displayTime}</div>
          )
        })

      const dayString = moment(key, 'YYYYMMDD').format('DD MMM YYYY')
      return (
        <div className="row mt-5" key={`${key}-${index}`}>
          <div className="col px-5">
            <div className="display-date-text">{dayString}</div>
            {CreditPerDay}
          </div>
        </div>
      )
    })
  }

  render() {
    const time = this.props.wallet.updatedTime || ''
    const updatedTime = moment(time).format('lll') || ''
    const updatedTimeText = `${constants.latedUpdate} ${updatedTime}`

    const total = this.props.wallet.money || 0
    const credit = number.castToMoney(total)

    const TransactionList = this.renderTransactionList()

    return (
      <div className="transaction-list-container">
        <div className="transaction-list-background" />
        <div className="container ">
          <div className="row">
            <div className="col"><ALink text={constants.back} color="#ff9b96" bold onClick={this.onPressBack} /></div>
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
          <div className="row mb-4">
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