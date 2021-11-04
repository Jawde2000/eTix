import * as actions from '../actions/actionConstants';

export const userLoginReducer = (state = { }, action) => {
    switch(action.type){
        case actions.USER_LOGIN_REQUEST:
            return {loading: true}
        
        case actions.USER_LOGIN_SUCCESS:
           return {loading: false, userInfo: action.payload}
        
        case actions.USER_LOGIN_FAIL:
           return {loading: false, error: action.payload}

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
           return {loading: false, userInfo: action.payload}
        
        case actions.CUSTOMER_DETAILS_FAILURE:
           return {loading: false, error: action.payload}

        default:
            return state
    }
}