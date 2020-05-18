import 'configs/global'
import React from 'react'
import { Provider } from 'react-redux'
import { Root } from 'pages/Root'
import ReactDOM from 'react-dom'
import configureStore from 'configs/store'
import interceptor from 'configs/interceptor'
import { PersistGate } from 'redux-persist/lib/integration/react'
import * as serviceWorker from './serviceWorker'

import 'assets/stylesheets/global.scss'

const { store, persistor } = configureStore()
interceptor({}, () => store)

ReactDOM.render(
  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  ),
  document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
