import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userListReducer, userDeleteReducer, userDetailReducer, customerRegisterReducer, adminRegisterReducer, vendorRegisterReducer, userUpdateReducer, vendorUpdateReducer, customerUpdateReducer} from './reducers/userReducers'
import { helpListReducer, helpDeleteReducer, helpDetailReducer, helpSaveReducer, helpSendReducer} from './reducers/helpReducers'
import { serviceListReducer, serviceDetailReducer, serviceDeleteReducer, serviceSaveReducer, locationDetailReducer, vendorDetailReducer, serviceAddReducer } from './reducers/serviceReducers'
import { paymentListReducer, serviceListDataReducer } from './reducers/salesReducer'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    userDelete : userDeleteReducer,
    userDetail : userDetailReducer,
    customerRegister: customerRegisterReducer,
    adminRegister: adminRegisterReducer,
    vendorRegister: vendorRegisterReducer,
    userUpdate: userUpdateReducer,
    vendorUpdate: vendorUpdateReducer,
    customerUpdate: customerUpdateReducer,
    helpList: helpListReducer,
    helpDelete: helpDeleteReducer,
    helpDetail: helpDetailReducer,
    helpSave: helpSaveReducer,
    helpSend: helpSendReducer,
    serviceList: serviceListReducer,
    paymentList: paymentListReducer,
    servicesData: serviceListDataReducer,
    serviceDetail: serviceDetailReducer,
    serviceDelete: serviceDeleteReducer,
    serviceSave: serviceSaveReducer,
    locationDetail: locationDetailReducer,
    vendorDetail: vendorDetailReducer,
    serviceAdd : serviceAddReducer,

})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store