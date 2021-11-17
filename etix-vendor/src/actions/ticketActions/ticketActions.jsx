import {
    TICKET_REQUEST,
    TICKET_SUCCESS,
    TICKET_FAIL,
    TICKET_RESET,

} from '../../constants/ticketConstants/ticketConstants';
import axios from 'axios';

export const ticketlist = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: TICKET_REQUEST
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
            'http://127.0.0.1:8000/api/ticket/', 
            config
        )

        var data2 = await axios.get(
            'http://127.0.0.1:8000/api/user/service/' + userInfo.vendorInfo.vendorID + '/',
            config
        )

        data2 = data2.data;

        // console.log(data2);
        var i = 0;
        // var route = [];
        
        // const locationFD = await axios.get(`http://127.0.0.1:8000/api/location/${data2.locationFrom}/`, config);
        // const locationED = await axios.get(`http://127.0.0.1:8000/api/location/${data2.locationTo}/`, config);

        // console.log(locationED);
        var dtemp = []

        data = data.filter((item) => {
            if (item.service === data2[i].serviceID) {
                dtemp.push(data);
            }
            i++;
        })

        console.log(dtemp);
        console.log(data);
        data = dtemp[0];

        dispatch({
            type: TICKET_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: TICKET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
