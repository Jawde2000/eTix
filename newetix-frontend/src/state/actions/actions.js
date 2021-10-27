import * as actions from './actionConstants';

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