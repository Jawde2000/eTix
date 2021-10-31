import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_DETAIL_REQUEST, 
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_RESET,
} from '../constants/userConstants/userConstants'

export const userLoginReducer = (state = { }, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading: true}
        
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userDetailReducer = (state = { }, action) => {
    switch(action.type){
        case USER_DETAIL_REQUEST:
            return {loading: true}
        
        case USER_DETAIL_SUCCESS:
           return {loading: false, userD: action.payload}
        
        case USER_DETAIL_FAIL:
           return {loading: false, error: action.payload}

        case USER_DETAIL_RESET:
           return {}

        default:
            return state
    }
}