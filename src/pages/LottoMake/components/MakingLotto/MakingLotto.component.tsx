import React, { Component, SFC, ChangeEvent } from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'
import { get } from 'lodash'
import { NumberPad, Switch } from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

import './makingLotto.style.scss'

const constants = {
  make: 'เพิ่มเลข',
  numSet: 'สลับ',
  lotto3: 'สามตัวบน',
  lotto2: 'สองตัวล่าง',
  lottoRun: 'เลขวิ่ง',
}

const InputCellComponent: SFC<IInputTextProps & NumberFormatProps> = (inputProps) => {

  const InputComponent: SFC<IInputTextProps> = ({
    name,
    type,
    value,
    onBlur,
    onChange,
  }) => (
      <div className="input-cell-container m-1">
        <input
          name={name}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          className="input-cell-core"
        />
      </div>
    )

  return (
    <NumberFormat
      {...inputProps}
      format="#"
      decimalScale={0}
      customInput={InputComponent}
    />
  )
}

class MakingLotto extends Component<IMakingLottoComponentProps, IMakingLottoComponentState> {

  state: IMakingLottoComponentState = {
    numberSet: '',
    gameType: 'THREE_UP',
  }

  renderInputCell = () => {
    if (this.state.gameType === 'TWO_DOWN') {
      const setOfNumber = [0, 1]

      return setOfNumber.map((num) => {
        const value = get(this.state.numberSet, num, '')
        return (
          <InputCellComponent
            key={`number-${num}`}
            value={value}
            name={`number-${num}`}
            onChange={this.onChangeNumberValue(num)}
          />
        )
      })
    } else if (this.state.gameType === 'THREE_UP') {
      const setOfNumber = [0, 1, 2]

      return setOfNumber.map((num) => {
        const value = get(this.state.numberSet, num, '')
        return (
          <InputCellComponent
            key={`number-${num}`}
            value={value}
            name={`number-${num}`}
            onChange={this.onChangeNumberValue(num)}
          />
        )
      })
    } else if (this.state.gameType === 'RUN_DOWN') {
      const setOfNumber = [0, 1, 2]

      return setOfNumber.map((num) => {
        const value = get(this.state.numberSet, num, '')
        return (
          <InputCellComponent
            key={`number-${num}`}
            value={value}
            name={`number-${num}`}
            onChange={this.onChangeNumberValue(num)}
          />
        )
      })
    }

    return <></>
  }

  onChangeNumberValue = (num: number) => (event: ChangeEvent<HTMLInputElement>) => {
    // const target = event.target.name
    const value = event.target.value
    const newValue = this.state.numberSet.concat(value)
    this.setState({
      numberSet: newValue,
    })
  }

  handleOnClickNumberPad = (num: number) => {
    if (num === -1) {
      return this.setState({ numberSet: this.state.numberSet.slice(0, -1) })
    }
    const newValue = this.state.numberSet.concat(String(num))
    return this.setState({ numberSet: newValue })
  }

  handleOnAddNumber = () => {
    const lottoNumber: ILottoNumber = {
      number: this.state.numberSet,
      type: this.state.gameType,
    }
    this.props.onClickAddNumber(lottoNumber)
    this.setState({ numberSet: '' })
  }

  handleOnSwitchLottoTypeChanged = (currentTab: ILottoType) => {
    this.setState({ gameType: currentTab })
  }

  render() {

    const switchsLottoTypes: ISwitchItem<ILottoType>[] = [
      { label: constants.lotto3, value: 'THREE_UP' },
      { label: constants.lotto2, value: 'TWO_DOWN' },
      // { label: constants.lottoRun, value: 'run' },
    ]

    return (
      <>
        <div className="row mt-3 mb-4">
          <div className="col">
            <Switch type="outline" tabs={switchsLottoTypes} handleOnChangeTab={this.handleOnSwitchLottoTypeChanged} />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col d-flex flex-row">
            <div className="leading-making-lotto-panel">
              <div className="button-making-lotto disabled">
                <FontAwesomeIcon icon={faCircleNotch} className="plus-icon-button" />
                {constants.numSet}
              </div>
            </div>
            <div className="center-making-lotto-panel d-flex flex-row justify-content-center">
              {this.renderInputCell()}
            </div>
            <div className="trailing-making-lotto-panel">
              <div className="button-making-lotto" onClick={this.handleOnAddNumber}>
                <FontAwesomeIcon icon={faPlus} className="plus-icon-button" />
                {constants.make}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <NumberPad onNumberPresses={this.handleOnClickNumberPad} />
          </div>
        </div>
      </>
    )
  }

}

export default MakingLotto