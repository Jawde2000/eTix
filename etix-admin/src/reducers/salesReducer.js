import {

    PAYMENT_LIST_REQUEST, 
    PAYMENT_LIST_SUCCESS,
    PAYMENT_LIST_FAIL,
    PAYMENT_LIST_RESET,

    SERVICE_LIST_DATAGENERATION_REQUEST, 
    SERVICE_LIST_DATAGENERATION_SUCCESS,
    SERVICE_LIST_DATAGENERATION_FAIL,
    SERVICE_LIST_DATAGENERATION_RESET,

} from '../constants/salesConstants'

export const paymentListReducer = (state = { payments: [] }, action) => {
    switch(action.type){
        case PAYMENT_LIST_REQUEST:
            return {loading: true}
        
        case PAYMENT_LIST_SUCCESS:
           return {loading: false, payments: action.payload}
        
        case PAYMENT_LIST_FAIL:
           return {loading: false, error: action.payload}

        case PAYMENT_LIST_RESET:
           return {payments:[]}

        default:
            return state
    }
}

export const serviceListDataReducer = (state = { servicesD: [] }, action) => {
    switch(action.type){
        case SERVICE_LIST_DATAGENERATION_REQUEST:
            return {loading: true}
        
        case SERVICE_LIST_DATAGENERATION_SUCCESS:
           return {loading: false, servicesD: action.payload}
        
        case SERVICE_LIST_DATAGENERATION_FAIL:
           return {loading: false, error: action.payload}

        case SERVICE_LIST_DATAGENERATION_RESET:
           return {servicesD:[]}

        default:
            return state
    }
}

