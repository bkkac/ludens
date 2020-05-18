import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { noop, get } from 'lodash'
import moment from 'moment'
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
  latedUpdate: 'อัพเดทล่าสุด:',
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
  getUser() { noop() },
}

class TransactionListContainer extends
  Component<ITransactionListProps & ITransactionListActionProps & DefaultProps & RouteComponentProps> {

  tempInterval: any = null

  componentDidMount() {
    this.props.loader(true)
    this.tempInterval = setInterval(this.props.getUser, 5000)
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

  componentWillUnmount() {
    clearInterval(this.tempInterval)
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
    const time = get(this.props, 'user.updatedTime', '')
    const updatedTime = moment(time).format('lll') || ''
    const updatedTimeText = `${constants.latedUpdate} ${updatedTime}`

    const total = get(this.props, 'user.wallet.money', 0)
    const credit = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(total)
    // const currency = '฿'

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
        </div>
      </div>
    )
  }
}

export default TransactionListContainer