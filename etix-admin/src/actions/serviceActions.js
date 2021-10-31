import axios from 'axios'
import {

    SERVICE_LIST_REQUEST, 
    SERVICE_LIST_SUCCESS,
    SERVICE_LIST_FAIL,
    SERVICE_LIST_RESET,

} from '../constants/serviceConstants'

//GET Service Lists
export const listService = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: SERVICE_LIST_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            'http://127.0.0.1:8000/api/service/',
            config
        )

        const vendorInfo = await axios.get(
            `http://127.0.0.1:8000/api/vendor/${data.vendor}`,
            config
        )

        var vendorDetails = await axios.get(
            `http://127.0.0.1:8000/api/user/${vendorInfo.data.user}`,
            config
        )

        vendorDetails = {
            ...vendorInfo.data,
            ...vendorDetails.data
        }

        const seatInfo = await axios.get(
            `http://127.0.0.1:8000/api/seat/${data.seat}`,
            config
        )

        const LocationFrom = await axios.get(
            `http://127.0.0.1:8000/api/location/${data.locationTo}`,
            config,
        )

        const LocationTo = await axios.get(
            `http://127.0.0.1:8000/api/location/${data.locationFrom}`
        )

        data = {
            ...data,
            vendorDetails: vendorDetails,
            seatDetails: seatInfo.data,
            locationFrom: LocationFrom.data,
            locationTo: LocationTo.data,
        }
        
        dispatch({
            type: SERVICE_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: SERVICE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}