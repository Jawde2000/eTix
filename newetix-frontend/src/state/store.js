import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routeLookupReducer, dateReducer, locationListReducer, allRoutesReducer, routeFilterReducer, locationSearchReducer } from './reducers/routeReducers';
import { userLoginReducer, customerDetailsReducer, customerEditReducer,userRegisterReducer, userUpdateReducer, PasswordChangeReducer } from './reducers/userReducers';
import { vendorListReducer, helpdeskReducer, helpResponseReducer } from './reducers/helpReducers';
import { cartAddReducer, cartViewReducer, deleteReducer, paymentReducer  } from './reducers/cartReducers';
import { ticketReducer } from './reducers/ticketReducer';
import { passwordResetReducer, verifyUserWithEmail } from './reducers/forgetPassReducers';
import { serviceListReducer } from './reducers/serviceReducers';

const reducer = combineReducers({
    register: userRegisterReducer,
    routeLookup: routeLookupReducer,
    userLogin: userLoginReducer,
    vendorList: vendorListReducer,
    customerDetails: customerDetailsReducer,
    customerEdit: customerEditReducer,
    dateData: dateReducer,
    helpdeskCreate: helpdeskReducer,
    helpdeskList: helpdeskReducer,
    locationList: locationListReducer,
    helpResponseList: helpResponseReducer,
    cartAdd: cartAddReducer,
    userUpdate: userUpdateReducer,
    viewCartData: cartViewReducer,
    getAllRoutes: allRoutesReducer,
    routeFilter: routeFilterReducer,
    locationSearch: locationSearchReducer,
    payment: paymentReducer,
    removeItem: deleteReducer,
    getTickets: ticketReducer,
    verifyUser: verifyUserWithEmail,
    passwordReset: passwordResetReducer,
    passwordChanges: PasswordChangeReducer,
    servicesList: serviceListReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;