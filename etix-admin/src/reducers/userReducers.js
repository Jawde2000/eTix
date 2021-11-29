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
    USER_DELETE_RESET,

    USER_CUSTOMER_REGISTER_REQUEST, 
    USER_CUSTOMER_REGISTER_SUCCESS,
    USER_CUSTOMER_REGISTER_FAIL,
    USER_CUSTOMER_REGISTER_RESET,

    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,

    USER_VENDOR_REGISTER_REQUEST, 
    USER_VENDOR_REGISTER_SUCCESS,
    USER_VENDOR_REGISTER_FAIL,
    USER_VENDOR_REGISTER_RESET,

    USER_VENDOR_UPDATE_REQUEST, 
    USER_VENDOR_UPDATE_SUCCESS,
    USER_VENDOR_UPDATE_FAIL,
    USER_VENDOR_UPDATE_RESET,

    USER_CUSTOMER_UPDATE_REQUEST, 
    USER_CUSTOMER_UPDATE_SUCCESS,
    USER_CUSTOMER_UPDATE_FAIL,
    USER_CUSTOMER_UPDATE_RESET,

    USER_UPDATE_REQUEST, 
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,

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
        
        case USER_DELETE_RESET:
            return {}

        default:
            return state
    }
}

export const customerRegisterReducer = (state = { }, action) => {
    switch(action.type){
        case USER_CUSTOMER_REGISTER_REQUEST:
            return {loading: true}
        
        case USER_CUSTOMER_REGISTER_SUCCESS:
           return {loading: false, success: true}
        
        case USER_CUSTOMER_REGISTER_FAIL:
           return {loading: false, error: action.payload}

        case USER_CUSTOMER_REGISTER_RESET:
            return {}

        default:
            return state
    }
}

export const adminRegisterReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true}
        
        case USER_REGISTER_SUCCESS:
           return {loading: false, success: true}
        
        case USER_REGISTER_FAIL:
           return {loading: false, error: action.payload}

        case USER_REGISTER_RESET:
            return {}

        default:
            return state
    }
}

export const vendorRegisterReducer = (state = { }, action) => {
    switch(action.type){
        case USER_VENDOR_REGISTER_REQUEST:
            return {loading: true}
        
        case USER_VENDOR_REGISTER_SUCCESS:
           return {loading: false, success: true}
        
        case USER_VENDOR_REGISTER_FAIL:
           return {loading: false, error: action.payload}

        case USER_VENDOR_REGISTER_RESET:
            return {}

        default:
            return state
    }
}

export const userUpdateReducer = (state={}, action) => {
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {loading: true}
        
        case USER_UPDATE_SUCCESS:
           return {loading: false, success: true}
        
        case USER_UPDATE_FAIL:
           return {loading: false, error: action.payload}

        case USER_UPDATE_RESET:
            return {}

        default:
            return state
    }
}

export const vendorUpdateReducer = (state={}, action) => {
    switch(action.type){
        case USER_VENDOR_UPDATE_REQUEST:
            return {loading: true}
        
        case USER_VENDOR_UPDATE_SUCCESS:
           return {loading: false, success: true}
        
        case USER_VENDOR_UPDATE_FAIL:
           return {loading: false, error: action.payload}

        case USER_VENDOR_UPDATE_RESET:
            return {}

        default:
            return state
    }
}

export const customerUpdateReducer = (state={}, action) => {
    switch(action.type){
        case USER_CUSTOMER_UPDATE_REQUEST:
            return {loading: true}
        
        case USER_CUSTOMER_UPDATE_SUCCESS:
           return {loading: false, success: true}
        
        case USER_CUSTOMER_UPDATE_FAIL:
           return {loading: false, error: action.payload}

        case USER_CUSTOMER_UPDATE_RESET:
            return {}

        default:
            return state
    }
}