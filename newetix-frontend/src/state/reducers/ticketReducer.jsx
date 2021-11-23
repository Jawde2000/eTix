import * as constants from '../actions/actionConstants'; 

export const ticketReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.TICKET_LIST_REQUEST:
            return {loading: true}
        case constants.TICKET_LIST_SUCCESS:
            return {loading: false, ticketData: action.payload}
        case constants.TICKET_LIST_FAILURE:
            return {loading: false, error: action.payload}
        case constants.TICKET_LIST_RESET:
            return {}
        default:
            return state
    }
};