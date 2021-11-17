import * as constants from '../actions/actionConstants'; 

export const routeLookupReducer = (state = {route: []}, action) => {
    switch (action.type) {
        case constants.ROUTE_REQUEST:
            return {loading: true, route:[]}
        case constants.ROUTE_SUCCESS:
            return {loading: false, route: action.payload, success: true}
        case constants.ROUTE_FAIL:
            console.log("No routes found!")
            return {loading: false, error: action.payload}
        case constants.ROUTE_RESET:
            return {route: []}
        default:
            return state
    }
};

export const dateReducer = (state = {date: []}, action) => {
    switch (action.type) {
        case constants.STORE_DATE:
            return {date: action.payload}
        default:
            return state
    }
}

export const locationListReducer = (state = {locations: []}, action) => {
    switch (action.type) {
        case constants.LOCATION_LIST_REQUEST:
            return {loading: true}
            
        case constants.LOCATION_LIST_SUCCESS:
            return {loading: false, locations: action.payload}

        case constants.LOCATION_LIST_FAIL:
            return {loading: false, error: true}

        case constants.LOCATION_LIST_RESET:
            return {loading: false, locations:[]}

        default:
            return state
            
    }
}

export const seatListReducer = (state = {seat: []}, action) => {
    switch (action.type) {
        case constants.SEAT_LIST_REQUEST:
            return {loading: true, seat:[]}
        case constants.SEAT_LIST_SUCCESS:
            return {loading: false, seat: action.payload}
        case constants.SEAT_LIST_FAIL:
            console.log("Failure to find seating/pricing information")
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const allRoutesReducer = (state = {route: []}, action) => {
    switch (action.type) {
        case constants.ROUTE_ALL_REQUEST:
            return {loading: true}
        case constants.ROUTE_ALL_SUCCESS:
            return {loading: false, route: action.payload}
        case constants.ROUTE_ALL_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
export const routeFilterReducer = (state = {route: []}, action) => {
    switch (action.type) {
        case constants.FILTER_ROUTE_REQUEST:
            return {loading: true, route:[]}
        case constants.FILTER_ROUTE_SUCCESS:
            return {loading: false, route: action.payload}
        case constants.FILTER_ROUTE_FAIL:
            console.log("Failure to filter route")
            return {loading: false, error: action.payload}
        case constants.FILTER_ROUTE_RESET:
            return {route: []}
        default:
            return state
    }
}

export const locationSearchReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.SEARCH_LOCATION_REQUEST:
            return {loading: true}
        case constants.SEARCH_LOCATION_SUCCESS:
            return {loading: false, data: action.payload}
        case constants.SEARCH_LOCATION_FAIL:
            return {loading:false, error: action.payload}
        case constants.SEARCH_LOCATION_RESET:
            return {}
        default:
            return state
    }
}
