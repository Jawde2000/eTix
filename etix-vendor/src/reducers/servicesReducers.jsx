import {
    USER_SERVICE_REQUEST,
    USER_SERVICE_SUCCESS,
    USER_SERVICE_FAIL
} from '../../constants/serviceConstants/serviceConstants';

export const registerReducer = (state = { }, action) => {
    switch(action.type){
        case USER_SERVICE_REQUEST:
            return {loading: true}
        
        case USER_SERVICE_SUCCESS:
           return {loading: false, services: action.payload} 
        
        case USER_SERVICE_FAIL:
           return {loading: false, error: action.payload}

        default:
            return state
    }
}