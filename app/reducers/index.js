import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import layout from './layout.reducer';

const rootReducer = combineReducers({
    routing,
    layout
});

export default rootReducer;
