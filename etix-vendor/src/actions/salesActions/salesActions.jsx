import axios from 'axios'
import {

    PAYMENT_LIST_REQUEST, 
    PAYMENT_LIST_SUCCESS,
    PAYMENT_LIST_FAIL,
    PAYMENT_LIST_RESET,

    SERVICE_LIST_DATAGENERATION_REQUEST, 
    SERVICE_LIST_DATAGENERATION_SUCCESS,
    SERVICE_LIST_DATAGENERATION_FAIL,
    SERVICE_LIST_DATAGENERATION_RESET,

} from '../../constants/salesConstants/salesConstants'


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

        data = data.filter((item) => {
            return item.serviceDetails.vendor === userInfo.vendorInfo.vendorID
        })

        console.log(data);
        
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


//GET service list (Data generation)
export const listServicesData = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: SERVICE_LIST_DATAGENERATION_REQUEST
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

        //get SERVICE list
        var { data } = await axios.get(
            'http://127.0.0.1:8000/api/service/',
            config
        )        
        
        //want to get the total sales.
        let payment = []

        var payments  = await axios.get(
            `http://127.0.0.1:8000/api/payment/`,
            config
        )

        //get only payment successed value
        payments = payments.data.filter((item) => {
            return item.paymentStatus === "CP"
        })

        let result = []

        for(let i of payments){
            let r = await axios.get(`http://127.0.0.1:8000/api/cart/${i.cart}/`, config);
            result.push(r)
        }

        for(let i of data){
            let total = 0.00;
            for(let x of result){
                if(x.data.service === i.serviceID){
                    total +=  parseFloat(x.data.cartTotal)
                }
            }
            payment.push(total)
        }

        data = data.map((item, index)=> ({
            ...item,
            route: item.servicedepartureTerminal + " - " + item.servicearrivalTerminal,
            VendorNett: payment[index] - (payment[index] * 6 /100) - (payment[index] * 1 / 100),
            eTixNett: payment[index] * 1 / 100,
            tax : payment[index] * 6/100,
        }))


        dispatch({
            type: SERVICE_LIST_DATAGENERATION_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: SERVICE_LIST_DATAGENERATION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}