import * as constants from '../actions/actionConstants'; 

var lookupData = {}

export const routeLookupReducer = (state = {route: []}, action) => {
    switch (action.type) {
        case constants.ROUTE_REQUEST:
            return {loading: true, route:[]}
        case constants.ROUTE_SUCCESS:
            return {loading: false, route: action.payload}
        case constants.ROUTE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
};

export const routeDataManagementReducer = (state = {route: []}, action) => {
    switch (action.type) {
        case constants.STORING_LOOKUP_DATA:
            lookupData = action.payload
            return lookupData
        case constants.RETRIEVING_LOOKUP_DATA:
            return lookupData
        default:
            return state
    }
}