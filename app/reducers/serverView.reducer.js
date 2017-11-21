import {combineReducers} from 'redux'

import serverKeyTreeToolBox from './serverKeyTreeToolBox.reducer'
import serverKeyTree from './serverKeyTree.reducer'

const serverViewReducer = combineReducers({
  serverKeyTreeToolBox,
  serverKeyTree
})

export default serverViewReducer
