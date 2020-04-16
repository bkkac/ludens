import React, { SFC } from 'react'
import './textRunning.style.scss'

const TextRunning: SFC<ITextRunningProps> = (props) => {

  const { text } = props

  return (
    <div className="text-running-container">
      <div className="text-running">
        <p>{text}</p>
      </div>
    </div>
  )
}

export default TextRunning