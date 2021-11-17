import {
    TICKET_REQUEST,
    TICKET_SUCCESS,
    TICKET_FAIL,
    TICKET_RESET,

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
