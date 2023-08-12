import {combineReducers} from 'redux';
import currentLocation from './location';
import globalStats from './global';
import loading from './loading';

export default combineReducers({currentLocation, loading, globalStats})