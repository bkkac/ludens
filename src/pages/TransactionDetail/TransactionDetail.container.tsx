import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './transactionDetail.style.scss'

class TransactionDetailContainer extends Component<RouteComponentProps<any, any, { transaction: ITransaction }>> {

  componentDidMount() {
    console.log(this.props.location.state.transaction)
  }

  render() {
    return (
      <div className="transaction-detail-container">
        {}
      </div>
    )
  }
}

export default TransactionDetailContainer