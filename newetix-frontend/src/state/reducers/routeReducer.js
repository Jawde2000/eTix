import * as constants from '../actions/actionConstants'; 
import axios from 'axios';

export default function routeReducer(state = [], action) {
    switch (action.type) {
        case constants.RETRIEVE_DEPARTURE_ROUTE:
            return [
                ...state,
                {
                    routeRequest: {
                        locationFrom: action.payload.locationFrom,
                        locationTo: action.payload.locationTo,
                        departureDate: action.payload.departureDate,
                        returnDate: action.payload.returnDate
                    },
                    routeDetails: {
                        data: axios.post('http://127.0.0.1:8000/api/service/routes', { 
                            "locationFrom": action.payload.locationFrom, 
                            "locationTo": action.payload.locationTo 
                        })
                    }
                }
            ]
        case constants.RETRIEVE_RETURN_ROUTE:
            return [
                ...state,
                {
                    routeRequest: {
                        locationFrom: action.payload.locationTo,
                        locationTo: action.payload.locationFrom,
                        departureDate: action.payload.departureDate,
                        returnDate: action.payload.returnDate
                    },
                    routeDetails: {
                        data: axios.post('http://127.0.0.1:8000/api/service/routes', { 
                            "locationFrom": action.payload.locationFrom, 
                            "locationTo": action.payload.locationTo 
                        })
                    }
                }
            ]
        default:
            return state
    }
};