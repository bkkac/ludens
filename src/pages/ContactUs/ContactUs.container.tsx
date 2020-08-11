import React, { Component } from 'react'
import { ALink } from 'components'
import { split, chunk, reduce, get } from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faLink } from '@fortawesome/free-solid-svg-icons'
import colors from 'constants/colors'
import './contactUs.style.scss'

const constants = {
  back: 'กลับ',
  contactus: 'ติดต่อเรา',
  subtitle: 'หากท่านมีปัญหา หรือข้อสงสัยใดๆ ท่านสามารถติดต่อเราในช่องทางด่านล่างนี้ได้เลย ทางเรามีพนักงานคอยดูแลเสมอ',
  line: 'Line official:',
  phone: 'เบอร์ติดต่อ:',
}

const defaultProps: IContactUsProps = {
  webConfig: {
    id: 0,
    textRunner: '',
    contactUrl: '',
    contactLine: '',
    contactPhoneNumber: '',
    updatedAt: '',
  },
}

class ContactUsContainer extends Component<IContactUsProps & RouteComponentProps> {

  static defaultProps = defaultProps

  onPressBack = () => {
    this.props.history.goBack()
  }

  onPressUrl = () => {
    window.open(`http://${this.props.webConfig.contactUrl}`, '_blank')
  }

  onPressLine = () => {
    window.open(`https://line.me/R/ti/p/${this.props.webConfig.contactLine}`, '_blank')
  }

  render() {
    const { webConfig } = this.props

    const phoneNumberArray = split(webConfig.contactPhoneNumber, '')
    const chunkPhoneNumber = chunk(phoneNumberArray, 6)
    const chunkLeading = get(chunkPhoneNumber, '0', [])
    const leadingChunk = chunk(chunkLeading, 3)
    const leadingNumber = reduce(leadingChunk, (prev, curr) => {
      const numbers = reduce(curr, (numberPrev, numberCurr) => (numberPrev + numberCurr), '')
      return `${prev}${numbers}-`
    }, '')
    const chunkTrailing = get(chunkPhoneNumber, '1', [])
    const trailingNumber = reduce(chunkTrailing, (numberPrev, numberCurr) => (numberPrev + numberCurr), '')
    const phoneNumber = `${leadingNumber}${trailingNumber}`

    return (
      <div className="contactus-container primary-bg">
        <div className="container">
          <div className="row">
            <div className="col">
              <ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={this.onPressBack}>
                <FontAwesomeIcon icon={faChevronLeft} className="m1-r" />
                {constants.back}
              </ALink>
            </div>
          </div>
          <div className="row m4-t">
            <div className="col">
              <h2>{constants.contactus}</h2>
              <h6 className="subtitle-1 secondary-text m1-t">{constants.subtitle}</h6>
            </div>
          </div>
          <div className="row m2-t p2-y">
            <div className="col">
              <div className="border-rounded secondary-bg p2">
                <div className="row">
                  <div className="col">
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        <ALink id="goto-main-web" color={colors.PRIMARY_BLUE} bold onClick={this.onPressUrl}>
                          <FontAwesomeIcon icon={faLink} className="m1-r" />
                          {webConfig.contactUrl}
                        </ALink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row p2-t">
                  <div className="col">
                    <div className="d-flex flex-row align-items-center">
                      <h5 className="secondary-text">{constants.line}</h5>
                      <div className="m2-l">
                        <div id="goto-line-contact" className="line-wrapper" onClick={this.onPressLine}>
                          <h4>{webConfig.contactLine}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row p2-y">
                  <div className="col">
                    <div className="d-flex flex-row align-items-center">
                      <h5 className="secondary-text">{constants.phone}</h5>
                      <div className="m3-l">
                        <h4>{phoneNumber}</h4>
                      </div>
                    </div>
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

export default ContactUsContainer