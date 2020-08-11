import React, { Component } from 'react'
import { ALink, Modal } from 'components'
import { noop, map } from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import colors from 'constants/colors'
import response from 'constants/response'
import './newsroom.style.scss'
import moment from 'moment'

const constants = {
  back: 'กลับ',
  newsroom: 'ข่าวสาร',
}

const defaultProps: INewsroomProps & INewsroomActionProps = {
  getNews() { noop() },
  loader() { noop() },
  getNewsIsFetching: false,
  getNewsCode: 0,
  getNewsError: '',
  news: [],
}

class NewsroomContainer extends Component<
  INewsroomProps
  & INewsroomActionProps
  & RouteComponentProps
  > {

  static defaultProps = defaultProps

  componentDidMount() {
    this.props.loader(true)
    this.props.getNews()
  }

  componentDidUpdate(prevProps: INewsroomProps) {
    if (prevProps.getNewsIsFetching !== this.props.getNewsIsFetching
      && !this.props.getNewsIsFetching) {
      this.props.loader(false)
      if (this.props.getNewsCode !== response.OK
        && this.props.getNewsCode !== response.NOT_FOUND) {
        Modal.error.show({
          action: () => Modal.error.hide,
          description: this.props.getNewsError,
        })
      }
    }
  }

  onPressBack = () => {
    this.props.history.goBack()
  }

  renderNewsList = () => {
    const NewsComponent = map(this.props.news, (news, newsIndex) => {
      const updatedTime = moment(news.updatedAt).format('LLL')
      return (
        <div className="border-rounded secondary-bg p2 m3-t" key={`news-${newsIndex}`}>
          <h4 className="secondary-blue-text">{news.title}</h4>
          <h6 className="subtitle-2 secondary-text m1-t">{updatedTime}</h6>
          <div className="separator-line m2-t" />
          <p className="body-1">{news.description}</p>
        </div>
      )
    })

    return <>{NewsComponent}</>
  }

  render() {
    const NewsComponent = this.renderNewsList

    return (
      <div className="newsroom-container primary-bg">
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
              <h2>{constants.newsroom}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <NewsComponent />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsroomContainer