import * as actions from '../actions/actionConstants';

export const verifyUserWithEmail = (state = { }, action) => {
    switch(action.type){
        case actions.VERIFY_USER_REQUEST:
            return {loading: true}
        
        case actions.VERIFY_USER_SUCCESS:
           return {loading: false, UserExist: true}
        
        case actions.VERIFY_USER_FAIL:
           return {loading: false, error: action.payload, UserExist: false}

        case actions.VERIFY_USER_RESET:
           return {}

        default:
            return state
    }
}

export const passwordResetReducer = (state = { }, action) => {
    switch(action.type){
        case actions.RESET_USER_REQUEST:
            return {loading: true}
        
        case actions.RESET_USER_SUCCESS:
           return {loading: false, success: true}
        
        case actions.RESET_USER_FAIL:
           return {loading: false, error: action.payload}

        case actions.RESET_USER_RESET:
           return {}

        default:
            return state
    }
}