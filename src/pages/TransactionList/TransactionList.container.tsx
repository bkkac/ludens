import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { noop } from 'lodash'
import response from 'constants/response'
import { ALink, Modal } from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './transactionList.style.scss'

const constants = {
  titleText: 'ข้อมูลเครดิต',
  remainingLabel: 'เครดิตคงเหลือ',
  deposit: 'ฝาก',
  withdraw: 'ถอน',
  back: '< ย้อนกลับ',
  ok: 'ตกลง',
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ITransactionListProps & ITransactionListActionProps = {
  getTransactionList() { noop() },
  getTransactionListCode: 0,
  getTransactionListError: '',
  getTransactionListIsFetching: false,
  tansactionList: [],
  user: {},
  loader() { noop() },
}

class TransactionListContainer extends
  Component<ITransactionListProps & ITransactionListActionProps & DefaultProps & RouteComponentProps> {

  componentDidMount() {
    this.props.loader(true)
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

  render() {
    const updatedTime = 'อัพเดทล่าสุด: 18 มี.ค. 2563 15:57 น.'
    const remainingMoney = this.props.user.wallet?.money
    const currency = '฿'

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
              <div className="credit-amount-text">{remainingMoney} {currency}</div>
              <div className="updated-time-text">{updatedTime}</div>
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
      </div>
    )
  }
}

export default TransactionListContainer