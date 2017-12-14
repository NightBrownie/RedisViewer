import {combineReducers} from 'redux'

import serverKeyTreeToolBox from './serverKeyTreeToolBox'
import serverKeyTree from './serverKeyTree'

const serverViewReducer = combineReducers({
  serverKeyTreeToolBox,
  serverKeyTree
})

export default serverViewReducer
