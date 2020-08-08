import React, { Component } from 'react'
import { ALink } from 'components'
import { noop } from 'lodash'
import colors from 'constants/colors'
import { RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faDice, faLink, faCopy } from '@fortawesome/free-solid-svg-icons'
import { number } from 'utils'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import './affiliate.style.scss'

const constants = {
	back: 'ย้อนกลับ',
	totalIncome: 'รายได้ทั้งหมด',
	totalMember: 'สมาชิกที่แนะนำได้',
	howTo: 'วิธีรับคำแนะนำ',
	percent: 'เปอร์เซ็นส่วนแบ่ง',
	divider: 'ส่วนแบ่ง',
	income: 'รายได้',
	recommendedLink: 'ลิ้งแนะนำ',
	member: 'สมาชิก',
	totalMaked: 'จำนวนแทงทั้งหมด',
	prefixMemberCreatedAt: 'เป็นสมาชิก',
	multipy2Percent: 100,
}

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IAffilateProps & IAffilateActionProps = {
	affilateUuid: '',
	getAffilateSummary() { noop() },
	getAffilateSummaryCode: 0,
	getAffilateSummaryError: '',
	getAffilateSummaryIsFetching: false,
	getAffilateSummaryResult: {},
	getAffilateMember() { noop() },
	getAffilateMemberCode: 0,
	getAffilateMemberError: '',
	getAffilateMemberIsFetching: false,
	getAffilateMemberResult: [],
	loader() { noop() },
}

class AffilateContainer extends
	Component<RouteComponentProps & DefaultProps & IAffilateProps & IAffilateActionProps> {

	static defaultProps = defaultProps

	componentDidMount() {
		this.props.loader(true)
		this.props.getAffilateSummary()
		this.props.getAffilateMember('22041885')
	}

	componentDidUpdate(prevProps: IAffilateProps) {
		if (prevProps.getAffilateSummaryIsFetching !== this.props.getAffilateSummaryIsFetching
			&& !this.props.getAffilateSummaryIsFetching) {
			this.props.loader(false)
		}

		if (prevProps.getAffilateMemberIsFetching !== this.props.getAffilateMemberIsFetching
			&& !this.props.getAffilateMemberIsFetching) {
			this.props.loader(false)
		}
	}

	onPressBack = () => this.props.history.goBack()

	onPressQAAffilate = () => this.props.history.push('/qa')

	onPressCopy = (link: string) => {
		copy(link)
		// TODO: Create popup show copied. state
		console.log('copied.')
	}

	render() {
		const { getAffilateSummaryResult, getAffilateMemberResult } = this.props
		const totalIncome = getAffilateSummaryResult.totalIncome
		const totalMember = getAffilateSummaryResult.totalRegistered

		const affiName = 'หวยออนไลน์'
		const affiDivider = getAffilateSummaryResult.lotter ?
			(Number(getAffilateSummaryResult.lotter.rate!) * constants.multipy2Percent) : ''
		const dividerPercent = `${constants.divider} ${affiDivider}%`
		const income = getAffilateSummaryResult.income
		const affiIncome = number.castToMoney(Number(income))
		const link = `${window.location.host}/register/${this.props.affilateUuid}`
		const memberList = getAffilateMemberResult.map((memberData) => {
			return {
				memberName: memberData.memberName,
				totalMakedMoney: number.castToMoney(Number(memberData.totalBet)),
				createdAt: moment(memberData.createdAt).add('years', 543).format('Do MMMM YY'),
			}
		})

		return (
			<div className="affilate-container">
				<div className="container">
					<div className="row">
						<div className="col">
							<ALink id="backto-previus-page" color="#dd3d45" bold onClick={this.onPressBack}>
								<FontAwesomeIcon icon={faChevronLeft} className="mr-1" />
								{constants.back}
							</ALink>
						</div>
					</div>
					<div className="row m3-t">
						<div className="col text-center">
							<h2 className="secondary-blue-text">{totalIncome}</h2>
							<h4 className="m1-t">{constants.totalIncome}</h4>
						</div>
						<div className="col text-center">
							<h2 className="secondary-blue-text">{totalMember}</h2>
							<h4 className="m1-t">{constants.totalMember}</h4>
						</div>
					</div>
					<div className="row  m4-t">
						<div className="col text-center">
							<ALink id="goto-qa-howto-aff" color={colors.PRIMARY_BLUE} >
								{constants.howTo}
							</ALink>
						</div>
					</div>
					<div className="row  m2-t">
						<div className="col">
							<div className="border-rounded secondary-bg p2">
								<h3>{constants.percent}</h3>
								<div className="m3-t d-flex flex-row align-items-center">
									<FontAwesomeIcon icon={faDice} className="secondary-text m1-r" />
									<div className="p1-x flex">
										<h5>{affiName}</h5>
										<div className="subtitle-2 secondary-text">{dividerPercent}</div>
									</div>
									<div>
										<div className="subtitle-2 secondary-text text-right">{constants.income}</div>
										<h4 className="primary-green-text">{affiIncome}</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row  m2-t">
						<div className="col">
							<div className="border-rounded secondary-bg p2">
								<h3>{constants.recommendedLink}</h3>
								<div className="m3-t d-flex flex-row align-items-center">
									<FontAwesomeIcon icon={faLink} className="secondary-text m1-r" />
									<div className="p1-x flex overflow-hidden">
										<div className="d-block text-truncate">
											<div className="subtitle-1 primary-text">{link}</div>
										</div>
									</div>
									<div className="copy-button-container" onClick={() => this.onPressCopy(link)}>
										<FontAwesomeIcon icon={faCopy} className="primary-text" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row  m2-t">
						<div className="col">
							<div className="border-rounded secondary-bg p2">
								<h3>{constants.member}</h3>
								{
									memberList.map((member, index) => {
										return (
											<div className="m3-t d-flex flex-row align-items-center" key={index}>
												<div className="flex">
													<h5>{member.memberName}</h5>
													<div className="subtitle-2 secondary-text">
														{constants.prefixMemberCreatedAt} {member.createdAt}
													</div>
												</div>
												<div className="text-right">
													<div className="subtitle-2 secondary-text text-right">{constants.totalMaked}</div>
													<h4>{member.totalMakedMoney}</h4>
												</div>
												<div className="p2-l">
													<FontAwesomeIcon icon={faChevronRight} className="primary-blue-text" />
												</div>
											</div>
										)
									})}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default AffilateContainer