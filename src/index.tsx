import React, { StrictMode } from 'react'
import { RouterProvider } from 'react-router5'
import ReactDOM from 'react-dom'
import createRouter from 'configs/router'
import { Root } from 'pages/Root'
import 'configs/global'
import * as serviceWorker from './serviceWorker'

import 'assets/stylesheets/global.scss'

const router = createRouter()

router.start(() => {
  ReactDOM.render(
    <StrictMode><RouterProvider router={router}><Root /></RouterProvider></StrictMode>,
    document.getElementById('root')
  )
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
