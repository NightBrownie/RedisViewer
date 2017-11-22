import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createDebounceMiddleware from 'redux-debounced'
import { createMemoryHistory as createHistory } from 'history'
import { routerMiddleware, routerActions } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/root'

import rootSaga from '../sagas/root'

// todo: add saga monitor
// let sagaMonitor

export const history = createHistory()

export const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = []
  const enhancers = []

  // Debounce Middleware
  const debounceMiddleware = createDebounceMiddleware()
  middleware.push(debounceMiddleware)

  // Logging Middleware
  const logger = createLogger({
    level: 'debug',
    collapsed: true
  })
  middleware.push(logger)

  // Router Middleware
  const router = routerMiddleware(history)
  middleware.push(router)

  // Saga Middleware
  // TODO: apply saga monitor
  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions
  }

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
      {
        // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
        actionCreators
      })
    : compose

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer)

  // apply sagas
  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('../reducers/root', () =>
      store.replaceReducer(require('../reducers/root')) // eslint-disable-line global-require
    )
  }

  return store
}

// todo: apply saga monitor
// export function getSagaMonitor () {
//   return sagaMonitor || (sagaMonitor = createSagaMonitor())
// }
