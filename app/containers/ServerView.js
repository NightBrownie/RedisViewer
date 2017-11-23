import React from 'react'
import {connect} from 'react-redux'

import ServerView from '../components/server-view/serverView'

import serverActions from '../actions/server'
import serverKeyTreeToolBoxActions from '../actions/serverKeyTreeToolBox'
import serverKeyTreeActions from '../actions/serverKeyTree'
import keyActions from '../actions/key'

export default connect(
  state => ({
    editServerRequested: state.serverView.serverKeyTreeToolBox.editServerRequested,
    serverKeyTree: state.serverView.serverKeyTree,
    selectedServer: state.serverView.serverKeyTree.selectedServer,
    selectedKey: state.serverView.serverKeyTree.selectedKey
  }),
  dispatch => ({
    requestServerList: () => dispatch(serverActions.requestList()),
    requestRemoveServer: (server) => dispatch(serverActions.remove(server)),

    requestEditServer: (server) => dispatch(serverKeyTreeToolBoxActions.requestEditServer(server)),
    filterChanged: (filterTerm) => dispatch(serverKeyTreeToolBoxActions.filterChanged(filterTerm)),

    keySelected: (server, key) => dispatch(serverKeyTreeActions.keySelected(server, key)),
    serverSelected: (server) => dispatch(serverKeyTreeActions.serverSelected(server)),
    openKey: (server, key) => dispatch(serverKeyTreeActions.openKey(server, key)),

    toggleServerListItemExpand: (itemKey) => dispatch(serverKeyTreeActions.toggleItemExpand(itemKey)),

    requestKeys: (server) => dispatch(keyActions.loadKeys(server))
  })
)(ServerView)
