import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  map,
  noop,
  keys,
  sortBy,
  isEmpty,
  reverse,
  groupBy,
  Dictionary,
} from 'lodash'
import moment from 'moment'
import response from 'constants/response'
import {
  ALink,
  Modal,
  CreditCard,
  TransactionItemCollapsible,
} from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faMinus,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import './creditInfo.style.scss'

const constants = {
  titleText: 'ข้อมูลเครดิต',
  remainingLabel: 'เครดิตคงเหลือ',
  deposit: 'ฝาก',
  withdraw: 'ถอน',
  back: ' ย้อนกลับ',
  latedUpdate: 'อัพเดทล่าสุด:',
  ok: 'ตกลง',
  thailand: 'Thailand',
  credit: 'CREDIT',
  bet: 'Bet',
  cardNumber: '**** **** **** ****',
  today: 'วันนี้',
  yesterday: 'เมื่อวาน',
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
      map(this.props.creditInfo, credit => ({ ...credit, groupTime: moment.utc(credit.createdAt).format('YYYYMMDD') })),
      'groupTime')

    if (isEmpty(creditGroupList)) { return <></> }

    return reverse(keys(creditGroupList).sort()).map((key, index) => {
      const CreditPerDay = map(
        reverse(sortBy(creditGroupList[key], ['createdAt'])),
        (transaction, transactionIndex) => (<TransactionItemCollapsible credit={transaction} key={`credit-info-items-${transactionIndex}`} />))

      const dateMoment = moment.utc(key, 'YYYYMMDD')
      const isToDay = dateMoment.clone().diff(moment.utc(), 'day')
      const displayDayString = (isToDay === 0)
        ? constants.today
        : (isToDay === -1)
          ? constants.yesterday
          : dateMoment.format('DD MMM YYYY')

      return (
        <div className="row mt-4" key={`${key}-${index}`}>
          <div className="col">
            <div className="display-date-text mb-2">{displayDayString}</div>
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

    const TransactionList = this.renderTransactionList()

    return (
      <div className="credit-info-list-container">
        <div className="container">
          <div className="row">
            <div className="col">
              <ALink id="backto-previus-page" color="#dd3d45" bold onClick={this.onPressBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
                {constants.back}
              </ALink>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mt-3">
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <CreditCard credit={this.props.wallet.money || 0} />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <div className="updated-time-text">{updatedTimeText}</div>
                </div>
              </div>
              <div className="row mt-3 mb-3">
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
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-3">
              <div className="credit-info-transaction-wrapper p2-x p2-t">
                <div className="row">
                  <div className="col">
                    <h3>{constants.titleText}</h3>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    {TransactionList}
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