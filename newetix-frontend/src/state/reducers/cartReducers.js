import * as constants from '../actions/actionConstants'; 

export const cartAddReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.CART_ADD_REQUEST:
            return {loading: true}
        case constants.CART_ADD_SUCCESS:
            return {loading: false, success: true}
        case constants.CART_ADD_FAIL:
            return {loading: false, error: action.payload}
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

export const priceReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.ACCESS_PRICING_INFO:
            return {priceInfo: action.payload}
        case constants.FAILURE_PRICING_INFO:
            return {error: action.payload}
        default:
            return state
    }
}