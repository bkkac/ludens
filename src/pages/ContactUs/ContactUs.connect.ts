import { connect } from 'react-redux'
import ContactUsContainer from './ContactUs.container'

const mapStateToProps = (state: RootReducers): IContactUsProps => ({
  webConfig: state.ludens.config.me.data!,
})

export default connect(mapStateToProps, null)(ContactUsContainer)