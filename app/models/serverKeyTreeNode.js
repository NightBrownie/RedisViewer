// @flow

import serverTreeViewNodeType from '../constants/serverTreeViewNodeType'

export class ServerKeyTreeNode {
  type: serverTreeViewNodeType
  key: string
  name: string
  nodes: ServerKeyTreeNode[]

  constructor (options?: {
    type: serverTreeViewNodeType,
    key: string,
    name: string,
    nodes?: ServerKeyTreeNode[]
  }) {
    if (options) {
      this.type = options.type
      this.key = options.key
      this.name = options.name
      this.nodes = options.nodes || []
    }
  }
}
