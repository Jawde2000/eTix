import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userDetailReducer, userUpdateReducer, vendorUpdateReducer} from './reducers/userReducers'
import { registerReducer } from './reducers/registerReducers'
import { helpListReducer, helpDeleteReducer, helpDetailReducer, helpSaveReducer, helpSendReducer, helpSendAddReducer} from './reducers/helpReducers'
import { serviceReducer, serviceDetailReducer, serviceDeleteReducer, serviceSaveReducer, locationDetailReducer, serviceAddReducer } from './reducers/servicesReducers'
import { paymentListReducer, serviceListDataReducer } from './reducers/salesReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: registerReducer,
    deleteHelplist: helpDeleteReducer,
    helpList: helpListReducer,
    helpDetail: helpDetailReducer,
    userDetail : userDetailReducer,
    serviceList: serviceReducer,
    serviceDelete: serviceDeleteReducer,
    serviceSave: serviceSaveReducer,
    serviceAdd : serviceAddReducer,
    serviceDetail: serviceDetailReducer,
    helpSave: helpSaveReducer,
    helpSend: helpSendReducer,
    sendHelpAdmin: helpSendAddReducer,
    userUpdate: userUpdateReducer,
    vendorUpdate: vendorUpdateReducer,
    locationDetail: locationDetailReducer,
    paymentList: paymentListReducer,
    servicesData: serviceListDataReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store


