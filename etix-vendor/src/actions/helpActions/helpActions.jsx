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

    HELP_USER_REQUEST,
    HELP_USER_SUCCESS,
    HELP_USER_FAIL,
    HELP_USER_RESET,

    HELP_SAVE_REQUEST, 
    HELP_SAVE_SUCCESS,
    HELP_SAVE_FAIL,
    HELP_SAVE_RESET,

    HELP_SEND_RESPONSE_REQUEST, 
    HELP_SEND_RESPONSE_SUCCESS,
    HELP_SEND_RESPONSE_FAIL,
    HELP_SEND_RESPONSE_RESET,
    
    HELP_SEND_HELP_REQUEST,
    HELP_SEND_HELP_SUCCESS,
    HELP_SEND_HELP_FAIL,
    HELP_SEND_HELP_RESET,

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
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        var { data } = await axios.get(
            'http://127.0.0.1:8000/api/user/vendorreceiver/' + userInfo.vendorInfo.vendorID + '/',
             config
        )

        var data2 = await axios.get(
            'http://127.0.0.1:8000/api/user/vendorhelp/' + userInfo.userID + '/',
            config
        )

        var dataMerged = [...data, ...data2.data];

        var userID = dataMerged?.map(help => {
            return help.user
        })

        var username = []

        for (let i of userID) {
            let r = await axios.get(`http://127.0.0.1:8000/api/user/${i}/`, config2)
            username.push(r.data.username)
        }

        var j = 0

        for (let i of dataMerged) {
            i.username = username[j]
            j = j + 1
        }

        dispatch({
            type: HELP_LIST_SUCCESS,
            payload: dataMerged
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

        if(data.helpdeskStatus === "RP" || data.helpdeskStatus === "CL"){
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

export const getHelpUser = (helps) => async (dispatch, getState) => {
    try{
        dispatch({
            type:HELP_USER_REQUEST
        })

        const {
            userLogin: {userInfo},
        } = getState()

        // console.log(id)

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

        var userID = helps?.map(help => {
            return help.user
        })

        var username = []

        for (let i of userID) {
            let r = await axios.get(`http://127.0.0.1:8000/api/user/${i}/`, config2)
            username.push(r.data.username)
        }

        // const data = {
        //     ...data,
        //     Info: helps?.map(help => {
        //     return axios.get(
        //         `http://127.0.0.1:8000/api/user/${help.user}/`,
        //         config
        //     )
        // })}
        
        // console.log(data)

        dispatch({
            type: HELP_USER_SUCCESS,
            payload: username
        })


    }catch(error){
        dispatch({
            type: HELP_USER_FAIL,
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

//save help
export const saveHelp = (id, status) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type:HELP_SAVE_REQUEST
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
            `http://127.0.0.1:8000/api/helpdesk/${id}/`,
            {
                helpdeskStatus: status
            },
            config
        )
        
        dispatch({
            type: HELP_SAVE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: HELP_SAVE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//send response
export const sendResponse = (response, status, id) => async (dispatch, getState) => {
    try{
        
        dispatch({
            type:HELP_SEND_RESPONSE_REQUEST
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

        const { data1 } = await axios.put(
            `http://127.0.0.1:8000/api/helpdesk/${id}/`,
            {
                helpdeskStatus: status
            },
            config
        )

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/helpresponse/`,
            response,
            config
        )
        
        dispatch({
            type: HELP_SEND_RESPONSE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: HELP_SEND_RESPONSE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//SEND help
export const sendHelp = (title, message) => async (dispatch, getState) => {
    try{
        console.log(title);
        console.log(message);

        dispatch({
            type:HELP_SEND_HELP_REQUEST
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

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/helpdesk/',
            {
                "helpdeskTitle": title,
                "helpdeskMessage": message,
                "user": userInfo.userID,
                "to_vendor": 'False',
                "to_admin": 'True',
                "helpdeskStatus": 'OP',
               
            }, config
        )
        
        dispatch({
            type: HELP_SEND_HELP_SUCCESS,
        })

    }catch(error){
        dispatch({
            type: HELP_SEND_HELP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
