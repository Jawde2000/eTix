import {
    TICKET_REQUEST,
    TICKET_SUCCESS,
    TICKET_FAIL,
    TICKET_RESET,

    TICKET_REQUEST_USED,
    TICKET_SUCCESS_USED,
    TICKET_FAIL_USED,
    TICKET_RESET_USED,

    TICKET_SCANNED_REQUEST,
    TICKET_SCANNED_SUCCESS,
    TICKET_SCANNED_FAIL,
    TICKET_SCANNED_RESET,

    TICKET_REQUEST_DELETE,
    TICKET_SUCCESS_DELETE,
    TICKET_FAIL_DELETE,
    TICKET_RESET_DELETE,
} from '../../constants/ticketConstants/ticketConstants';
import axios from 'axios';

export const ticketlist = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: TICKET_REQUEST
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
            'http://127.0.0.1:8000/api/ticket/', 
            config
        )

        // var route = [];

        // console.log(locationED);

        
        data = data.filter((item) => {
            return item.vendor === userInfo.vendorInfo.vendorID;
        })

        var data2 = await axios.get(
            `http://127.0.0.1:8000/api/user/service/${userInfo.vendorInfo.vendorID}/`,
            config
        )

        data2 = data2.data;
        console.log(data2);

        var seatInfo = [];
        var locationFD = [];
        var locationED = [];
        var service = [];
        var cart = [];
        var cartItem = [];
        var userDetails = [];

        // console.log(data);

        for(let item of data){
            let carts = await axios.get(`http://127.0.0.1:8000/api/cart/${item.cart}/`, config);
            cart.push(carts.data);
        } 
        
        // console.log(cart);

        for(let item of cart){
            let cartI = await axios.get(`http://127.0.0.1:8000/api/user/cartitems/${item.cartID}/`, config);
            cartItem.push(cartI.data);

            let UserInfo = await axios.get(`http://127.0.0.1:8000/api/user/${item.user}/`, config);
            userDetails.push(UserInfo.data)
        }

        for(let item of cartItem){
            let services = await axios.get(`http://127.0.0.1:8000/api/service/${item.service}/`, config);
            service.push(services.data);
        }

        console.log(service);

        for(let item of service){
            let seat = await axios.get(`http://127.0.0.1:8000/api/seat/${item.seat}/`, config);
            seatInfo.push(seat.data);

            let locationF = await axios.get(`http://127.0.0.1:8000/api/location/${item.locationFrom}/`, config);
            locationFD.push(locationF.data);

            let locationE = await axios.get(`http://127.0.0.1:8000/api/location/${item.locationTo}/`, config);
            locationED.push(locationE.data);
        }

        // console.log(seatInfo);
        // console.log(locationED);
        // console.log(locationFD);
        // console.log(cartItem);
        // console.log(service);
        // console.log(userDetails)

        data = data.map((item, index) => ({
            ...item,
            seatDetail: seatInfo[index],
            route: locationFD[index].locationName + ' - ' + locationED[index].locationName,
            cartItem: cartItem[index],
            serviceInfo: service[index],
            customerDetails: userDetails[index],
        }))

        // console.log(data);

        dispatch({
            type: TICKET_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: TICKET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const ticketUsed = (info) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type:TICKET_REQUEST_USED
        })

        const {
            userLogin: {userInfo},
        } = getState()

        console.log(info);


        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var ticketid = info.substring(
            info.indexOf("=") + 1, 
            info.lastIndexOf("&")
        );

        var token = info.substring(
            info.indexOf("n=") + 2, 
            info.lastIndexOf("")
        );

        // console.log(ticketid);
        // console.log(token);

        const ticket = await axios.get(
            "http://127.0.0.1:8000/api/ticket/",
            config
        )

        // console.log(ticket);

        var isTicketExist;

        isTicketExist = ticket.data.filter((tk) => {
            if (tk.used === false && tk.ticketID === ticketid) {
                return true;
            }
        })

        console.log(isTicketExist[0].used);
        console.log(isTicketExist[0].ticketID);

        if (!isTicketExist[0].used) {
            const ticketIsUsed = await axios.put(
                `http://127.0.0.1:8000/api/ticket/${ticketid}/`,
                {
                    used: true,
                },
                config            
            )
        } 
        else {
            dispatch({type: TICKET_FAIL_USED});
        }
        
        dispatch({
            type: TICKET_SUCCESS_USED,
        })

    }catch(error){
        dispatch({
            type: TICKET_FAIL_USED,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const scanning = (info) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type:TICKET_SCANNED_REQUEST
        })

        console.log(info);

        dispatch({
            type: TICKET_SCANNED_SUCCESS,
            data: info
        })

    }catch(error){
        dispatch({
            type: TICKET_SCANNED_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//delete ticket
export const deleteTicket = (id) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type:TICKET_REQUEST_DELETE
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
            `http://127.0.0.1:8000/api/ticket/${id}/`,
            config
        )
        
        dispatch({
            type: TICKET_SUCCESS_DELETE,
            payload: data
        })

    }catch(error){
        dispatch({
            type: TICKET_FAIL_DELETE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

