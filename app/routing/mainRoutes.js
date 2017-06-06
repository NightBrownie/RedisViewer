import React from 'react'
import { Route, Switch } from 'react-router'

import * as routes from '../constants/routes'

import ServerSettings from '../containers/serverSettings'
import AppMainInfo from '../components/appMainInfo'

const mainRoutes = (<Switch>
  <Route path={routes.EDIT_SERVER}>
    <ServerSettings />
  </Route>
  <Route path={routes.ROOT} component={AppMainInfo} />
</Switch>)

export default mainRoutes
