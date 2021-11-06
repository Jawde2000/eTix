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

    } catch(error) {
        dispatch({
            type: actions.ROUTE_FAIL
        })
    }
}

export const vendorList = async(dispatch) => {
    try {
        dispatch({type: actions.VENDOR_LIST_REQUEST})

        const { data } = await axios.post('http://127.0.0.1:8000/api/vendor/list')

        dispatch({
            type: actions.VENDOR_LIST_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: actions.VENDOR_LIST_FAIL
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
                type: actions.USER_LOGIN_FAIL,
                payload: "Invalid User"
            })
        }
        else{
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

export const customerDetails = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: actions.CUSTOMER_DETAILS_REQUEST
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

        const {customerInfo} = await axios.get(
            `http://127.0.0.1:8000/api/user/customer/${userInfo.userID}`,
            config
        )

        dispatch({
            type: actions.CUSTOMER_DETAILS_SUCCESS,
            payload: customerInfo
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
            type: actions.CUSTOMER_DETAILS_REQUEST
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

        const {customerInfo} = await axios.put(
            `localhost:8000/api/user/customer/update/${userInfo.userID}`,
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
        
        dispatch({
            type: actions.CUSTOMER_DETAILS_SUCCESS,
            payload: customerInfo
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

export const helpdeskCreate = (rcv, title, message) => async(dispatch, getState) => {
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

        const {helpinfo} = await axios.put(
            `localhost:8000/api/help/request/${rcv}`,
            {
                'title': title,
                'message': message,
                'userID': userInfo.userID
            },
            config
        )
        
        dispatch({
            type: actions.HELP_LIST_CREATE,
            payload: helpinfo
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

        const {helpinfo} = await axios.get(
            `localhost:8000/api/help/request/${userInfo.userID}`,
            config
        )
        
        dispatch({
            type: actions.HELP_LIST_SUCCESS,
            payload: helpinfo
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