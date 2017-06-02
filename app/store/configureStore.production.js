import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {routerMiddleware} from 'react-router-redux'
import rootReducer from '../reducers'
import {createMemoryHistory as createHistory} from 'history'

import rootSaga from '../sagas'

export const history = createHistory()

const router = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(sagaMiddleware, router)

export const configureStore = (initialState) => {
  let store = createStore(rootReducer, initialState, enhancer); // eslint-disable-line

  // apply sagas here
  sagaMiddleware.run(rootSaga)

  return store
}
