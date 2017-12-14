import React from 'react'
import { Route, Switch } from 'react-router'

import routes from '../constants/routes'

import ServerSettings from '../containers/ServerSettings'
import KeyView from '../containers/KeyView'
import AppMainInfo from '../components/AppMainInfo'

const renderAddServer = () => (<ServerSettings isEditMode={false} />)
const renderEditServerSettings = () => (<ServerSettings isEditMode />)

const mainRoutes = (<Switch>
  <Route path={routes.ADD_SERVER} render={renderAddServer} />
  <Route path={routes.EDIT_SERVER_SETTINGS} render={renderEditServerSettings} />
  <Route path={routes.KEY_VIEW} component={KeyView} />
  <Route path={routes.ROOT} component={AppMainInfo} />
</Switch>)

export default mainRoutes
