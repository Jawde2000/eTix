import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    
    USER_LOGOUT,

    USER_LIST_REQUEST, 
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DETAIL_REQUEST, 
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_RESET,

    USER_DELETE_REQUEST, 
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
} from '../constants/userConstants'

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

export const userListReducer = (state = { users: [] }, action) => {
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading: true}
        
        case USER_LIST_SUCCESS:
           return {loading: false, users: action.payload}
        
        case USER_LIST_FAIL:
           return {loading: false, error: action.payload}

        case USER_LIST_RESET:
           return {users:[]}

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

export const userDeleteReducer = (state = { }, action) => {
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {loading: true}
        
        case USER_DELETE_SUCCESS:
           return {loading: false, success: true}
        
        case USER_DELETE_FAIL:
           return {loading: false, error: action.payload}

        default:
            return state
    }
}