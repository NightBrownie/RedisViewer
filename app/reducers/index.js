import {combineReducers} from 'redux'

import {routerReducer as router} from 'react-router-redux'
import layout from './layout.reducer'
import serverView from './serverView.reducer'

const rootReducer = combineReducers({
  router,
  layout,
  serverView
})

export default rootReducer
