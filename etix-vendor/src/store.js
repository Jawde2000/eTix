import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './components/Login/LoginSlice';

const store = configureStore({
    reducer: {
        Login: loginReducer,
    }
})

export default store;



