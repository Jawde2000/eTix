import {

    PAYMENT_LIST_REQUEST, 
    PAYMENT_LIST_SUCCESS,
    PAYMENT_LIST_FAIL,
    PAYMENT_LIST_RESET,

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

