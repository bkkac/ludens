import React, { Component } from 'react'
import { noop, map } from 'lodash'
import { ALink, Button, ButtonIcon } from 'components'
import colors from 'constants/colors'
import { RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import './lottoFavoriteManagement.style.scss'
import routes from 'constants/routes'

const constants = {
  back: 'กลับ',
  edit: 'แก้ไข',
  list: 'รายการเลขชุด',
  add: 'เพิ่มรายการเลขชุด',
  favoriteManagement: 'จัดการเลขชุด',
}

const defaultProps: ILottoFavoriteManagementProps & ILottoFavoriteManagementActionProps = {
  getLottoFavoriteList() { noop() },
  loader() { noop() },
  getLottoFavoriteListIsFetching: false,
  getLottoFavoriteListCode: 0,
  getLottoFavoriteListError: '',
  lottoFavoriteList: [],
}

class LottoFavoriteManagementContainer
  extends Component<
  ILottoFavoriteManagementProps & ILottoFavoriteManagementActionProps
  & RouteComponentProps
  > {

  static defaultProps = defaultProps

  onPressBack = () => {
    this.props.history.goBack()
  }

  onClickEditFavorite = (favorite: IFavoriteSet) => {
    // this.props.history.push(routes.)
  }

  onClickAddFavorite = () => {
    this.props.history.push(routes.lottoFavoriteAdd.path)
  }

  renderFavoriteList = () => {
    const FavoriteListComponent = map(this.props.lottoFavoriteList, (favorite, index) => {
      return (
        <div className="row">
          <div key={`favorite-${index}`} className="col d-flex flex-row p1-y p2-x">
            <h5 className="flex">{favorite.title}</h5>
            <ButtonIcon
              id={`edit-this-favorite-${index}`}
              onClick={() => this.onClickEditFavorite(favorite)}
              type="custom"
              CustomIcon={<FontAwesomeIcon icon={faEdit} />}
            />
          </div>
        </div>
      )
    })
    return (<>{FavoriteListComponent}</>)
  }

  render() {
    const FavoriteListComponent = this.renderFavoriteList
    return (
      <div className="lotto-favorite-management-container primary-bg">
        <div className="container">
          <div className="row m4-t">
            <div className="col">
              <ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={this.onPressBack}>
                <FontAwesomeIcon icon={faChevronLeft} className="m1-r" />
                {constants.back}
              </ALink>
            </div>
          </div>
          <div className="row m3-t">
            <div className="col d-flex align-items-center">
              <h2 className="flex">{constants.favoriteManagement}</h2>
              <div className="">
                <Button
                  size="medium"
                  id="add-favorite-set"
                  text={constants.add}
                  backgroundColor={colors.PRIMARY_BLUE}
                  backgroundHoverColor={colors.SECONDARY_BLUE}
                  onClick={this.onClickAddFavorite}
                />
              </div>
            </div>
          </div>
          <div className="row m2-t">
            <div className="col">
              <div className="border-rounded secondary-bg p4">
                <div className="row">
                  <div className="col d-flex flex-row">
                    <div className="flex">
                      <h4>{constants.list}</h4>
                    </div>
                  </div>
                </div>
                <FavoriteListComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LottoFavoriteManagementContainer