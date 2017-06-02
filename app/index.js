import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './containers/root'
import App from './containers/app'
import configureStore, { history } from './store/configureStore'
import 'font-awesome/less/font-awesome.less'
import './styles/main.less'

const store = configureStore()

render(
  <AppContainer>
    <Root store={store} history={history}>
      <App />
    </Root>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/root', () => {
    const NextRoot = require('./containers/root') // eslint-disable-line global-require
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
