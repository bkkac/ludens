/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, useEffect, ChangeEvent } from 'react'
import { noop, keys, range, reduce, isEmpty, map, isEqual } from 'lodash'
import { ALink, InputText, InputSelect, InputNumber, SelectorItem, Button, ButtonIcon } from 'components'
import colors from 'constants/colors'
import { RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FormikProps, Formik, Form } from 'formik'
import initial from './models/initialValues'
import scheme from './models/scheme'
import { LOTTO_BET_TYPES, LOTTO_GAME_TYPE_NAME, LOTTO_GAME_TYPE_LENGTH } from 'constants/variables'
import response from 'constants/response'
import './lottoFavoriteForm.style.scss'

const constants = {
  back: 'กลับ',
  remove: 'ลบรายการเลขชุด',
  add: 'เพิ่มเลข',
  save: 'บันทึก',
  edit: 'แก้ไข',
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
  loader() { noop() },
  getLottoFavorite() { noop() },
  addLottoFavoriteTitle() { noop() },
  addLottoFavoriteNumber() { noop() },
  editLottoFavoriteTitle() { noop() },
  editLottoFavoriteNumber() { noop() },
  removeLottoFavoriteTitle() { noop() },
  removeLottoFavoriteNumber() { noop() },
  getLottoFavoriteIsFetching: false,
  getLottoFavoriteCode: 0,
  getLottoFavoriteError: '',
  favoriteLotto: {
    id: 0,
    list: [],
    title: '',
    createdAt: '',
    updatedAt: '',
  },
  addLottoFavoriteTitleIsFetching: false,
  addLottoFavoriteTitleCode: 0,
  addLottoFavoriteTitleError: '',
  addLottoFavoriteTitleResponse: {
    id: 0,
    list: [],
    title: '',
    createdAt: '',
    updatedAt: '',
  },
  editLottoFavoriteTitleIsFetching: false,
  editLottoFavoriteTitleCode: 0,
  editLottoFavoriteTitleError: '',
  removeLottoFavoriteTitleIsFetching: false,
  removeLottoFavoriteTitleCode: 0,
  removeLottoFavoriteTitleError: '',
  addLottoFavoriteNumberIsFetching: false,
  addLottoFavoriteNumberCode: 0,
  addLottoFavoriteNumberError: '',
  editLottoFavoriteNumberIsFetching: false,
  editLottoFavoriteNumberCode: 0,
  editLottoFavoriteNumberError: '',
  removeLottoFavoriteNumberIsFetching: false,
  removeLottoFavoriteNumberCode: 0,
  removeLottoFavoriteNumberError: '',
}

class LottoFavoriteFormContainer
  extends Component<
  ILottoFavoriteFormProps & ILottoFavoriteFormActionProps
  & RouteComponentProps<any, any, { mode: 'ADD' | 'EDIT'; id?: number }>,
  ILottoFavoriteFormState
  > {

  static defaultProps = defaultProps

  numberFormInstance: FormikProps<IFavoriteNumberRequest> | null = null

  state: ILottoFavoriteFormState = {
    titleName: '',
    isDertySet: false,
    isOnEdit: false,
    initialSet: initial.set,
    initialNumber: initial.number,
    currentNumber: {
      number: '',
      type: '',
    },
  }

  componentDidMount() {
    const favoriteLottoMode = this.props.history.location.state.mode
    if (favoriteLottoMode === 'EDIT') {
      const favoriteLottoId = this.props.history.location.state.id
      this.props.loader(true)
      this.getLottoFavorite(favoriteLottoId!)
    }
  }

  componentDidUpdate(prevProps: ILottoFavoriteFormProps) {
    // Add number set title
    if (prevProps.addLottoFavoriteTitleIsFetching !== this.props.addLottoFavoriteTitleIsFetching
      && !this.props.addLottoFavoriteTitleIsFetching) {
      const numberObject: IFavoriteNumberRequest = this.state.currentNumber
      this.handleOnAddNumber({ ...numberObject, myNumberListId: this.props.addLottoFavoriteTitleResponse.id })
    }
    // Add number
    if (prevProps.addLottoFavoriteNumberIsFetching !== this.props.addLottoFavoriteNumberIsFetching
      && !this.props.addLottoFavoriteNumberIsFetching) {
      if (this.props.addLottoFavoriteNumberCode === response.OK) {
        if (this.numberFormInstance) {
          this.numberFormInstance.resetForm()
        }
        this.getLottoFavorite(this.props.addLottoFavoriteTitleResponse.id)
      } else {
        // TODO: Handle error
      }
    }
    // Edit number
    if (prevProps.editLottoFavoriteNumberIsFetching !== this.props.editLottoFavoriteNumberIsFetching
      && !this.props.editLottoFavoriteNumberIsFetching) {
      this.getLottoFavorite(this.props.favoriteLotto.id)
    }
    // Remove number
    if (prevProps.removeLottoFavoriteNumberIsFetching !== this.props.removeLottoFavoriteNumberIsFetching
      && !this.props.removeLottoFavoriteNumberIsFetching) {
      this.getLottoFavorite(this.props.favoriteLotto.id)
    }
    // Get favorite number
    if (prevProps.getLottoFavoriteIsFetching !== this.props.getLottoFavoriteIsFetching
      && !this.props.getLottoFavoriteIsFetching) {
      this.props.loader(false)
      if (this.props.getLottoFavoriteCode === response.OK) {
        this.setState({ initialSet: { title: this.props.favoriteLotto.title } })
      } else {
        // TODO: Handle error
      }
    }

    // Edit number set title
    if (prevProps.editLottoFavoriteTitleIsFetching !== this.props.editLottoFavoriteTitleIsFetching
      && !this.props.editLottoFavoriteTitleIsFetching) {
      this.getLottoFavorite(this.props.favoriteLotto.id)
    }
    // Remove number set title
    if (prevProps.removeLottoFavoriteTitleIsFetching !== this.props.removeLottoFavoriteTitleIsFetching
      && !this.props.removeLottoFavoriteTitleIsFetching) {
      this.props.loader(false)
      this.props.history.goBack()
    }
  }

  getLottoFavorite = (setId: number) => {
    this.props.loader(false)
    this.props.getLottoFavorite(setId)
  }

  handleOnAddNumber = (values: IFavoriteNumberRequest) => {
    this.props.addLottoFavoriteNumber(values)
  }

  onPressBack = () => {
    this.props.history.goBack()
  }

  handleOnSubmitSet = (value: { title: string }) => {
    // On edit
    this.props.loader(true)
    this.props.editLottoFavoriteTitle(this.props.favoriteLotto.id, value.title)
  }

  handleOnSubmitNumber = (values: IFavoriteNumberRequest) => {
    this.props.loader(true)
    // Is first create favorite
    if (this.props.favoriteLotto.id <= 0) {
      this.props.addLottoFavoriteTitle(this.state.titleName)
      this.setState({ currentNumber: values })
    } else if (!isEqual(this.props.favoriteLotto.title, this.state.titleName)
      && this.props.favoriteLotto.id > 0) {
      // TODO: create button update title | and Id
      this.props.editLottoFavoriteTitle(this.props.favoriteLotto.id, this.state.titleName)
      this.setState({ currentNumber: values })
    } else {
      this.handleOnAddNumber({ ...values, myNumberListId: this.props.favoriteLotto.id })
    }
  }

  handleOnClickEdit = () => {
    this.setState({ isOnEdit: true })
  }

  onClickRemoveSetNumber = () => {
    const { id } = this.props.favoriteLotto
    this.props.loader(true)
    this.props.removeLottoFavoriteTitle(id)
  }

  onClickRemoveNumber = (favoriteNumberId: number) => {
    this.props.loader(true)
    this.props.removeLottoFavoriteNumber(favoriteNumberId)
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
      setFieldValue,
      errors,
      touched,
    }: FormikProps<{ title: string }>) => {
      return (
        <Form>
          <div className="row p2-y">
            <div className="col d-flex flex-row">
              <div className="flex">
                <h6 className="subtitle-2  secondary-blue-text">{constants.favoriteName}</h6>
                <InputText
                  name="title"
                  value={values.title}
                  onBlur={handleBlur}
                  disabled={isEmpty(this.props.favoriteLotto.id) ? false : !this.state.isOnEdit}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const titleValue = event.target.value
                    setFieldValue('title', titleValue)
                    if (isEmpty(titleValue)) {
                      return this.setState({ isDertySet: false })
                    }
                    this.setState({ isDertySet: true, titleName: titleValue })
                  }}
                  errorMessage={errors.title}
                  error={!!errors.title && touched.title}
                  placeholder={constants.favoriteName}
                />
              </div>
              {
                isEmpty(this.props.favoriteLotto.id)
                  ? <></>
                  : (
                    <div className="edit-title-panel-wrapper">
                      {
                        this.state.isOnEdit
                          ? (
                            <Button
                              buttonType="submit"
                              id="submit-edit-button"
                              text={constants.save}
                            />
                          )
                          : (
                            <Button
                              id="edit-button"
                              text={constants.edit}
                              onClick={this.handleOnClickEdit}
                            />
                          )
                      }

                    </div>
                  )
              }
            </div>
          </div>
        </Form>
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
        <Form>
          <div className="row m4-t">
            <div className="col">
              <InputSelect<TLottoGameType, string>
                name="type"
                items={gameList as TLottoGameType[]}
                value={values.type}
                disabled={!this.state.isDertySet}
                onChange={(type) => setFieldValue('type', type)}
                placeholder={constants.favoriteTypePlaceholder}
                RenderSelected={this.renderLottoGameTypeOption}
              />
            </div>
            <div className="col">
              <InputNumber
                hiddenErrorBlock
                decimalScale={0}
                disabled={!this.state.isDertySet}
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
        </Form>
      )
    }

    return (
      <Formik
        innerRef={(instance: FormikProps<IFavoriteNumberRequest>) => this.numberFormInstance = instance}
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
    const numberList = this.props.favoriteLotto.list
    const NumberListComponent = map(numberList, (favoriteNumber: IFavoriteNumber, index: number) => {
      return (
        <div className="row p1-y">
          <div className="col">
            <span className="body-1">{index + 1} {LOTTO_GAME_TYPE_NAME[favoriteNumber.type] || ''}</span>
          </div>
          <div className="col d-flex flex-row">
            <span className="flex body-1">{favoriteNumber.number}</span>
            <div>
              <ButtonIcon
                id="delete-number-button"
                type="close"
                onClick={() => this.onClickRemoveNumber(favoriteNumber.id)}
              />
            </div>
          </div>
        </div>
      )
    })

    return (<>{NumberListComponent}</>)
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
              {
                isEmpty(this.props.favoriteLotto.id)
                  ? <></>
                  : (
                    <ALink id="remove-number-set" color={colors.PRIMARY_RED} bold onClick={this.onClickRemoveSetNumber}>
                      <FontAwesomeIcon icon={faTrashAlt} className="m1-r" />
                      {constants.remove}
                    </ALink>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LottoFavoriteFormContainer