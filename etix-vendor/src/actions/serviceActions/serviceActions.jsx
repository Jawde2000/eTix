import {
    USER_SERVICE_REQUEST,
    USER_SERVICE_SUCCESS,
    USER_SERVICE_FAIL,

    SERVICE_DELETE_REQUEST,
    SERVICE_DELETE_SUCCESS,
    SERVICE_DELETE_FAIL,
    SERVICE_DELETE_RESET,

    SERVICE_SAVE_REQUEST,
    SERVICE_SAVE_SUCCESS,
    SERVICE_SAVE_FAIL,
    SERVICE_SAVE_RESET,
} from '../../constants/serviceConstants/serviceConstants';
import axios from 'axios';

export const servicelist = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_SERVICE_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: "Bearer " + userInfo.token,
            }
        }

        const { data } = await axios.get(
            'http://127.0.0.1:8000/api/user/service/' + userInfo.vendorInfo.vendorID + '/',
             config
        )

        console.log(data)

        dispatch({
            type: USER_SERVICE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: USER_SERVICE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//delete help
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
            `http://127.0.0.1:8000/api/helpdesk/${id}/`,
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