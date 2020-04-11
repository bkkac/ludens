import React, { StrictMode } from 'react'
import { RouterProvider } from 'react-router5'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Root } from 'pages/Root'
import createRouter from 'configs/router'
import configureStore from 'configs/store'
import interceptor from 'configs/interceptor'
import 'configs/global'
import * as serviceWorker from './serviceWorker'

import 'assets/stylesheets/global.scss'

const router = createRouter()
const store = configureStore()
interceptor({}, configureStore)

router.start(() => {
  ReactDOM.render(
    (
      <StrictMode>
        <Provider store={store}>
          <RouterProvider router={router}><Root /></RouterProvider>
        </Provider>
      </StrictMode>
    ),
    document.getElementById('root')
  )
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
