import {combineReducers} from 'redux';

import serverViewToolbar from './serverViewToolbar.reducer';
import serverList from "./serverList.reducer";

const serverViewReducer = combineReducers({
    serverViewToolbar,
    serverList
});

export default serverViewReducer;
