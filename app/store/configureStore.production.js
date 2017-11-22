import { createStore, applyMiddleware } from 'redux'
import createDebounceMiddleware from 'redux-debounced'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers/root'
import { createMemoryHistory as createHistory } from 'history'

import rootSaga from '../sagas/root'

export const history = createHistory()

const debounceMiddleware = createDebounceMiddleware()
const router = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(sagaMiddleware, router, debounceMiddleware)

export const configureStore = (initialState) => {
  let store = createStore(rootReducer, initialState, enhancer) // eslint-disable-line

  // apply sagas here
  sagaMiddleware.run(rootSaga)

  return store
}
