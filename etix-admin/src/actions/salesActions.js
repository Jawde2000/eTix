import axios from 'axios'
import {

    PAYMENT_LIST_REQUEST, 
    PAYMENT_LIST_SUCCESS,
    PAYMENT_LIST_FAIL,
    PAYMENT_LIST_RESET,

} from '../constants/salesConstants'


//GET payment list
export const listPayment = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: PAYMENT_LIST_REQUEST
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

        //get payment list
        var { data } = await axios.get(
            'http://127.0.0.1:8000/api/payment/',
            config
        )
        
        //get only payment successed value
        data = data.filter((item) => {
            return item.paymentStatus === "CP"
        })

        let result = []

        for(let i of data){
            let r = await axios.get(`http://127.0.0.1:8000/api/cart/${i.cart}/`, config);
            result.push(r)
        }
        
        data = data.map((item, index) => (
        {
            ...item,
            cartDetails: result[index].data
        }))

        let result2 = []
        for(let i of data){
            let l = await axios.get(`http://127.0.0.1:8000/api/service/${i.cartDetails.service}/`, config);
            result2.push(l);
        }

        data = data.map((item, index) => ({
            ...item,
            serviceDetails: result2[index].data
        }))

        
        
        dispatch({
            type: PAYMENT_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PAYMENT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
