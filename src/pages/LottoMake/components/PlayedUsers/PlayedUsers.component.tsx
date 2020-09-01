import React, { SFC, useState } from 'react'
import moment from 'moment'
import { Collapse } from 'components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { transformer } from 'utils'

import './playedUsers.style.scss'

const constants = {
  nameList: 'รายการยิงเลข',
}

const defaultProps: IPlayedUsers = {
  playedYeegeList: [],
}

const PlayedUser: SFC<IPlayedUsers> = ({ playedYeegeList }) => {

  const [collapseState, setCollapseState] = useState(false)


  const Header = (): JSX.Element => (
    <div className="row">
      <div className="col">
        <div className="d-flex flex-row p2-x p3-b align-items-center">
          <h3 className="flex">{constants.nameList}</h3>
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`chevron-right-icon ${collapseState ? 'expanded' : ''} primary-blue-text`}
          />
        </div>
      </div>
    </div>
  )

  const renderPlayedUsers = (): JSX.Element => {
    return (
      <div className="player-game-wrapper">
        {
          playedYeegeList.map((played, playedIndex) => {
            const time = moment(played.createdAt).clone().format('HH:mm:ss')
            return (
              <div className="row" key={`played-game-user-${playedIndex}`}>
                <div className="col">
                  <div className="d-flex flex-row p2-x p1-y">
                    <div className="seq-player-number"><h4>{playedIndex + 1}</h4></div>
                    <h4 className="flex">{transformer.hiddenString(played.userId?.username || '')}</h4>
                    <div className="text-right">
                      <h4>{played.number}</h4>
                      <h4 className="secondary-text">{time}</h4>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <div className="played-game-container secondary-bg p2-t">
      <Collapse
        minCollapsedHeight={180}
        onStateChanged={setCollapseState}
        RenderHeaderComponent={Header}
        RenderBodyComponent={renderPlayedUsers}
      />
    </div>
  )
}

PlayedUser.defaultProps = defaultProps

export default PlayedUser