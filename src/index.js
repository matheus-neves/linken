import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

import {createStore, applyMiddleware} from 'redux'


import App from './components/App'
const store = createStore(reducer, applyMiddleware(thunkMiddleware))


import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()