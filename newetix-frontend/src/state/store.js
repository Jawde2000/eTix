import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routeLookupReducer, routeDataManagementReducer } from './reducers/routeReducers';

const reducer = combineReducers({
    routeLookup: routeLookupReducer,
    storeLookup: routeDataManagementReducer,
    retrieveLookup: routeDataManagementReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;