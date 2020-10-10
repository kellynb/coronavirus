import {combineReducers} from 'redux';
import addCountries from './countries';
import currentLocation from './location';
import globalStats from './global';

export default combineReducers({addCountries, currentLocation, globalStats})