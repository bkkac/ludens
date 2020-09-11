/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, useEffect } from 'react'
import { noop, keys, range, reduce } from 'lodash'
import { ALink, InputText, InputSelect, InputNumber, SelectorItem, Button } from 'components'
import colors from 'constants/colors'
import { RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FormikProps, Formik } from 'formik'
import initial from './models/initialValues'
import scheme from './models/scheme'
import './lottoFavoriteForm.style.scss'
import { LOTTO_BET_TYPES, LOTTO_GAME_TYPE_NAME, LOTTO_GAME_TYPE_LENGTH } from 'constants/variables'

const constants = {
  back: 'กลับ',
  remove: 'ลบรายการเลขชุด',
  add: 'เพิ่มเลข',
  save: 'บันทึก',
  favoriteManagement: 'เพิ่มรายการเลขชุด',
  favoriteName: 'ชื่อเลขชุด',
  favoriteType: 'ประเภทการแทง',
  favoriteTypePlaceholder: 'กรอกประเภทการแทง',
  favoriteNumberLabel: 'ตัวเลข',
  favoriteNumber: (length: number) => {
    return (length > 0)
      ? `กรอกเลข ${length} ตัว`
      : 'กรอกตัวเลข'
  },
}

const defaultProps: ILottoFavoriteFormProps & ILottoFavoriteFormActionProps = {
  addLottoFavorite() { noop() },
  editLottoFavorite() { noop() },
  loader() { noop() },
  addLottoFavoriteIsFetching: false,
  addLottoFavoriteCode: 0,
  addLottoFavoriteError: '',
  editLottoFavoriteIsFetching: false,
  editLottoFavoriteCode: 0,
  editLottoFavoriteError: '',
}

class LottoFavoriteFormContainer
  extends Component<
  ILottoFavoriteFormProps & ILottoFavoriteFormActionProps
  & RouteComponentProps,
  ILottoFavoriteFormState
  > {

  static defaultProps = defaultProps

  state: ILottoFavoriteFormState = {
    isDertySet: false,
    initialSet: initial.set,
    initialNumber: initial.number,
  }

  onPressBack = () => {
    this.props.history.goBack()
  }

  handleOnSubmitSet = () => {
    // TODO
  }

  handleOnSubmitNumber = () => {
    // TODO
  }

  onClickRemoveSetNumber = () => {
    // TODO
  }

  renderLottoGameTypeOption = ({ item, ...selectProps }: IInputDefaultSelectProps<TLottoGameType>): JSX.Element => {
    return (
      <SelectorItem
        title={LOTTO_GAME_TYPE_NAME[item]}
        {...selectProps}
      />
    )
  }

  renderFavoriteLottoForm = () => {
    const LottoFavoriteSetFormComponent = ({
      values,
      handleBlur,
      handleChange,
      errors,
      touched,
    }: FormikProps<{ title: string }>) => {
      return (
        <div className="row p2-t">
          <div className="col">
            <h6 className="subtitle-2  secondary-blue-text">{constants.favoriteName}</h6>
            <InputText
              name="title"
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
              errorMessage={errors.title}
              error={!!errors.title && touched.title}
              placeholder={constants.favoriteName}
            />
          </div>
        </div>
      )
    }

    return (
      <Formik
        initialValues={{ ...this.state.initialSet }}
        validationSchema={scheme.set}
        enableReinitialize
        onSubmit={this.handleOnSubmitSet}
      >
        {LottoFavoriteSetFormComponent}
      </Formik>
    )
  }

  renderFavoriteLottoNumberForm = () => {
    const LottoFavoriteSetFormComponent = ({
      values,
      handleBlur,
      handleChange,
      setFieldValue,
      errors,
      touched,
      isValid,
    }: FormikProps<IFavoriteNumberRequest>) => {
      const gameList = keys(LOTTO_BET_TYPES)
      const maxLength = LOTTO_GAME_TYPE_LENGTH[values.type as TLottoGameType] || 0
      const format = reduce(range(maxLength), (prev) => `${prev}#`, '')

      useEffect(() => {
        setFieldValue('number', '')
      }, [values.type])
      return (
        <div className="row m4-t">
          <div className="col">
            <InputSelect<TLottoGameType, string>
              name="type"
              items={gameList as TLottoGameType[]}
              value={values.type}
              onChange={(type) => setFieldValue('type', type)}
              placeholder={constants.favoriteTypePlaceholder}
              RenderSelected={this.renderLottoGameTypeOption}
            />
          </div>
          <div className="col">
            <InputNumber
              hiddenErrorBlock
              decimalScale={0}
              disabled={this.state.isDertySet}
              placeholder={constants.favoriteNumber(maxLength)}
              name="number"
              format={format}
              errorMessage={errors.number}
              error={!!errors.number && touched.number}
              allowNegative={false}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.number}
            />
          </div>
          <div className="col-12 col-lg-3 m3-t">
            <Button
              buttonType="submit"
              id="add-favorite-number-button"
              disabled={!isValid}
              text={constants.add}
            />
          </div>
        </div>
      )
    }

    return (
      <Formik
        initialValues={{ ...this.state.initialNumber }}
        validationSchema={scheme.number}
        enableReinitialize
        onSubmit={this.handleOnSubmitNumber}
      >
        {LottoFavoriteSetFormComponent}
      </Formik>
    )
  }

  renderNumberList = () => {
    // TODO
    return (
      <>
        <div className="row p1-y">
          <div className="col">
            <span className="body-1">1. สามตัวบน</span>
          </div>
          <div className="col">
            <span className="body-1">123</span>
          </div>
        </div>
        <div className="row p1-y">
          <div className="col">
            <span className="body-1">2. สามตัวบน</span>
          </div>
          <div className="col">
            <span className="body-1">123</span>
          </div>
        </div>
        <div className="row p1-y">
          <div className="col">
            <span className="body-1">3. สามตัวบน</span>
          </div>
          <div className="col">
            <span className="body-1">123</span>
          </div>
        </div>
        <div className="row p1-y">
          <div className="col">
            <span className="body-1">4. สามตัวบน</span>
          </div>
          <div className="col">
            <span className="body-1">123</span>
          </div>
        </div>
      </>
    )
  }

  render() {
    const FavoriteLottoFormComponent = this.renderFavoriteLottoForm
    const FavoriteLottoNumberFormComponent = this.renderFavoriteLottoNumberForm
    const FavoriteLottoNumberListComponent = this.renderNumberList
    return (
      <div className="lotto-favorite-form-container primary-bg">
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
            </div>
          </div>
          <FavoriteLottoFormComponent />
          <div className="row m2-t">
            <div className="col">
              <h6 className="subtitle-2  secondary-blue-text">{constants.favoriteType}</h6>
            </div>
            <div className="col">
              <h6 className="subtitle-2  secondary-blue-text">{constants.favoriteNumberLabel}</h6>
            </div>
          </div>
          <FavoriteLottoNumberListComponent />
          <FavoriteLottoNumberFormComponent />
          <div className="row m2-t">
            <div className="col text-center">
              <ALink id="remove-number-set" color={colors.PRIMARY_RED} bold onClick={this.onClickRemoveSetNumber}>
                <FontAwesomeIcon icon={faTrashAlt} className="m1-r" />
                {constants.remove}
              </ALink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LottoFavoriteFormContainer