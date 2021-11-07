import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userDetailReducer, userUpdateReducer, vendorUpdateReducer} from './reducers/userReducers'
import { registerReducer } from './reducers/registerReducers'
import { helpListReducer, helpDeleteReducer, helpDetailReducer, userHDetailReducer, helpSaveReducer, helpSendReducer} from './reducers/helpReducers'
import { serviceReducer } from './reducers/servicesReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: registerReducer,
    deleteHelplist: helpDeleteReducer,
    helpList: helpListReducer,
    helpDetail: helpDetailReducer,
    userDetail : userDetailReducer,
    serviceList: serviceReducer,
    helpUserDetail: userHDetailReducer,
    helpSave: helpSaveReducer,
    helpSend: helpSendReducer,
    userUpdate: userUpdateReducer,
    vendorUpdate: vendorUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store


