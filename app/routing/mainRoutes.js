import React from 'react'
import { Route, Switch } from 'react-router'

import * as routes from '../constants/routes'

import ServerSettings from '../components/server-settings/serverSettings'
import AppMainInfo from '../components/appMainInfo'

const mainRoutes = (<Switch>
  <Route path={routes.ADD_SERVER} component={ServerSettings} />
  <Route path={routes.ROOT} component={AppMainInfo} />
</Switch>)

export default mainRoutes
