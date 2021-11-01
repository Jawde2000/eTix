import axios from 'axios'
import {

    HELP_LIST_REQUEST, 
    HELP_LIST_SUCCESS,
    HELP_LIST_FAIL,

    HELP_DELETE_REQUEST, 
    HELP_DELETE_SUCCESS,
    HELP_DELETE_FAIL,

    HELP_DETAIL_REQUEST, 
    HELP_DETAIL_SUCCESS,
    HELP_DETAIL_FAIL,
    HELP_DETAIL_RESET,

} from '../../constants/helpConstants/helpConstants'

//GET HELP LISTS
export const listHelp = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: HELP_LIST_REQUEST
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

        const config2 = {
            headers: {
                'Content-type' : 'application/json',
            }
        }

        console.log(userInfo.vendorInfo.vendorID)

        const { data } = await axios.get(
            'http://127.0.0.1:8000/api/user/vendorreceiver/' + userInfo.vendorInfo.vendorID + '/',
             config2
        )

        console.log(data)

        dispatch({
            type: HELP_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: HELP_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//Help detail 
export const getHelp = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:HELP_DETAIL_REQUEST
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
            `http://127.0.0.1:8000/api/helpdesk/${id}/`,
            config
        )

        const config2 = {
            headers:{
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        if(data.helpdeskStatus === "CL"){
            data = {
                ...data,
                helpResponse: await axios.get(
                    `http://127.0.0.1:8000/api/help/response/${id}/`,
                    config2
                ),
            }
    
            if(data.helpResponse.data){
                data = {
                    ...data,
                    respondUser: await axios.get(
                        `http://127.0.0.1:8000/api/user/${data.helpResponse.data.user}/`,
                        config2
                    )
                }
            }
        }

        dispatch({
            type: HELP_DETAIL_SUCCESS,
            payload: data
        })


    }catch(error){
        dispatch({
            type: HELP_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//delete help
export const deleteHelp = (id) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type:HELP_DELETE_REQUEST
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
            type: HELP_DELETE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: HELP_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}