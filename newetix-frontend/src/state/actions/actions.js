import * as actions from './actionConstants';
import axios from 'axios'

export const findRoute = (locationFrom, locationTo, departureDate) => async(dispatch) => {
    try {
        dispatch({type: actions.ROUTE_REQUEST})

        

        console.log(locationFrom)
        var { data } = await axios.post('http://127.0.0.1:8000/api/service/routes', { 
            "locationFrom": locationFrom, 
            "locationTo": locationTo 
        })

        console.log(data)

        data = data.filter((item) => {
            return item.serviceStatus === "O"
        })

        console.log(data)

        data = data.filter((item) => {
            return item.serviceStartDate === departureDate
        })

        let serviceNamess = [];

        for(let i of data){
            serviceNamess.push(i.servicedepartureTerminal + " - " + i.servicearrivalTerminal);
        }

        var unique = serviceNamess.filter((v, i, a) => a.indexOf(v) === i)

        console.log(unique);

        data = data.map((item) => ({
            ...item,
            searchedFrom: locationFrom,
            searchedTo: locationTo,
        }))

        let seatD = []

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        for(let i of data){
            let rst = await axios.get(`http://127.0.0.1:8000/api/seat/detail/${i.seat}/`, config)
            seatD.push(rst.data);
        }

        let vendorD = []

        for(let i of data){
            let rst = await axios.get(`http://127.0.0.1:8000/api/vendorD/${i.vendor}/`, config)
            vendorD.push(rst.data)
        }

        let userD = []

        for(let x of vendorD){
            let rst = await axios.get(`http://127.0.0.1:8000/api/user/${x.created_by}/`)
            userD.push(rst.data)
        }

        vendorD.map((item, i) => ({
            ...item,
            userD: userD[i]
        }))



        data = data.map((item, index) => ({
            ...item,
            seatD: seatD[index],
            vendorD: vendorD[index],
        }))

        data = data.filter((item) => {
            return Number(item.seatD.firstQuantity) !=0 || Number(item.seatD.businessQuantity) !=0 || Number(item.seatD.economyQuantity) != 0
        })

        let minprice = [];

        for(let i of data) {
            let min = Number(i.seatD.economyPrice);

            if(min > Number(i.seatD.businessPrice)){
                min = Number(i.seatD.businessPrice);
            }

            if(min > Number(i.seatD.firstPrice)){
                min = Number(i.seatD.firstPrice);
            }

            minprice.push(min);
        }

        data = data.map((item,index) => ({
            ...item,
            minPrice : minprice[index],
            serviceNameUniq: unique,
        }))

        dispatch({type: actions.SEARCH_LOCATION_REQUEST})

        const location = {
            locationTo: locationTo,
            locationFrom: locationFrom,
            departureDate: departureDate,
        }

        dispatch({
            type: actions.ROUTE_SUCCESS,
            payload: data
        })

        dispatch({
            type: actions.SEARCH_LOCATION_SUCCESS,
            payload: location,
        })

    } catch(error) {
        dispatch({
            type: actions.ROUTE_FAIL
        })
    }
}

export const vendorList = () => async(dispatch) => {
    try {
        dispatch({type: actions.VENDOR_LIST_REQUEST})

        const { data } = await axios.post('http://127.0.0.1:8000/api/vendor/list')

        console.log(data);

        dispatch({
            type: actions.VENDOR_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actions.VENDOR_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const seatList = async(dispatch) => {
    try {
        dispatch({type: actions.SEAT_LIST_REQUEST})
        
        const { data } = await axios.post('http://127.0.0.1:8000/api/vendor/list')

        dispatch({
            type: actions.SEAT_LIST_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: actions.SEAT_LIST_FAIL
        })
    }
}

export const dateData = (departureDate, returnDate) => (dispatch) => {
    const data = {
        'departureDate': departureDate,
        'returnDate': returnDate
    }

    dispatch({
        type: actions.STORE_DATE,
        payload: data
    })
}

export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({
            type: actions.USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/users/login/',
            {
                "email": email,
                "password": password
            },
            config
        )

        console.log(data)
        
        if(!data.is_customer){
            dispatch({
                type: actions.USER_LOGIN_FAIL,
                payload: "Invalid User"
            })
        } else {
            dispatch({
                type: actions.USER_LOGIN_SUCCESS,
                payload: data
            })
            
            //set user info in local storage
            localStorage.setItem('userInfo', JSON.stringify(data))
        }
    } catch(error) {
        dispatch({
            type: actions.USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: actions.USER_LOGOUT})
    dispatch({type: actions.USER_LIST_RESET})
    dispatch({type: actions.USER_DETAIL_RESET})
    dispatch({type: actions.HELP_LIST_RESET})
    dispatch({type: actions.HELP_RESPONSE_RESET})
    dispatch({type: actions.CART_VIEW_RESET})
    dispatch({type: actions.CART_ADD_RESET})
    dispatch({type: actions.CUSTOMER_DETAILS_RESET})
    dispatch({type: actions.USER_REGISTER_RESET})
}

export const register = (email, password, username, phonenumber) => async(dispatch) => {
    try {
        dispatch({
            type: actions.USER_REGISTER_PROCESS
        })

        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/users/register/',
            {
                "email": email,
                "password": password,
                "username": username,
                "phonenumber": phonenumber,
                "is_customer": 'True',
                "is_vendor": 'False',
                "is_staff": 'False',
                "is_superuser": 'False',
                "is_active": 'True',
            },
            config
        )

        console.log(data)

        dispatch({
            type: actions.USER_REGISTER,
            payload: data
        })

        if(!data.is_customer){
            dispatch({
                type: actions.USER_REGISTER_FAIL,
                payload: "Invalid User"
            })
        }
        else{
            dispatch({
                type: actions.USER_REGISTER_SUCCESS,
                payload: data
            })
            
            //set user info in local storage
            localStorage.setItem('userInfo', JSON.stringify(data))
        }

    } catch(error) {
        dispatch({
            type: actions.USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const customerDetails = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: actions.CUSTOMER_DETAILS_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        console.log(userInfo);

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `http://127.0.0.1:8000/api/user/customer/${userInfo.userID}/`,
            config
        )

        dispatch({
            type: actions.CUSTOMER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actions.CUSTOMER_DETAILS_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const customerEdit = (firstname, lastname, phonenumber, address, birthday, gender) => async(dispatch, getState) => {
    try {
        dispatch({
            type: actions.CUSTOMER_EDIT_REQUEST
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

        const {data} = await axios.put(
            `http://localhost:8000/api/user/customer/update/${userInfo.userID}/`,
            {
                'customerFirstName': firstname,
                'customerLastName': lastname,
                'customerContact_Number': phonenumber,
                'customerAddress': address,
                'customerBirthday': birthday,
                'customerGender': gender
            },
            config
        )

        console.log(data)
        
        dispatch({
            type: actions.CUSTOMER_EDIT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: actions.CUSTOMER_EDIT_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const helpdeskCreate = (rcv, title, message) => async(dispatch, getState) => {
    try {
        dispatch({
            type: actions.HELP_LIST_REQUEST
        })

        const {
            userLogin: {userInfo},
            vendorList: {vendorInfo}
        } = getState()

        for (let vendor in vendorInfo){
            if (vendorInfo[vendor].vendorName == rcv){
                rcv = vendorInfo[vendor].vendorID
            }
        }

        if (rcv == 'eTix'){
            rcv = 'admin'
        }

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `http://localhost:8000/api/help/request/create/${rcv}/`,
            {
                'title': title,
                'message': message,
                'userID': userInfo.userID
            },
            config
        )

        dispatch({
            type: actions.HELP_LIST_CREATE,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actions.HELP_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
//get locations for searching route
export const getLocations = () => async(dispatch) => {
    try {
        dispatch({
            type: actions.LOCATION_LIST_REQUEST
        })


        const config = {
            headers: {
                'Content-type' : 'application/json',
            }
        }

        const {data} = await axios.get(
            `http://127.0.0.1:8000/api/location/`,
            config
        )
        
        dispatch({
            type: actions.LOCATION_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actions.LOCATION_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const helpdeskList = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: actions.HELP_LIST_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `http://localhost:8000/api/help/request/list/${userInfo.userID}/`,
            config
        )
        
        dispatch({
            type: actions.HELP_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actions.HELP_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const helpResponseList = (helpID) => async(dispatch, getState) => {
    try {
        dispatch({
            type: actions.HELP_RESPONSE_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `http://localhost:8000/api/help/response/${helpID}/`,
            config
        )

        dispatch({
            type: actions.HELP_RESPONSE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actions.HELP_RESPONSE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const addToCart = (service, seatType, seatPrice, chk) => async(dispatch, getState) => {
    try {
        dispatch({
            type: actions.CART_ADD_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `http://localhost:8000/api/cart/`,
            config
        )

        let cart = ""

        for(let i of data){
            if(i.user === userInfo.userID){
                cart = i.cartID
            }
        }

        let payment = await axios.get(
            `http://localhost:8000/api/payment/`,
            config
        )

        for (let i of payment.data) {
            if(i.cart == cart){
                cart = null
            }
        }

        //if cart exist, just create item. If it does not exist create a new cart and create item  && (cart != payment)
        if(cart){
            let rst = await axios.post(
                `http://127.0.0.1:8000/api/cartitems/`,
                {
                    seat_Type: seatType,
                    seat_price: seatPrice,
                    cart: cart,
                    service: service.serviceID
                },
                config
            )
        }
        else{
            let rst = await axios.post(
                `http://127.0.0.1:8000/api/cart/`,
                {
                    user: userInfo.userID
                },
                config
            )
            
            if(rst){
                let rst1 = await axios.post(
                    `http://127.0.0.1:8000/api/cartitems/`,
                    {
                        seat_Type: seatType,
                        seat_price: seatPrice,
                        cart: rst.data.cartID,
                        service: service.serviceID
                    }, 
                    config
                )
            }   
            
        }
        
        dispatch({
            type: actions.CART_ADD_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: actions.CART_ADD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const viewCartData = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: actions.CART_VIEW_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `http://localhost:8000/api/cart/`,
            config
        )

        let cart = ""

        for(let i of data){
            if(i.user === userInfo.userID){
                cart = i.cartID
            }
        }

        //if cart exist, just create item. If it does not exist create a new cart and create item 
        if( cart ){
            let {data} = await axios.get(
                `http://localhost:8000/api/cart/retrieve/${cart}/`,
                config
            )

            dispatch({
                type: actions.CART_VIEW_SUCCESS,
                payload: data
            })
        }

    } catch (error) {
        dispatch({
            type: actions.CART_VIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateUser = (user, password) => async (dispatch, getState) => {
    try{
        dispatch({
            type: actions.USER_UPDATE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        console.log(userInfo.token)

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        var { data } = await axios.put(
            `http://127.0.0.1:8000/api/user/update/${userInfo.userID}/`,
            {
                username: user,
                email: userInfo.email,
                is_active: userInfo.is_active,
                password: password
            },
            config
        )

        // data = {...data, ...userInfo.token};
        // data = {...data, ...userInfo.access};
        // data = {...data, ...userInfo.refresh};
        var token = { token: userInfo.token};
        var access = { access: userInfo.access};
        var refresh = { refresh: userInfo.refresh};

        let merged = {...data, ...token};
        merged = {...merged, ...access};
        merged = {...merged, ...refresh};

        dispatch({
            type: actions.USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: actions.USER_LOGIN_SUCCESS,
            payload: merged,
        })

        localStorage.setItem('userInfo', JSON.stringify(merged))

    }catch(error){
        dispatch({
            type: actions.USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getAllRoutes = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: actions.ROUTE_ALL_REQUEST
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

        let { data } = await axios.get(
            `http://localhost:8000/api/service/`,
            config
        )

        let seatD = []

        for(let i of data){
            let rst = await axios.get(`http://127.0.0.1:8000/api/seat/detail/${i.seat}/`, config)
            seatD.push(rst.data);
        }

        console.log(seatD);

        let vendorD = []

        for(let i of data){
            let rst = await axios.get(`http://127.0.0.1:8000/api/vendorD/${i.vendor}/`, config)
            vendorD.push(rst.data)
        }

        let userD = []

        for(let x of vendorD){
            let rst = await axios.get(`http://127.0.0.1:8000/api/user/${x.created_by}/`)
            userD.push(rst.data)
        }

        vendorD.map((item, i) => ({
            ...item,
            userD: userD[i]
        }))

        data = data.map((item, index) => ({
            ...item,
            seatD: seatD[index],
            vendorD: vendorD[index],
        }))

        dispatch({
            type: actions.ROUTE_ALL_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: actions.ROUTE_ALL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const filterRoute = (serviceList, priceArrg=null, minPrice=null, maxPrice=null, terminalFilter=null) => async(dispatch) => {
    try {
        dispatch({type: actions.FILTER_ROUTE_REQUEST})
        console.log(priceArrg)
        if(priceArrg){
            if(priceArrg==="asc"){
                serviceList.sort((a,b) => (a.minPrice > b.minPrice) ? 1 : ((b.minPrice > a.minPrice) ? -1 : 0));
            }
            else if(priceArrg==="dsc"){
                serviceList.sort((a,b) => (a.minPrice < b.minPrice) ? 1 : ((b.minPrice < a.minPrice) ? -1 : 0));
            }
        }

        if(minPrice){
            serviceList = serviceList.filter((item) => {
                if(parseFloat(item.seatD.firstPrice) >= minPrice || parseFloat(item.seatD.businessPrice) >= minPrice || parseFloat(item.seatD.economyPrice) >= minPrice){
                    return item
                }
            })
        }

        if(maxPrice){
            serviceList = serviceList.filter((item) => {
                if(parseFloat(item.seatD.firstPrice) <= maxPrice || parseFloat(item.seatD.businessPrice) <= maxPrice || parseFloat(item.seatD.economyPrice) <= maxPrice){
                    return item
                }
            })
        }

        if(terminalFilter){
            let arr = terminalFilter.split("-");
            let deprt = arr[0];
            let arrvl = arr[1];

            serviceList = serviceList.filter((item) => {
                if(deprt.trim() === item.servicedepartureTerminal && arrvl.trim() === item.servicearrivalTerminal){
                    return item;
                }
            })
        }

        const data = serviceList

        dispatch({
            type: actions.FILTER_ROUTE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: actions.FILTER_ROUTE_FAIL
        })
    }
}

export const paymentSuccess = (cartID, total) =>  async (dispatch, getState) => {
    try {
        dispatch({
            type: actions.PROCESSING_PAYMENT_APPROVAL
        })

        console.log(cartID)
    
        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.put(
            `http://localhost:8000/api/payment/success/${userInfo.userID}/`,
            {
                'cartID': cartID,
                'paymentStatus': 'CP'
            },
            config
        )

        dispatch({type: actions.CART_VIEW_RESET})
        dispatch({type: actions.CART_ADD_RESET})

        dispatch({
            type: actions.PROCESSED_PAYMENT_APPROVAL,
        })

    } catch(error) {
        dispatch({
            type: actions.FAILURE_PAYMENT_APPROVAL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}

export const removeItem = (cartItemID) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actions.DELETING_CART_ITEM
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
            `http://localhost:8000/api/cart/item/delete/${cartItemID}/`,
            config
        )

        dispatch({
            type: actions.DELETED_CART_ITEM
        })

    } catch(error) {
        dispatch({
            type: actions.UNSUCCESSFUL_DELETE_CART_ITEM,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
    
}

export const getTickets = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: actions.TICKET_LIST_REQUEST
        })
    
        const {
            userLogin: {userInfo},
        } = getState()

        let tickets = []

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        let { data } = await axios.get(
            `http://localhost:8000/api/ticket/`,
            config
        )

        for (var i in data){
            if (data[i].ownBy == userInfo.userID) {
                tickets.push(data[i])
            }
        }

        let loc = await axios.get(
            `http://127.0.0.1:8000/api/location/`,
            config
        )

        let locations = loc.data
        let routes = []

        console.log(tickets)

        for (var i in tickets) {
            let serviceq = await axios.get(
                `http://127.0.0.1:8000/api/service/${tickets[i].service}/`,
                config
            )
            routes.push(serviceq.data)
        }
        
        let vendor = await axios.get(
            `http://127.0.0.1:8000/api/vendor/`,
            config
        )
        
        let vendorD = vendor.data

        let releventdata = {tickets, locations, routes, vendorD}
        
        data = releventdata

        dispatch({
            type: actions.TICKET_LIST_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: actions.TICKET_LIST_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const validateUser = (email) => async (dispatch) => {
    try {
        dispatch({
            type: actions.VERIFY_USER_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json',
            }
        }
        
        const {data} = await axios.get(`http://localhost:8000/api/user/validation/${email}/`, config)

        dispatch({
            type: actions.VERIFY_USER_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: actions.VERIFY_USER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
        
export const passwordChange = (password) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actions.USER_PASSWORD_CHANGE_PROCESSING
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
    
        const { data } = await axios.put(
            `http://localhost:8000/api/user/profile/update/`, 
            {
                'username': userInfo.username,
                'email': userInfo.email,
                'is_active': 'True',
                'password': password
            },
            config
        )

        dispatch({
            type: actions.USER_PASSWORD_CHANGE_SUCCESS
        })

    } catch(error) {
        dispatch({
          type: actions.USER_PASSWORD_CHANGE_FAILURE,
          payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const resetPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: actions.RESET_USER_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json',
            }
        }
        
        const {data} = await axios.get(
            `http://localhost:8000/api/user/resetpass/${email}/`,
            config
        )

        dispatch({
            type: actions.RESET_USER_SUCCESS,
        })

    } catch(error) {
        dispatch({
            type: actions.RESET_USER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const cartDispatch = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: actions.CART_DISPATCH_REQUEST
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
            `http://localhost:8000/api/cart/`,
            config
        )

        console.log(data);

        let cart = ""

        for(let i of data){
            if(i.user === userInfo.userID){
                cart = i.cartID
            }
        }

        let payment = await axios.get(
            `http://localhost:8000/api/payment/`,
            config
        )

        for (let i of payment.data) {
            if(i.cart == cart){
                cart = null
            }
        }

        //if cart exist, just create item. If it does not exist create a new cart and create item  && (cart != payment)
        if(!cart){
            let rst = await axios.post(
                `http://127.0.0.1:8000/api/cart/`,
                {
                    user: userInfo.userID
                },
                config
            )   
        } else {
            dispatch({
                type: actions.CART_DISPATCH_UNCHANGED
            })
        }

        dispatch({
            type: actions.CART_DISPATCH_SUCCESS
        })

    } catch(error) {
        dispatch({
            type: actions.CART_DISPATCH_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listService = () => async (dispatch) => {
    try {
        dispatch({
            type: actions.LIST_SERVICE_REQUEST
        })
    
        var { data } = await axios.get('http://127.0.0.1:8000/api/user/vendordetails')

        var serviceName = [];
        var vendorStatus = [];

        for(let i of data){
            let rst = await axios.get(`http://127.0.0.1:8000/api/user/vendor/${i.userID}/`);
            serviceName.push(rst.data.vendorName);
            vendorStatus.push(rst.data.vendorStatus);
        }

        data = data.map((item, index) => ({
            ...item,
            serviceName: serviceName[index],
            vendorStatus: vendorStatus[index],
        }))

        console.log(data);

        data = data.filter((item) => {
            return item.vendorStatus === true;
        })

        dispatch({
            type: actions.LIST_SERVICE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: actions.LIST_SERVICE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}