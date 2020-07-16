import React, { SFC } from 'react'
import { ResponsiveIcon } from 'components'
import MastercardIcon from 'assets/images/global/mastercard/mastercard.svg'
import { number } from 'utils'
import './creditCard.style.scss'

declare interface ICreditCard {
    credit: number
    onClick?(): void
}

const defaultProps: ICreditCard = {
    credit: 0,
}

const constants = {
    cardNumber: '**** **** **** ****',
    remainingLabel: 'เครดิตคงเหลือ',
    thailand: 'Thailand',
    credit: 'CREDIT',
    bet: 'Bet',
}

const CreditCard: SFC<ICreditCard> = ({
    credit,
    onClick,
}) => {

    const total = number.castToMoney(credit, true)

    const handleOnClickContainer = () => {
        if(typeof onClick === 'function') {
            return onClick()
        }
    }

    return (
        <div className="wallet-card-container d-flex flex-column" onClick={handleOnClickContainer}>
            <div className="d-flex flex-row align-items-center">
                <h3 className="wallet-card-name">{constants.thailand}<span>{constants.bet}</span></h3>
                <h4 className="wallet-card-credit-name">{constants.credit}</h4>
            </div>
            <h3 className="d-flex align-items-center flex">
                {constants.cardNumber}
            </h3>
            <div className="d-flex flex-row align-items-end">
                <div className="d-flex flex-column flex">
                    <div className="wallet-card-credit-balance-label">{constants.remainingLabel}</div>
                    <h3>{total}</h3>
                </div>
                <ResponsiveIcon icon={MastercardIcon} className="mastercard-icon" alt="mastercard-icon" />
            </div>
        </div>
    )
}

CreditCard.defaultProps = defaultProps

export default CreditCard