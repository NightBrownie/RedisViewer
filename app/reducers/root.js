import {combineReducers} from 'redux'

import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'

import layout from './mainLayout'
import serverView from './serverView'
import serverSettings from './serverSettings'
import keyView from './keyView'

const rootReducer = combineReducers({
  router,
  form,
  layout,
  serverView,
  serverSettings,
  keyView
})

export default rootReducer
