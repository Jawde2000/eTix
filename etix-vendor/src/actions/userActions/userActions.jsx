import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGOUT,

    USER_DETAIL_REQUEST, 
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_RESET,

    USER_VENDOR_UPDATE_REQUEST,
    USER_VENDOR_UPDATE_SUCCESS,
    USER_VENDOR_UPDATE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
} from '../../constants/userConstants/userConstants';
import {USER_SERVICE_RESET} from '../../constants/serviceConstants/serviceConstants';
import {HELP_LIST_RESET} from '../../constants/helpConstants/helpConstants';
import axios from 'axios'
import * as actions from '../../constants/userConstants/userConstants';

export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json',
            }
        }
        
        console.log("pass data")
        console.log(email)
        console.log(password)

        var { data } = await axios.post(
            'http://127.0.0.1:8000/api/users/login/',
            {
                "email": email,
                "password": password,
            },
            config
        )

        // console.log(data)

        const configVendor = {
            headers: {
                'Content-type' : 'application/json',
            }
        }

        // console.log(data.userID)

        data = {
             ...data,
             vendorInfo: await axios.get(
            'http://127.0.0.1:8000/api/user/vendor/' + data.userID + '/',
            configVendor
            )
        }

        data.vendorInfo = data.vendorInfo.data

        // console.log(vendorInfo)
        console.log(data)
        
        if(!data.is_vendor || !data.vendorInfo.vendorStatus){
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: "Invalid User"
            })
        }
        else{
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            
            //set user info in local storage
            localStorage.setItem('userInfo', JSON.stringify(data))
        }
    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_LOGOUT});
    dispatch({type: USER_DETAIL_RESET});
    dispatch({type: USER_SERVICE_RESET});
    dispatch({type: HELP_LIST_RESET});
}

//GET ONLY ONE USER 
export const getUser = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:USER_DETAIL_REQUEST
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
            `http://127.0.0.1:8000/api/user/${id}/`,
            config
        )

        const config2 = {
            headers:{
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        if(data.is_vendor){
            data = {
                ...data,
                vendorInfo: await axios.get(
                    `http://127.0.0.1:8000/api/user/vendor/${id}/`,
                    config2
                )
            }
        }
        else if(data.is_customer){
            data = {
                ...data,
                customerInfo: await axios.get(
                    `http://127.0.0.1:8000/api/user/customer/${id}/`,
                    config2
                )
            }
        }

        console.log(data)

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })


    }catch(error){
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//VENDOR update
export const updateVendor = (user, vendor, id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:USER_VENDOR_UPDATE_REQUEST
        })

        var {
            userLogin: {userInfo},
        } = getState()

        console.log(userInfo.token)

        console.log(userInfo)

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const config2 = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const config3 = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.put(
            `http://127.0.0.1:8000/api/user/update/${id}/`,
            user,
            config
        )

        var { data2 } = await axios.put(
            `http://127.0.0.1:8000/api/user/vendor/update/${id}/`,
            vendor,
            config
        )

        var vendorD = await axios.get(
            `http://127.0.0.1:8000/api/user/vendor/${id}/`,
            config2
        )

        vendorD = vendorD.data;

        var data3 = {
            // ...userIn,
            vendorInfo: vendorD
        }
    
        dispatch({
            type: USER_VENDOR_UPDATE_SUCCESS,
        })


        data = {
            ...userInfo,
            username: data.username,
            email: data.email,
        }

        console.log(data);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_VENDOR_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateUser = (user, id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:USER_UPDATE_REQUEST
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
            `http://127.0.0.1:8000/api/user/update/${id}/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })


    }catch(error){
        dispatch({
            type: USER_UPDATE_FAIL,
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
            payload: data
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