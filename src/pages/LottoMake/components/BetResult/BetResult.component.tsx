import React, { SFC } from 'react'
import { LOTTO_GAME_TYPE_NAME } from 'constants/variables'
import { find } from 'lodash'
import './betResult.style.scss'

const BetResultComponent: SFC<IBetResultComponentProps> = ({
  results,
}) => {

  const threeUp = find(results, ['valueType', 'THREE_UP'])
  const twoUp = find(results, ['valueType', 'TWO_UP'])
  const twoDown = find(results, ['valueType', 'TWO_DOWN'])

  return (
    <div className="bet-result-container secondary-bg p4">
      <div className="row">
        <div className="col text-center">
          <h4>{LOTTO_GAME_TYPE_NAME[threeUp?.valueType!]}</h4>
          <h1 className="secondary-blue-text">{threeUp?.value || ''}</h1>
        </div>
      </div>
      <div className="row m3-t">
        <div className="col text-center">
          <h4>{LOTTO_GAME_TYPE_NAME[twoUp?.valueType!]}</h4>
          <h1 className="secondary-blue-text">{twoUp?.value || ''}</h1>
        </div>
        <div className="col text-center">
          <h4>{LOTTO_GAME_TYPE_NAME[twoDown?.valueType!]}</h4>
          <h1 className="secondary-blue-text">{twoDown?.value || ''}</h1>
        </div>
      </div>
    </ div>
  )
}

export default BetResultComponent