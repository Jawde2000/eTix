import {
    HELP_LIST_REQUEST, 
    HELP_LIST_SUCCESS,
    HELP_LIST_FAIL,
    HELP_LIST_RESET,

    HELP_DELETE_REQUEST, 
    HELP_DELETE_SUCCESS,
    HELP_DELETE_FAIL,
    HELP_DELETE_RESET,

    HELP_DETAIL_REQUEST, 
    HELP_DETAIL_SUCCESS,
    HELP_DETAIL_FAIL,
    HELP_DETAIL_RESET,

    HELP_USER_REQUEST,
    HELP_USER_SUCCESS,
    HELP_USER_FAIL,
    HELP_USER_RESET,

    HELP_SAVE_REQUEST, 
    HELP_SAVE_SUCCESS,
    HELP_SAVE_FAIL,
    HELP_SAVE_RESET,

    HELP_SEND_RESPONSE_REQUEST, 
    HELP_SEND_RESPONSE_SUCCESS,
    HELP_SEND_RESPONSE_FAIL,
    HELP_SEND_RESPONSE_RESET,

    HELP_SEND_HELP_REQUEST,
    HELP_SEND_HELP_SUCCESS,
    HELP_SEND_HELP_FAIL,
    HELP_SEND_HELP_RESET,
} from '../constants/helpConstants/helpConstants'

export const helpListReducer = (state = { helps: [] }, action) => {
    switch(action.type){
        case HELP_LIST_REQUEST:
            return {loading: true}
        
        case HELP_LIST_SUCCESS:
           return {loading: false, helps: action.payload}
        
        case HELP_LIST_FAIL:
           return {loading: false, error: action.payload}

        case HELP_LIST_RESET:
           return {users:[]}

        default:
            return state
    }
}

export const helpDeleteReducer = (state = { }, action) => {
    switch(action.type){
        case HELP_DELETE_REQUEST:
            return {loading: true}
        
        case HELP_DELETE_SUCCESS:
           return {loading: false, success: true}
        
        case HELP_DELETE_FAIL:
           return {loading: false, error: action.payload}

        case HELP_DELETE_RESET:
            return {}

        default:
            return state
    }
}

export const helpDetailReducer = (state = { }, action) => {
    switch(action.type){
        case HELP_DETAIL_REQUEST:
            return {loading: true}
        
        case HELP_DETAIL_SUCCESS:
           return {loading: false, helpD: action.payload}
        
        case HELP_DETAIL_FAIL:
           return {loading: false, error: action.payload}

        case HELP_DETAIL_RESET:
           return {}

        default:
            return state
    }
}

export const userHDetailReducer = (state = { }, action) => {
    switch(action.type){
        case HELP_USER_REQUEST:
            return {loading: true}
        
        case HELP_USER_SUCCESS:
           return {loading: false, userD: action.payload}
        
        case HELP_USER_FAIL:
           return {loading: false, error: action.payload}

        case HELP_USER_RESET:
           return {}

        default:
            return state
    }
}

export const helpSaveReducer = (state = { }, action) => {
    switch(action.type){
        case HELP_SAVE_REQUEST:
            return {loading: true}
        
        case HELP_SAVE_SUCCESS:
           return {loading: false, success: true}
        
        case HELP_SAVE_FAIL:
           return {loading: false, error: action.payload}

        case HELP_SAVE_RESET:
           return {}

        default:
            return state
    }
}

export const helpSendReducer = (state = { }, action) => {
    switch(action.type){
        case HELP_SEND_RESPONSE_REQUEST:
            return {loading: true}
        
        case HELP_SEND_RESPONSE_SUCCESS:
           return {loading: false, success: true}
        
        case HELP_SEND_RESPONSE_FAIL:
           return {loading: false, error: action.payload}

        case HELP_SEND_RESPONSE_RESET:
           return {}

        default:
            return state
    }
}

export const helpSendAddReducer = (state = { }, action) => {
    switch(action.type){
        case HELP_SEND_HELP_REQUEST:
            return {loading: true}
        
        case HELP_SEND_HELP_SUCCESS:
           return {loading: false, success: true}
        
        case HELP_SEND_HELP_FAIL:
           return {loading: false, error: action.payload}

        case HELP_SEND_HELP_RESET:
           return {}

        default:
            return state
    }
}