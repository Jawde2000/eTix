import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routeLookupReducer, dateReducer, locationListReducer, routeFilterReducer, locationSearchReducer } from './reducers/routeReducers';
import { userLoginReducer, customerDetailsReducer } from './reducers/userReducers';
import { vendorListReducer, helpdeskReducer, helpResponseReducer } from './reducers/helpReducers';
import { cartAddReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    routeLookup: routeLookupReducer,
    userLogin: userLoginReducer,
    vendorList: vendorListReducer,
    customerDetails: customerDetailsReducer,
    customerEdit: customerDetailsReducer,
    dateData: dateReducer,
    helpdeskCreate: helpdeskReducer,
    helpdeskList: helpdeskReducer,
    locationList: locationListReducer,
    helpResponseList: helpResponseReducer,
    cartAdd: cartAddReducer,
    routeFilter: routeFilterReducer,
    locationSearch: locationSearchReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;