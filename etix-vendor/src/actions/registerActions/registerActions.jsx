import {
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL, 
} from '../../constants/registerConstants/registerConstants'
import axios from 'axios'

export const register = (email, password, business, bankNumber, bandBrand, phone, company) => async (dispatch) => {
    try{
        dispatch({
            type:USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type' : 'application/json', 
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/users/register/',
            {
                "username": company,
                "email": email,
                "password": password,
                "is_active": 'True',
                "is_superuser": 'False',
                "is_vendor": 'True',
                "is_customer": 'False',
                "is_staff": 'False'
            },
            config
        )
        
        console.log(data)

        const configVendor = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: "Bearer " + data.token
            }
        }

        const Register = await axios.post(
            'http://localhost:8000/api/vendor/',
            {
                "created_by": data.userID,
                "vendorContact_Number": phone,
                "vendorStatus": 'False',
                "vendorName": company,
                "vendorBankName": bandBrand,
                "vendorBankAcc": bankNumber,
                "vendorRegistrationNo": business,
                configVendor
            }
            
        )
     
        console.log(Register)
        
        if(!data){
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: "REGISTER FAIL"
            })
        }
        else{
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: "RGISTER SUCCESS"
            })
            
            //set user info in local storage
            // localStorage.setItem('userInfo', JSON.stringify(data))
        }
            
            //set user info in local storage
            // localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}