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