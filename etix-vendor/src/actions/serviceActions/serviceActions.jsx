import {
    USER_SERVICE_REQUEST,
    USER_SERVICE_SUCCESS,
    USER_SERVICE_FAIL
} from '../../constants/serviceConstants/serviceConstants';
import axios from 'axios';

export const serviceList = (vendorID) => (dispatch) => {
    dispatch({USER_SERVICE_REQUEST})
}