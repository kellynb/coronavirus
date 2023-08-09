import {combineReducers} from 'redux';
import currentLocation from './location';
import globalStats from './global';

export default combineReducers({currentLocation, globalStats})