import {combineReducers} from 'redux'

import {routerReducer as routing} from 'react-router-redux'
import layout from './layout.reducer'
import serverView from './serverView.reducer'

const rootReducer = combineReducers({
  routing,
  layout,
  serverView
})

export default rootReducer
