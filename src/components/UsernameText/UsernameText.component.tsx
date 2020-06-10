import React, { SFC } from 'react'
import { ResponsiveIcon } from 'components'
import UserX1 from 'assets/images/global/user/user.png'
import UserX2 from 'assets/images/global/user/user@2x.png'
import UserX3 from 'assets/images/global/user/user@3x.png'
import './usernameText.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IUsernameText = {
  username: '',
}

const UsernameText: SFC<IUsernameText & DefaultProps> = (props) => {

  return (
    <div className="username-text-container">
      <ResponsiveIcon
        icon={{ x1: UserX1, x2: UserX2, x3: UserX3 }}
        className="username-text-icon"
        alt="username-icon"
      />
      <div className="username-text">{props.username}</div>
    </div>
  )
}

UsernameText.defaultProps = defaultProps

export default UsernameText