import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'

export default function Root ({ store, history, children }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        {children}
      </Router>
    </Provider>
  )
};
