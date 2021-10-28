import {
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from '../constants/registerConstants/registerConstants'

export const registerReducer = (state = { }, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true}
        
        case USER_REGISTER_SUCCESS:
           return {loading: false, success: true} 
        
        case USER_REGISTER_FAIL:
           return {loading: false, success: false}

        default:
            return state
    }
}