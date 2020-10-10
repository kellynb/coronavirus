import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../Redux/Reducers/index';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk]

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))