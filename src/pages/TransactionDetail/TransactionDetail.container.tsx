import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './transactionDetail.style.scss'

class TransactionDetailContainer extends Component<RouteComponentProps<any, any, { transaction: ITransaction }>> {

  render() {
    return (
      <div className="transaction-detail-container">
        {}
      </div>
    )
  }
}

export default TransactionDetailContainer