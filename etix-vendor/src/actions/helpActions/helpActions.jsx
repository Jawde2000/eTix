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

        console.log(userInfo.vendorInfo.vendorID)

        var { data } = await axios.get(
            'http://127.0.0.1:8000/api/user/vendorreceiver/' + userInfo.vendorInfo.vendorID + '/',
             config
        )

        var userID = data?.map(help => {
            return help.user
        })

        var username = []

        for (let i of userID) {
            let r = await axios.get(`http://127.0.0.1:8000/api/user/${i}/`, config2)
            username.push(r.data.username)
        }

        var j = 0

        for (let i of data) {
            i.username = username[j]
            j = j + 1
        }

        const Infotemp = userInfo

        const user = {
            ...Infotemp,
            sender: data
        }

        console.log(user)

        console.log(data)

        dispatch({
            type: HELP_LIST_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(user))
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

export const getHelpUser = (helps) => async (dispatch, getState) => {
    try{
        dispatch({
            type:HELP_USER_REQUEST
        })

        console.log(helps)

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

        console.log(userID[0])

        // var data = await axios.get(
        //    `http://127.0.0.1:8000/api/user/${userID[0]}/`, config
        // )

        // console.log(data)

        // var data = await userID?.map(idd => {     
        //     return {Info: axios.get(`http://127.0.0.1:8000/api/user/${idd}/`, config2)}
        // })

        var username = []

        for (let i of userID) {
            let r = await axios.get(`http://127.0.0.1:8000/api/user/${i}/`, config2)
            username.push(r.data.username)
        }

        console.log(username)

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