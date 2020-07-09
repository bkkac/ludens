import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootAction } from 'typings/reduxs/Actions'
import loaderAction from 'reduxs/loader/actions'
import affilateAction from 'reduxs/affilate/actions'
import AffilateContainer from './Affilate.container'

const mapStateToProps = (state: RootReducers): IAffilateProps => {
    return {
        affilateUuid: state.ludens.user.me.data!.affilateMeUuid!,

        getAffilateSummaryIsFetching: state.ludens.affilate.summary.isFetching!,
        getAffilateSummaryResult: state.ludens.affilate.summary.data!,
        getAffilateSummaryCode: state.ludens.affilate.summary.code!,
        getAffilateSummaryError: state.ludens.affilate.summary.error!,

        getAffilateMemberIsFetching: state.ludens.affilate.member.isFetching!,
        getAffilateMemberResult: state.ludens.affilate.member.data!,
        getAffilateMemberCode: state.ludens.affilate.member.code!,
        getAffilateMemberError: state.ludens.affilate.member.error!,
    }
}

const mapDispatchToProos = (dispatch: Dispatch<RootAction>): IAffilateActionProps => bindActionCreators({
    loader: loaderAction.loadingAction,
    getAffilateSummary: affilateAction.affilateSummaryAction,
    getAffilateMember: affilateAction.affilateMemberAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProos)(AffilateContainer)