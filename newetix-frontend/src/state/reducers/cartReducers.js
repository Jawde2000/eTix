import * as constants from '../actions/actionConstants'; 

export const cartAddReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.CART_ADD_REQUEST:
            return {loading: true}
        case constants.CART_ADD_SUCCESS:
            return {loading: false, success: true}
        case constants.CART_ADD_FAIL:
            return {loading: false, error: action.payload}
        case constants.CART_CHECK_SUCCESS:
            return {loading: false}
        case constants.CART_ADD_RESET:
            return {}
        default:
            return state
    }
};

export const cartViewReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.CART_VIEW_REQUEST:
            return {loading: true}
        case constants.CART_VIEW_SUCCESS:
            return {loading: false, cartData: action.payload}
        case constants.CART_VIEW_FAIL:
            return {loading: false, error: action.payload}
        case constants.CART_VIEW_RESET:
            return {}
        default:
            return state
    }
};

export const paymentReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.PROCESSING_PAYMENT_APPROVAL:
            return {loading: true}
        case constants.PROCESSED_PAYMENT_APPROVAL:
            return {loading: false, approvalDetails: action.payload}
        case constants.FAILURE_PAYMENT_APPROVAL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const deleteReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.DELETING_CART_ITEM:
            return {loading: true}
        case constants.DELETED_CART_ITEM:
            return {loading: false, success: true}
        case constants.UNSUCCESSFUL_DELETE_CART_ITEM:
            return {loading: false, error: action.payload}
        case constants.DELETE_CART_RESET:
            return {}
        default:
            return state
    }
}

export const cartDispatchReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.CART_DISPATCH_REQUEST:
            return {loading: true}
        case constants.CART_DISPATCH_UNCHANGED:
            return {loading: false}
        case constants.CART_DISPATCH_SUCCESS:
            return {loading: false}
        case constants.CART_DISPATCH_FAILURE:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}