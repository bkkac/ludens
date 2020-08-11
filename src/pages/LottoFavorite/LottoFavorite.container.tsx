import React, { Component } from 'react'
import { ALink, Button, Modal } from 'components'
import moment from 'moment'
import colors from 'constants/colors'
import routers from 'constants/routes'
import { noop, map, isEmpty, find } from 'lodash'
import { number } from 'utils'
import { RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import response from 'constants/response'
import './lottoFavorite.style.scss'

const constants = {
  backText: 'กลับ',
  favoriteList: 'รายการชุดตัวเลข',
  favoriteManagement: 'จัดการโพย',
  select: 'เลือก',
}

const defaultProps: ILottoFavoriteProps & ILottoFavoriteActionProps = {
  getLottoFavoriteList() { noop() },
  loader() { noop() },
  getLottoFavoriteListIsFetching: false,
  getLottoFavoriteListCode: 0,
  getLottoFavoriteListError: '',
  lottoFavoriteList: [],
}

class LottoFavoriteContainer extends Component<
  ILottoFavoriteProps & ILottoFavoriteActionProps
  & RouteComponentProps<any, any, ILottoPaymentRouteProps | ILottoFavoriteRouteProps>
  > {

  static defaultProps = defaultProps

  componentDidMount() {
    this.props.loader(true)
    this.props.getLottoFavoriteList()
  }

  componentDidUpdate(prevProps: ILottoFavoriteProps) {
    if (prevProps.getLottoFavoriteListIsFetching !== this.props.getLottoFavoriteListIsFetching
      && !this.props.getLottoFavoriteListIsFetching) {
      this.props.loader(false)
      if (this.props.getLottoFavoriteListCode !== response.OK
        && this.props.getLottoFavoriteListCode !== response.NOT_FOUND) {
        Modal.error.show({
          action: () => Modal.error.hide,
          description: this.props.getLottoFavoriteListError,
        })
      }
    }
  }

  onPressBack = () => {
    this.props.history.goBack()
  }

  onClickFavoriteManagement = () => {
    this.props.history.push(routers.lottoFavorite.path)
  }

  onClickSelectFavorite = (favoriteItems: IFavoriteSet) => {
    const locationState: ILottoFavoriteRouteProps = this.props.location.state

    const finding = (numb: ILottoNumber) => isEmpty(find(favoriteItems.list, { number: numb.number, type: numb.type }))
    const newNumberList: ILottoNumber[] = locationState.betList.filter(finding)

    const currentTime = moment().format('DDMMYYYYHHmm')
    const addNumberList: ILottoNumber[] = favoriteItems.list.map(numb => ({
      number: numb.number,
      type: numb.type,
      value: '1',
      slug: `${locationState.lottoSlug}_${currentTime}${number.padNumber(locationState.selectedLottoGame.round, 3)}`,
    }))

    const appendedList: ILottoNumber[] = [
      ...newNumberList,
      ...addNumberList,
    ]
    const paymentRouteProps: ILottoPaymentRouteProps = {
      betList: appendedList,
      lottoSlug: locationState.lottoSlug,
      selectedLottoGame: locationState.selectedLottoGame,
    }
    this.props.history.replace(routers.lottoCheckout.path, paymentRouteProps)
  }

  renderFavoriteList = () => {
    const FavoriteListComponent = map(this.props.lottoFavoriteList, (favorite, index) => {
      return (
        <div key={`favorite-${index}`} className="favorite-container d-flex flex-row justify-content-between align-items-center p1-y p2-x">
          <h4 className="flex">{favorite.title}</h4>
          <div className="selector-favorite-wrapper">
            <Button
              size="small"
              id="select-this-favorite"
              text={constants.select}
              backgroundColor={colors.PRIMARY_RED}
              backgroundHoverColor={colors.SECONDARY_RED}
              onClick={() => this.onClickSelectFavorite(favorite)}
            />
          </div>
        </div>
      )
    })
    return (<>{FavoriteListComponent}</>)
  }

  render() {
    const FavoriteComponent = this.renderFavoriteList
    return (
      <div className="lotto-favorite-container primary-bg">
        <div className="container">
          <div className="row">
            <div className="col">
              <ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={this.onPressBack}>
                <FontAwesomeIcon icon={faChevronLeft} className="m1-r" />
                {constants.backText}
              </ALink>
            </div>
          </div>
          <div className="row p4-t">
            <div className="col">
              <div className="border-rounded secondary-bg">
                <div className="d-flex flex-row justify-content-between align-items-center p2">
                  <h3>{constants.favoriteList}</h3>
                  <ALink
                    id="goto-favorite-management"
                    color={colors.PRIMARY_BLUE}
                    onClick={this.onClickFavoriteManagement}
                  >
                    {constants.favoriteManagement}
                    <FontAwesomeIcon icon={faChevronRight} className="m1-l" />
                  </ALink>
                </div>
                <div className="p2-y">
                  <FavoriteComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LottoFavoriteContainer