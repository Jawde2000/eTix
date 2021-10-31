import {

    HELP_LIST_REQUEST, 
    HELP_LIST_SUCCESS,
    HELP_LIST_FAIL,
    HELP_LIST_RESET,

    HELP_DELETE_REQUEST, 
    HELP_DELETE_SUCCESS,
    HELP_DELETE_FAIL,

    HELP_DETAIL_REQUEST, 
    HELP_DETAIL_SUCCESS,
    HELP_DETAIL_FAIL,
    HELP_DETAIL_RESET,

    HELP_SAVE_REQUEST, 
    HELP_SAVE_SUCCESS,
    HELP_SAVE_FAIL,
    HELP_SAVE_RESET,

    HELP_SEND_RESPONSE_REQUEST, 
    HELP_SEND_RESPONSE_SUCCESS,
    HELP_SEND_RESPONSE_FAIL,
    HELP_SEND_RESPONSE_RESET,

} from '../constants/helpConstants'


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