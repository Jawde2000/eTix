import {
    USER_SERVICE_REQUEST,
    USER_SERVICE_SUCCESS,
    USER_SERVICE_FAIL
} from '../../constants/serviceConstants/serviceConstants';
import axios from 'axios';

export const servicelist = (vendorID, token, Info) => async (dispatch) => {
    try{
        dispatch({
            type: USER_SERVICE_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: "Bearer " + token,
            }
        }

        console.log(vendorID)

        const { data } = await axios.get(
            'http://127.0.0.1:8000/api/user/service/' + vendorID + '/',
             config
        )

        const Infotemp = Info

        Info = {
            ...Infotemp,
            services: data
        }

        console.log(data)

        dispatch({
            type: USER_SERVICE_SUCCESS,
            payload: data
        })
        
        localStorage.setItem('userInfo', JSON.stringify(Info))
    }catch(error){
        dispatch({
            type: USER_SERVICE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}