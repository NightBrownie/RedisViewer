import React from 'react'
import { Route, Switch } from 'react-router'

import routes from '../constants/routes'

import ServerSettings from '../containers/ServerSettings'
import KeyView from '../containers/KeyView'
import AppMainInfo from '../components/appMainInfo'

const mainRoutes = (<Switch>
  <Route path={routes.EDIT_SERVER} component={ServerSettings} />
  <Route path={routes.KEY_VIEW} component={KeyView} />
  <Route path={routes.ROOT} component={AppMainInfo} />
</Switch>)

export default mainRoutes
