import {
    USER_SERVICE_REQUEST,
    USER_SERVICE_SUCCESS,
    USER_SERVICE_FAIL,
    USER_SERVICE_RESET,

    SERVICE_DELETE_REQUEST,
    SERVICE_DELETE_SUCCESS,
    SERVICE_DELETE_FAIL,
    SERVICE_DELETE_RESET,

    SERVICE_SAVE_REQUEST,
    SERVICE_SAVE_SUCCESS,
    SERVICE_SAVE_FAIL,
    SERVICE_SAVE_RESET,
    

} from '../constants/serviceConstants/serviceConstants';

export const serviceReducer = (state = { }, action) => {
    switch(action.type){
        case USER_SERVICE_REQUEST:
            return {loading: true}
        
        case USER_SERVICE_SUCCESS:
           return {loading: false, services: action.payload} 
        
        case USER_SERVICE_FAIL:
           return {loading: false, error: action.payload}

        case USER_SERVICE_RESET:
            return {}

        default:
            return state
    }
}

export const serviceDeleteReducer = (state = { }, action) => {
    switch(action.type){
        case SERVICE_DELETE_REQUEST:
            return {loading: true}
        
        case SERVICE_DELETE_SUCCESS:
           return {loading: false, success: true}
        
        case SERVICE_DELETE_FAIL:
           return {loading: false, error: action.payload}

        case SERVICE_DELETE_RESET:
            return {}

        default:
            return state
    }
}

export const serviceSaveReducer = (state = { }, action) => {
    switch(action.type){
        case SERVICE_SAVE_REQUEST:
            return {loading: true}
        
        case SERVICE_SAVE_SUCCESS:
           return {loading: false, success: true}
        
        case SERVICE_SAVE_FAIL:
           return {loading: false, error: action.payload}

        case SERVICE_SAVE_RESET:
           return {}

        default:
            return state
    }
}

