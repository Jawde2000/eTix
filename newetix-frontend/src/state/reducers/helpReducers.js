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