import React, { Component } from 'react'
import { range, chunk, map, min, isEqual, find, isEmpty, noop, startsWith, endsWith } from 'lodash'
import { ButtonRadio, ButtonRadioGroup } from 'components'
import { number } from 'utils'
import { LOTTO_GAME_TYPE_LENGTH } from 'constants/variables'
import colors from 'constants/colors'

const defaultProps: NumbersetsProps = {
  gameMode: 'THREE_UP',
  lottos: [],
  onAddedNumber() { noop() },
}

const constants = {
  frontNumber: 'รูดหน้า',
  backNumber: 'รูดหลัง',
  nineteenDoor: '19 ประตู',
}

class NumbersetsComponent extends Component<NumbersetsProps, NumbersetsState> {

  static defaultProps = defaultProps

  state: NumbersetsState = {
    gameNumberLength: LOTTO_GAME_TYPE_LENGTH[this.props.gameMode],
    currentNumberIndex: 0,
    maxNumber: 0,
    selectedIndexFrontNumbers: [],
  }

  componentDidMount() {
    const gameNumberLength = LOTTO_GAME_TYPE_LENGTH[this.props.gameMode]
    const maxNumber = (gameNumberLength === 3)
      ? 1000
      : (gameNumberLength === 2)
        ? 100
        : 0
    this.setState({ maxNumber })
  }

  componentDidUpdate(prevProps: NumbersetsProps) {
    if (prevProps.gameMode !== this.props.gameMode) {
      const gameNumberLength = LOTTO_GAME_TYPE_LENGTH[this.props.gameMode]
      const maxNumber = (gameNumberLength === 3)
        ? 1000
        : (gameNumberLength === 2)
          ? 100
          : 0
      this.setState({ gameNumberLength, currentNumberIndex: 0, maxNumber, selectedIndexFrontNumbers: [] })
    }
  }

  handleOnNumberFunctionChanged = (state: boolean, selectedNumber: string) => {
    if (state) {
      const actureIndex = Number(selectedNumber) / 100
      this.setState({ currentNumberIndex: actureIndex })
    }
  }

  handleOnSelectNumber = (slectedNumber: string, state: boolean) => {
    const lottoNumber: ILottoNumber = {
      number: slectedNumber,
      type: this.props.gameMode,
    }
    this.props.onAddedNumber(lottoNumber, state ? 'ADD' : 'REMOVE')
  }

  handleOnChangeSelectedNumberFunction = (selectedIndex: boolean[], currentSelected: number, state: boolean, trigger: 'FRONT' | 'BACK' | 'DOOR') => {
    this.setState({ selectedIndexFrontNumbers: selectedIndex }, () => {
      const triggerFunction = trigger === 'FRONT'
        ? (paddedNumber: string) =>
          startsWith(paddedNumber, String(currentSelected))
        : trigger === 'BACK'
          ? (paddedNumber: string) =>
            endsWith(paddedNumber, String(currentSelected))
          : trigger === 'DOOR'
            ? (paddedNumber: string) =>
              (startsWith(paddedNumber, String(currentSelected)) || endsWith(paddedNumber, String(currentSelected)))
            : () => true

      const { maxNumber, gameNumberLength } = this.state
      const numbers = range(maxNumber)
        .map(numberList => number.padNumber(String(numberList), gameNumberLength))
        .filter(triggerFunction)
        .map(slectedNumber => ({ number: slectedNumber, type: this.props.gameMode }))
      this.props.onAddedNumber(numbers, state ? 'ADD' : 'REMOVE')
    })
  }

  renderNumberFunction = () => {
    const { gameNumberLength, maxNumber, currentNumberIndex } = this.state
    const rangeOfMaxNumber = range(maxNumber)
    const numbersets = chunk(rangeOfMaxNumber, 100)

    if (gameNumberLength === 3) {
      const minEachsets = map(numbersets, min)
      const paddedEachsets = map(minEachsets, (set) => number.padNumber(String(set), 3))
      const eachPaddedNumbersets = chunk(paddedEachsets, 5)

      const Numbersets = map(eachPaddedNumbersets, (numberset, numbersetIndex) => {
        const Numbers = map(numberset, (numbers, numbersIndex) => {
          const isCurrentActive = isEqual(number.padNumber(String(currentNumberIndex * 100), 3), numbers)
          return (
            <div
              className="m1-t"
              key={`numbers-${numbers}-${numbersIndex}`}
              style={{ paddingRight: 4, paddingLeft: 4 }}
            >
              <ButtonRadio
                stylename="outline"
                id={`numberset-${numbers}`}
                text={numbers}
                paddingX={8}
                forceState={isCurrentActive}
                defaultState={isCurrentActive}
                onChangeState={state => this.handleOnNumberFunctionChanged(state, numbers)}
                backgroundColor={colors.PRIMARY_RED}
                color={colors.PRIMARY_TEXT}
              />
            </div>
          )
        })
        return (
          <div
            className="col-12 col-md-6 d-flex flex-row justify-content-around p-0"
            key={`numbersets-${numbersetIndex}`}
          >
            {Numbers}
          </div>
        )
      })

      return (<div className="row">{Numbersets}</div>)
    }

    const datasets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const numberIndexs = (trigger: 'FRONT' | 'BACK' | 'DOOR') => datasets.map(numb => {
      const traggerFunction = (trigger === 'FRONT')
        ? (lotto: ILottoNumber) => (startsWith(lotto.number, String(numb)) && lotto.type === this.props.gameMode)
        : (trigger === 'BACK')
          ? (lotto: ILottoNumber) => (endsWith(lotto.number, String(numb)) && lotto.type === this.props.gameMode)
          : (trigger === 'DOOR')
            ? (lotto: ILottoNumber) => ((startsWith(lotto.number, String(numb)) || endsWith(lotto.number, String(numb)))
              && lotto.type === this.props.gameMode)
            : noop

      const filteredNumberIndexs = this.props.lottos.filter(traggerFunction)
      const lengthOfapproved = (trigger === 'DOOR') ? 18 : 9
      return filteredNumberIndexs.length > lengthOfapproved
    })

    return (
      <>
        <div className="row">
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <h4 className="m1-b">{constants.nineteenDoor}</h4>
            <ButtonRadioGroup
              id="nineteendoor-number"
              forceSelectedData={numberIndexs('DOOR')}
              onChange={(selectedNumbers, currentSelected, state) =>
                this.handleOnChangeSelectedNumberFunction(selectedNumbers, currentSelected, state, 'DOOR')}
              dataset={datasets}
            />
          </div>
        </div>
        <div className="row m2-t">
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <h4 className="m1-b">{constants.frontNumber}</h4>
            <ButtonRadioGroup
              id="front-number"
              forceSelectedData={numberIndexs('FRONT')}
              onChange={(selectedNumbers, currentSelected, state) =>
                this.handleOnChangeSelectedNumberFunction(selectedNumbers, currentSelected, state, 'FRONT')}
              dataset={datasets}
            />
          </div>
        </div>
        <div className="row m2-t">
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <h4 className="m1-b">{constants.backNumber}</h4>
            <ButtonRadioGroup
              id="back-number"
              forceSelectedData={numberIndexs('BACK')}
              onChange={(selectedNumbers, currentSelected, state) =>
                this.handleOnChangeSelectedNumberFunction(selectedNumbers, currentSelected, state, 'BACK')}
              dataset={datasets}
            />
          </div>
        </div>
      </>
    )
  }

  renderNumbersets = () => {
    const { lottos } = this.props
    const { gameNumberLength, maxNumber } = this.state
    const rangeOfMaxNumber = range(maxNumber)
    const paddedNumbers = map(rangeOfMaxNumber, (numb) => number.padNumber(String(numb), gameNumberLength))
    const numbersets = chunk(paddedNumbers, 100)
    const eachNumbersets = chunk(numbersets[this.state.currentNumberIndex], 5)

    const Numbersets = map(eachNumbersets, (numberset, numbersetIndex) => {
      const Numbers = map(numberset, (numbers, numbersIndex) => {
        const lotto = find(lottos, { number: numbers, type: this.props.gameMode })
        const isSelected = !isEmpty(lotto)

        return (
          <div
            className="m1-t"
            key={`numbers-${numbers}-${numbersIndex}`}
            style={{ paddingRight: 4, paddingLeft: 4 }}
          >
            <ButtonRadio
              id={`numberset-${numbers}`}
              text={numbers}
              paddingX={8}
              forceState={isSelected}
              defaultState={isSelected}
              onChangeState={state => this.handleOnSelectNumber(numbers, state)}
              backgroundColor={colors.SECONDARY_TEXT}
              color={colors.PRIMARY_TEXT}
            />
          </div>
        )
      })
      return (
        <div
          className="col-12 col-md-6 d-flex flex-row justify-content-around p-0"
          key={`numbersets-${numbersetIndex}`}
        >
          {Numbers}
        </div>
      )
    })

    return <div className="row p4-t">{Numbersets}</div>
  }

  render() {
    const NumberFunctions = this.renderNumberFunction
    const Numbersets = this.renderNumbersets
    return (
      <>
        <NumberFunctions />
        <Numbersets />
      </>
    )
  }
}

export default NumbersetsComponent