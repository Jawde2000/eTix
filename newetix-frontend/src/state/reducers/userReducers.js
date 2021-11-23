import * as actions from '../actions/actionConstants';

export const userLoginReducer = (state = { }, action) => {
    switch(action.type){
        case actions.USER_LOGIN_REQUEST:
            return {loading: true}
        
        case actions.USER_LOGIN_SUCCESS:
           return {loading: false, userInfo: action.payload}
        
        case actions.USER_LOGIN_FAIL:
           return {loading: false, errorLogin: action.payload}

        case actions.USER_LOGOUT:
           return {}

        default:
            return state
    }
}

export const customerDetailsReducer = (state = { }, action) => {
    switch(action.type){
        case actions.CUSTOMER_DETAILS_REQUEST:
            return {loading: true}
        
        case actions.CUSTOMER_DETAILS_SUCCESS:
           return {loading: false, customerInfo: action.payload}
        
        case actions.CUSTOMER_DETAILS_FAILURE:
           return {loading: false, error: action.payload}

        case actions.CUSTOMER_DETAILS_RESET:
            return {}

        default:
            return state
    }
}

export const customerEditReducer = (state = { }, action) => {
    switch(action.type){
        case actions.CUSTOMER_EDIT_REQUEST:
            return {loading: true}
        
        case actions.CUSTOMER_EDIT_SUCCESS:
           return {loading: false, success: true}
        
        case actions.CUSTOMER_EDIT_FAILURE:
           return {loading: false, error: action.payload}

        case actions.CUSTOMER_EDIT_RESET:
            return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = { }, action) => {
    switch(action.type){
        case actions.USER_REGISTER_PROCESS:
            return {loading: true}
        
        case actions.USER_REGISTER_SUCCESS:
           return {loading: false, customerInfo: action.payload}
        
        case actions.USER_REGISTER_FAIL:
           return {loading: false, errorRegister: action.payload}

        case actions.USER_REGISTER_RESET:
            return {}

        default:
            return state
    }
}