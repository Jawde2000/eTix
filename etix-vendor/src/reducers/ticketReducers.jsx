import {
    TICKET_REQUEST,
    TICKET_SUCCESS,
    TICKET_FAIL,
    TICKET_RESET,

    TICKET_REQUEST_USED,
    TICKET_SUCCESS_USED,
    TICKET_FAIL_USED,
    TICKET_RESET_USED,

    TICKET_SCANNED_REQUEST,
    TICKET_SCANNED_SUCCESS,
    TICKET_SCANNED_FAIL,
    TICKET_SCANNED_RESET,


} from '../constants/ticketConstants/ticketConstants';

export const ticketReducer = (state = { }, action) => {
    switch(action.type){
        case TICKET_REQUEST:
            return {loading: true}
        
        case TICKET_SUCCESS:
            return {loading: false, ticket: action.payload}
        
        case TICKET_FAIL:
            return {loading: false, error: action.payload}

        case TICKET_RESET:
            return {}

        default:
            return state
    }
}

export const UsedticketReducer = (state = { }, action) => {
    switch(action.type){
        case TICKET_REQUEST_USED:
            return {loading: true}
        
        case TICKET_SUCCESS_USED:
            return {loading: false, ticketSuccess: true}
        
        case TICKET_FAIL_USED:
            return {loading: false, error: action.payload}

        case TICKET_RESET_USED:
            return {}

        default:
            return state
    }
}

export const scanReducer = (state = { }, action) => {
    switch(action.type){
        case TICKET_SCANNED_REQUEST:
            return {loading: true}
        
        case TICKET_SCANNED_SUCCESS:
            return {loading: false, ticketSuccess: action.payload}
        
        case TICKET_SCANNED_FAIL:
            return {loading: false, error: action.payload}

        case TICKET_SCANNED_RESET:
            return {}

        default:
            return state
    }
}
