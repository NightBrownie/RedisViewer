import {combineReducers} from 'redux'

import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'

import layout from './layout.reducer'
import serverView from './serverView.reducer'
import serverSettings from './serverSettings.reducer'
import keyView from './keyView.reducer'

const rootReducer = combineReducers({
  router,
  form,
  layout,
  serverView,
  serverSettings,
  key: keyView
})

export default rootReducer
