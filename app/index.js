import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './containers/Root'
import { configureStore, history } from './store/configureStore'
import 'font-awesome/less/font-awesome.less'
import './styles/main.less'
import App from './containers/App'

const store = configureStore()

if (process.env.NODE_ENV === 'development') {
  const debugMenu = require('debug-menu')
  debugMenu.install()
}

render(
  <AppContainer>
    <Root store={store} history={history}>
      <App />
    </Root>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root') // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store}>
          <App />
        </NextRoot>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
