import * as actions from './actionConstants';
import axios from 'axios'

export const routeLookup = (locationFrom, locationTo) => async(dispatch) => {
    try {
        dispatch({type: actions.ROUTE_REQUEST})

        const { data } = await axios.post('http://127.0.0.1:8000/api/service/routes', { 
            "locationFrom": locationFrom, 
            "locationTo": locationTo 
        })

        dispatch({
            type: actions.ROUTE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actions.ROUTE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const storeLookup = (locationFrom, locationTo, dateDeparture, dateReturn) => async(dispatch) => {
        const data = {
            'locationFrom': locationFrom,
            'locationTo': locationTo,
            'dateDeparture': dateDeparture,
            'dateReturn': dateReturn
        }

        dispatch({
            type: actions.STORING_LOOKUP_DATA,
            payload: data
        })
}

export const retrieveLookup = () => async(dispatch) => {
    dispatch({
        type: actions.RETRIEVING_LOOKUP_DATA
    })
}

/*
export function retrieveDepartureRoute(locationFrom, locationTo, departureDate, returnDate) {
    return {
        type: actions.RETRIEVE_DEPARTURE_ROUTE,
        payload: {
            locationFrom: locationFrom,
            locationTo: locationTo,
            departureDate: departureDate,
            returnDate: returnDate
        }
    }
}

export function retrieveArrivalRoute(locationFrom, locationTo, departureDate, returnDate) {
    return {
        type: actions.RETRIEVE_DEPARTURE_ROUTE,
        payload: {
            locationFrom: locationTo,
            locationTo: locationFrom,
            departureDate: departureDate,
            returnDate: returnDate
        }
    }
}

export function retrieveVendorDetails(vendorID) {
    return {
        type: actions.RETRIEVE_VENDOR_DETAILS,
        payload: {
            vendorID: vendorID
        }
    }
}
*/