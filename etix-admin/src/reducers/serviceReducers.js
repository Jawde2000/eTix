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
    SERVICE_DELETE_RESET,

    SERVICE_SAVE_REQUEST, 
    SERVICE_SAVE_SUCCESS,
    SERVICE_SAVE_FAIL,
    SERVICE_SAVE_RESET,

    LOCATION_DETAIL_REQUEST, 
    LOCATION_DETAIL_SUCCESS,
    LOCATION_DETAIL_FAIL,
    LOCATION_DETAIL_RESET,
    
    VENDOR_DETAIL_REQUEST, 
    VENDOR_DETAIL_SUCCESS,
    VENDOR_DETAIL_FAIL,
    VENDOR_DETAIL_RESET,

    SERVICE_ADD_REQUEST, 
    SERVICE_ADD_SUCCESS,
    SERVICE_ADD_FAIL,
    SERVICE_ADD_RESET,

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

export const locationDetailReducer = (state = {  }, action) => {
    switch(action.type){
        case LOCATION_DETAIL_REQUEST:
            return {loading: true}
        
        case LOCATION_DETAIL_SUCCESS:
           return {loading: false, locationD: action.payload}
        
        case LOCATION_DETAIL_FAIL:
           return {loading: false, error: action.payload}

        case LOCATION_DETAIL_RESET:
           return { }

        default:
            return state
    }
}

export const vendorDetailReducer = (state = {  }, action) => {
    switch(action.type){
        case VENDOR_DETAIL_REQUEST:
            return {loading: true}
        
        case VENDOR_DETAIL_SUCCESS:
           return {loading: false, vendorD: action.payload}
        
        case VENDOR_DETAIL_FAIL:
           return {loading: false, error: action.payload}

        case VENDOR_DETAIL_RESET:
           return { }

        default:
            return state
    }
}

export const serviceAddReducer = (state = {  }, action) => {
    switch(action.type){
        case SERVICE_ADD_REQUEST:
            return {loading: true}
        
        case SERVICE_ADD_SUCCESS:
           return {loading: false, serviceD: action.payload, success: true}
        
        case SERVICE_ADD_FAIL:
           return {loading: false, error: action.payload}

        case SERVICE_ADD_RESET:
           return { }

        default:
            return state
    }
}