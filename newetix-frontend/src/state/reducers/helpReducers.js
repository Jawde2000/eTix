import * as actions from '../actions/actionConstants';

export const vendorListReducer = (state = { }, action) => {
    switch(action.type){
        case actions.VENDOR_LIST_REQUEST:
            return {loading: true}
        
        case actions.VENDOR_LIST_SUCCESS:
           return {loading: false, vendorInfo: action.payload}
        
        case actions.VENDOR_LIST_FAIL:
           return {loading: false, error: action.payload}

        default:
            return state
    }
}

export const helpdeskReducer = (state = {}, action) => {
    switch(action.type){
        case actions.HELP_LIST_REQUEST:
            return {loading: true}

        case actions.HELP_LIST_SUCCESS:
            return {loading: false, helpList: action.payload}

        case action.HELP_LIST_CREATE:
            return {loading: false, helpDetail: action.payload}
        
        case action.HELP_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}