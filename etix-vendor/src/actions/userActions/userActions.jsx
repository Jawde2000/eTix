import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGOUT,
} from '../../constants/userConstants/userConstants'
import axios from 'axios'

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
        var data2 = data

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
        
        if(!data.is_vendor ){
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
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}