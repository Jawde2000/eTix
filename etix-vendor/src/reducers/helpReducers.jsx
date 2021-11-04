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

    HELP_USER_REQUEST,
    HELP_USER_SUCCESS,
    HELP_USER_FAIL,
    HELP_USER_RESET
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