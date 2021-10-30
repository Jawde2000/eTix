import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer} from './reducers/userReducers'
import { registerReducer } from './reducers/registerReducers'
import { helpListReducer, helpDeleteReducer, helpDetailReducer } from './reducers/helpReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: registerReducer,
    deleteHelplist: helpDeleteReducer,
    helplist: helpListReducer,
    helpDetail: helpDetailReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store


