import {

    SERVICE_LIST_REQUEST, 
    SERVICE_LIST_SUCCESS,
    SERVICE_LIST_FAIL,
    SERVICE_LIST_RESET,

    SERVICE_DETAIL_REQUEST, 
    SERVICE_DETAIL_SUCCESS,
    SERVICE_DETAIL_FAIL,
    SERVICE_DETAIL_RESET,

    SERVICE_DELETE_REQUEST, 
    SERVICE_DELETE_SUCCESS,
    SERVICE_DELETE_FAIL,

} from '../constants/serviceConstants'

export const serviceListReducer = (state = { services: [] }, action) => {
    switch(action.type){
        case SERVICE_LIST_REQUEST:
            return {loading: true}
        
        case SERVICE_LIST_SUCCESS:
           return {loading: false, services: action.payload}
        
        case SERVICE_LIST_FAIL:
           return {loading: false, error: action.payload}

        case SERVICE_LIST_RESET:
           return {services:[]}

        default:
            return state
    }
}

export const serviceDetailReducer = (state = {  }, action) => {
    switch(action.type){
        case SERVICE_DETAIL_REQUEST:
            return {loading: true}
        
        case SERVICE_DETAIL_SUCCESS:
           return {loading: false, serviceD: action.payload}
        
        case SERVICE_DETAIL_FAIL:
           return {loading: false, error: action.payload}

        case SERVICE_DETAIL_RESET:
           return { }

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

        default:
            return state
    }
}
