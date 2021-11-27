import * as actions from '../actions/actionConstants';

export const serviceListReducer = (state = { services: [] }, action) => {
    switch(action.type){
        case actions.LIST_SERVICE_REQUEST:
            return {loading: true}
        
        case actions.LIST_SERVICE_SUCCESS:
           return {loading: false, services: action.payload, success: true}
        
        case actions.LIST_SERVICE_FAIL:
           return {loading: false, error: action.payload}

        case actions.LIST_SERVICE_RESET:
           return { services: []}

        default:
            return state
    }
}