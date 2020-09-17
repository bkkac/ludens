import React, { Component } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import {
	Modal,
	ALink,
} from 'components'
import { noop, isEmpty } from 'lodash'
import routes from 'constants/routes'
import colors from 'constants/colors'
import response from 'constants/response'
import { LOTTO_SLUG_NAME } from 'constants/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Summary } from './components'
import { number } from 'utils'
import './lottoPayment.style.scss'

const constants = {
	back: 'ย้อนกลับ',
	ok: 'ตกลง',
	betSuccess: 'คุณได้ทำรายการเสร็จสมบูรณ์',
	cannotBet: 'ไม่สามารถแทงได้',
	round: 'รอบที่',
}

const defaultProps: ILottoPaymentProps & ILottoPaymentActionProps = {
	betRates: [],
	makingBetLottoResult: [],
	makingBetLottoCode: 0,
	makingBetLottoError: '',
	makingBetLottoIsFetching: false,
	makingBetLotto() { noop() },
	getBetRate() { noop() },
	loader() { noop() },
}

class LottoPaymentContainer extends Component<
	ILottoPaymentProps
	& ILottoPaymentActionProps
	& RouteComponentProps<any, any, ILottoPaymentRouteProps | IMakingLottoRouteProps>,
	ILottoPaymentState
	> {

	static defaultProps = defaultProps

	state: ILottoPaymentState = {
		lottoNumbers: [],
	}

	componentDidMount() {
		if (typeof this.props.location.state === 'undefined' || isEmpty(this.props.location.state)) {
			return this.props.history.replace(routes.main.path)
		}
		const { betList } = this.props.location.state as ILottoPaymentRouteProps
		this.setState({ lottoNumbers: betList })
	}

	componentDidUpdate(prevProps: ILottoPaymentProps) {
		if (prevProps.makingBetLottoIsFetching !== this.props.makingBetLottoIsFetching
			&& !this.props.makingBetLottoIsFetching) {
			this.props.loader(false)
			if (this.props.makingBetLottoCode === response.OK) {
				Modal.success.show({
					action: this.handleOnSuccess,
					actionText: constants.ok,
					description: constants.betSuccess,
				})
			} else if (this.props.makingBetLottoCode === response.BAD_REQUEST) {
				Modal.error.show({
					action: Modal.error.hide,
					actionText: constants.ok,
					title: constants.cannotBet,
					description: this.props.makingBetLottoError,
				})
			}
		}
	}

	componentWillUnmount() {
		Modal.success.hide()
		Modal.error.hide()
	}

	handleOnSuccess = () => {
		Modal.success.hide()
		const { lottoSlug, selectedLottoGame } = this.props.location.state as ILottoPaymentRouteProps
		const makeLottoRouteProps: IMakingLottoRouteProps = {
			selectedLottoGame: selectedLottoGame,
		}
		this.props.history.replace(`/lotto/making/${lottoSlug}`, makeLottoRouteProps)
	}

	handleOnBack = () => {
		const { lottoSlug, selectedLottoGame } = this.props.location.state as ILottoPaymentRouteProps
		const makeLottoRouteProps: IMakingLottoRouteProps = {
			selectedLottoGame: selectedLottoGame,
			betList: this.state.lottoNumbers,
		}
		this.props.history.replace(`/lotto/making/${lottoSlug}`, makeLottoRouteProps)
	}

	handleOnMakingBetLotto = (lottoList: ILottoNumber[]) => {
		this.props.loader(true)
		const lottos = lottoList.map(lotto => ({ ...lotto, value: number.castToInteger(lotto.value) }))
		this.props.makingBetLotto(lottos)
	}

	handleOnBetListChanged = (lottoList: ILottoNumber[]) => {
		this.setState({ lottoNumbers: lottoList })
	}

	handleOnGotoSelectFavorite = () => {
		const { lottoSlug, selectedLottoGame } = this.props.location.state as ILottoPaymentRouteProps
		const favoriteRouteProps: ILottoFavoriteRouteProps = {
			betList: this.state.lottoNumbers,
			selectedLottoGame,
			lottoSlug,
		}
		this.props.history.replace(routes.lottoFavorite.path, favoriteRouteProps)
	}

	render() {
		const { lottoNumbers } = this.state
		const { location, betRates } = this.props
		if (typeof location.state === 'undefined' || isEmpty(location.state)) {
			return <Redirect to={routes.main.path} />
		}
		const { lottoSlug, selectedLottoGame } = location.state as ILottoPaymentRouteProps
		return (
			<div className="lotto-payment-container primary-bg">
				<div className="container">
					<div className="row">
						<div className="col back-fixed-panel primary-bg">
							<ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={this.handleOnBack}>
								<FontAwesomeIcon icon={faChevronLeft} className="m1-r" />
								{constants.back}
							</ALink>
						</div>
					</div>
					<div className="row p4-t">
						<div className="col">
							<h2>
								{`${LOTTO_SLUG_NAME[lottoSlug]} ${(lottoSlug === 'LOTTER_YEGEE') ? `${constants.round} ${selectedLottoGame.round}` : ''}`}
							</h2>
						</div>
					</div>
					<div className="row p2-t">
						<div className="col">
							<Summary
								betRates={betRates}
								lottoList={lottoNumbers}
								onNavigateToFavorite={this.handleOnGotoSelectFavorite}
								onClickBet={this.handleOnMakingBetLotto}
								onBetListChanged={this.handleOnBetListChanged}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default LottoPaymentContainer