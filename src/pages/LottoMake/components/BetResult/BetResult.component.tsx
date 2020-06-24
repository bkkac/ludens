import React, { SFC } from 'react'
import { find, filter, endsWith } from 'lodash'
import moment from 'moment'
import './betResult.style.scss'

declare interface IBetResultComponentProps {
  reound: string
  results: IBetResult[]
  playedYeegeList: IYeegePlay[]
}

const BetResultComponent: SFC<IBetResultComponentProps> = ({
  reound,
  results,
  playedYeegeList,
}) => {

  const filtered = filter(results, (resu) => endsWith(resu.slug, reound))

  const threeUp = find(filtered, ['valueType', 'THREE_UP'])
  const twoUp = find(filtered, ['valueType', 'TWO_UP'])
  const twoDown = find(filtered, ['valueType', 'TWO_DOWN'])

  const renderPlayedGame = () => playedYeegeList.map((played, playedIndex) => {
    const time = moment(played.createdAt).clone().format('HH:mm:ss')
    return (
      <div className="row played-game-row py-3" key={`played-game-user-${playedIndex}`}>
        <div className="col-1">{playedIndex + 1}</div>
        <div className="col">{played.userId?.username}</div>
        <div className="col">{played.number}</div>
        <div className="col">{time}</div>
      </div>
    )
  })

  return (
    <>
      <div className="bet-result-container p-4">
        <div className="row">
          <div className="col">
            <div className="bet-result-label-text">สามตัวบน</div>
            <div className="bet-result-value mt-2">{threeUp?.value || 'ไม่มีผล'}</div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <div className="bet-result-label-text">สองตัวบน</div>
            <div className="bet-result-value mt-2">{twoUp?.value || 'ไม่มีผล'}</div>
          </div>
          <div className="col">
            <div className="bet-result-label-text">สองตัวล่าง</div>
            <div className="bet-result-value mt-2">{twoDown?.value || 'ไม่มีผล'}</div>
          </div>
        </div>
      </ div>
      <div className="row mt-3 mb-4 mx-1">
        <div className="col played-game-container py-3">
          <div className="played-game-title-wrapper">
            <div className="played-game-title">รายชื่อยิงเลข</div>
          </div>
          {renderPlayedGame()}
        </div>
      </div>
    </>
  )
}

export default BetResultComponent