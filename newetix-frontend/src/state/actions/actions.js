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
            type: actions.ROUTE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const storeLookup = (locationFrom, locationTo, dateDeparture, dateReturn) => (dispatch) => {
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

export const retrieveLookup = () => (dispatch) => {
    dispatch({
        type: actions.RETRIEVING_LOOKUP_DATA
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
                "is_customer": 'True',
                "is_vendor": 'False',
                "is_staff": 'False',
                "is_superuser": 'False',
                "is_active": 'True'
            },
            config
        )

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