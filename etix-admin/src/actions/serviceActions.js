import axios from 'axios'
import {

    SERVICE_LIST_REQUEST, 
    SERVICE_LIST_SUCCESS,
    SERVICE_LIST_FAIL,
    SERVICE_LIST_RESET,

    SERVICE_DETAIL_REQUEST, 
    SERVICE_DETAIL_SUCCESS,
    SERVICE_DETAIL_FAIL,
    SERVICE_DETAIL_RESET,

    SERVICE_DELETE_REQUEST, 
    SERVICE_DELETE_SUCCESS,
    SERVICE_DELETE_FAIL,
    SERVICE_DELETE_RESET,

    SERVICE_SAVE_REQUEST, 
    SERVICE_SAVE_SUCCESS,
    SERVICE_SAVE_FAIL,

    LOCATION_DETAIL_REQUEST, 
    LOCATION_DETAIL_SUCCESS,
    LOCATION_DETAIL_FAIL,

    VENDOR_DETAIL_REQUEST, 
    VENDOR_DETAIL_SUCCESS,
    VENDOR_DETAIL_FAIL,

    SERVICE_ADD_REQUEST, 
    SERVICE_ADD_SUCCESS,
    SERVICE_ADD_FAIL,
    

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

        console.log(data)
        var vendorInfo = []
        var seatInfo = []
        var locationFD = []
        var locationED = []

        for(let item of data){
            let vendor = await axios.get(`http://127.0.0.1:8000/api/vendor/${item.vendor}/`, config);
            vendorInfo.push(vendor.data);

            let seat = await axios.get(`http://127.0.0.1:8000/api/seat/${item.seat}/`, config);
            seatInfo.push(seat.data);

            let locationF = await axios.get(`http://127.0.0.1:8000/api/location/${item.locationFrom}/`, config);
            locationFD.push(locationF.data);

            let locationE = await axios.get(`http://127.0.0.1:8000/api/location/${item.locationTo}/`, config);
            locationED.push(locationE.data);
        }

        var vendorDetail = []

        for(let i of vendorInfo){
            let vendorD = await axios.get(`http://127.0.0.1:8000/api/user/${i.created_by}/`, config)
            vendorDetail.push(vendorD.data)
        }

        vendorInfo = vendorInfo.map((item, index) => ({
            ...item,
            vendorD: vendorDetail[index]
        }))

        data = data.map((item, index) => ({
            ...item,
            vendorDetail: vendorInfo[index].vendorName,
            seatDetail: seatInfo[index],
            firstQty: seatInfo[index].firstQuantity,
            businessQty: seatInfo[index].businessQuantity,
            economyQty: seatInfo[index].economyQuantity,
            route: locationFD[index].locationName + ' - ' + locationED[index].locationName,
        }))
        
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

//GET Service DETAIL
export const getServiceDetail = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SERVICE_DETAIL_REQUEST
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
            `http://127.0.0.1:8000/api/service/${id}/`,
            config
        )

        const vendorInfo = await axios.get(`http://127.0.0.1:8000/api/vendor/${data.vendor}/`, config);

        const seatInfo = await axios.get(`http://127.0.0.1:8000/api/seat/${data.seat}/`, config);

        const locationFD = await axios.get(`http://127.0.0.1:8000/api/location/${data.locationFrom}/`, config);

        const locationED = await axios.get(`http://127.0.0.1:8000/api/location/${data.locationTo}/`, config);

        const userD = await axios.get(`http://127.0.0.1:8000/api/user/${vendorInfo.data.created_by}/`, config);

        data = ({
            ...data,
            vendorName: vendorInfo.data.vendorName,
            userD: userD.data,
            seatDetail: seatInfo.data,
            firstQty: seatInfo.data.firstQuantity,
            businessQty: seatInfo.data.businessQuantity,
            economyQty: seatInfo.data.economyQuantity,
            firstPrice: seatInfo.data.firstPrice,
            businessPrice: seatInfo.data.businessPrice,
            economyPrice: seatInfo.data.economyPrice,
            route: locationFD.data.locationName + ' - ' + locationED.data.locationName,
            capacity: seatInfo.data.firstQuantity + seatInfo.data.businessQuantity + seatInfo.data.economyQuantity,
        })
        
        dispatch({
            type: SERVICE_DETAIL_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: SERVICE_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//save help
export const saveService = (id, seatID, locationfID, locationEID,service, seat, locationF, locationE) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type:SERVICE_SAVE_REQUEST
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
        console.log(service)
        const { data } = await axios.put(
            `http://127.0.0.1:8000/api/service/${id}/`,
            service,
            config
        )
        
        if(seat){
            const updateSeat = await axios.put(
                `http://127.0.0.1:8000/api/seat/${seatID}/`,
                seat,
                config
            )
        }

        if(locationF){
            const updateLocationF = await axios.put(
                `http://127.0.0.1:8000/api/location/${locationfID}/`,
                {
                    locationName: locationF,
                },
                config
            )
        }

        if(locationE){
            if(locationE){
                const updateLocationE = await axios.put(
                    `http://127.0.0.1:8000/api/location/${locationEID}/`,
                    {
                        locationName: locationE
                    },
                    config
                )
            }
        }
        
        
        dispatch({
            type: SERVICE_SAVE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: SERVICE_SAVE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//delete service
export const deleteService = (id) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type:SERVICE_DELETE_REQUEST
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

        const { data } = await axios.delete(
            `http://127.0.0.1:8000/api/service/${id}/`,
            config
        )
        
        dispatch({
            type: SERVICE_DELETE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: SERVICE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//GET Location List
export const getLocationDetail = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: LOCATION_DETAIL_REQUEST
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

        const { data } = await axios.get(
            `http://127.0.0.1:8000/api/location/`,
            config
        )
        
        dispatch({
            type: LOCATION_DETAIL_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: LOCATION_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//get vendor list for selection
export const getVendorDetail = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: VENDOR_DETAIL_REQUEST
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
            `http://127.0.0.1:8000/api/users/`,
            config
        )

        data = data.filter((item) => {
            return item.is_vendor === true && item.is_active === true
        })


        var vendorIDs = []

        for(let i of data){
            let rst = await axios.get(`http://127.0.0.1:8000/api/user/vendor/${i.userID}/`, config)
            vendorIDs.push(rst.data.vendorID)
        }

        data = data.map((item, index) => ({
            ...item,
            vendorID: vendorIDs[index]
        }))

        console.log(data)
        
        dispatch({
            type: VENDOR_DETAIL_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: VENDOR_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//new service
export const addNewService = (seat, service) => async (dispatch, getState) => {
    try{
        dispatch({
            type: SERVICE_ADD_REQUEST
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

        console.log(seat)

        var { data } = await axios.post(
            `http://127.0.0.1:8000/api/seat/`,
            seat,
            config
        )

        console.log(data)
        console.log(service)

        data = await axios.post(
            `http://127.0.0.1:8000/api/service/`,
            {
                ...service,
                seat: data.seatID
            },
            config
        )
        

        dispatch({
            type: SERVICE_ADD_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: SERVICE_ADD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}