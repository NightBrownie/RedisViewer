import React from 'react'
import { Route, Switch } from 'react-router'

import ServerSettings from '../components/server-settings/serverSettings'
import AppMainInfo from '../components/appMainInfo'

const mainRoutes = (<Switch>
  <Route path='/' component={AppMainInfo} />
  <Route path='/add-server' component={ServerSettings} />
</Switch>)

export default mainRoutes
