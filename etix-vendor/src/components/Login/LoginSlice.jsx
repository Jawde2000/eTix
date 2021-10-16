import {createSlide} from '@reduxjs/toolkit';
import Login from './Login';


const initialState = {
    Loading: false,
    Auth: false,
    error: '',
}
const LoginSlide = createSlide ({
    name: 'login',
    initialState,
    reducers: {
        loginPending: (state) => {
            state.Loading = true
        },
        loginSucess: (state) => {
            state.Loading = false,
            state.Auth = true,
            state.error = ''
        },
        loginFail: (state, {payLoad}) => {
            state.Loading = false,
            state.Auth = true,
            state.error = payLoad
        },
    }
})

const {reducer, actions} = LoginSlide

export const {loginPending, loginSucess, loginFail} = actions

export default reducer