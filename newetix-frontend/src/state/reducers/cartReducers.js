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