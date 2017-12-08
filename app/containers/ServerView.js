import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import ServerView from '../components/ServerView'

import serverActions from '../actions/server'
import serverKeyTreeToolBoxActions from '../actions/serverKeyTreeToolBox'
import serverKeyTreeActions from '../actions/serverKeyTree'
import keyActions from '../actions/key'

import routes from '../constants/routes'

export default withRouter(connect(
  state => ({
    serverKeyTree: state.serverView.serverKeyTree,
    selectedServer: state.serverView.serverKeyTree.selectedServer,
    selectedKey: state.serverView.serverKeyTree.selectedKey
  }),
  (dispatch, { history }) => ({
    requestServerList: () => dispatch(serverActions.requestList()),
    requestRemoveServer: (server) => dispatch(serverActions.remove(server)),

    requestAddServer: () => {
      dispatch(serverKeyTreeToolBoxActions.requestAddServer())
      history.push(routes.ADD_OR_EDIT_SERVER_SETTINGS)
    },
    requestEditServer: (server) => {
      dispatch(serverKeyTreeToolBoxActions.requestEditServer(server))
      history.push(routes.ADD_OR_EDIT_SERVER_SETTINGS)
    },
    filterChanged: (filterTerm) => dispatch(serverKeyTreeToolBoxActions.filterChanged(filterTerm)),

    keySelected: (server, key) => dispatch(serverKeyTreeActions.keySelected(server, key)),
    serverSelected: (server) => dispatch(serverKeyTreeActions.serverSelected(server)),
    openKey: (server, key) => dispatch(serverKeyTreeActions.openKey(server, key)),

    toggleServerListItemExpand: (itemKey) => dispatch(serverKeyTreeActions.toggleItemExpand(itemKey)),

    requestKeys: (server) => dispatch(keyActions.loadKeys(server))
  })
)(ServerView))
