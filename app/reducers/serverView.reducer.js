import {combineReducers} from 'redux'

import serverViewToolBox from './serverViewToolBox.reducer'
import serverList from './serverList.reducer'

const serverViewReducer = combineReducers({
  serverViewToolBox,
  serverList
})

export default serverViewReducer
