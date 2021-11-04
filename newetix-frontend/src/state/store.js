import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routeLookupReducer, dateReducer } from './reducers/routeReducers';
import { userLoginReducer, customerDetailsReducer } from './reducers/userReducers';
import { vendorListReducer } from './reducers/helpReducers';

const reducer = combineReducers({
    routeLookup: routeLookupReducer,
    userLogin: userLoginReducer,
    vendorList: vendorListReducer,
    customerDetails: customerDetailsReducer,
    customerEdit: customerDetailsReducer,
    dateData: dateReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;