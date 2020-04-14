import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Root } from 'pages/Root'
import 'configs/global'
import * as serviceWorker from './serviceWorker'

import 'assets/stylesheets/global.scss'

ReactDOM.render(
  <StrictMode><Root /></StrictMode>,
  document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
