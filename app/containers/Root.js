import React from 'react'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { ConnectedRouter as Router } from 'react-router-redux'

export default function Root ({store, history, children}) {
  return (
    <IntlProvider locale='en'>
      <Provider store={store}>
        <Router history={history}>
          {children}
        </Router>
      </Provider>
    </IntlProvider>
  )
};
