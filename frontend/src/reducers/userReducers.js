import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_RESET,
    CLEAR_ERRORS
} from '../constants/userConstants'

//login and get currently logged in
export const authReducer = ( state = { user: {} }, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true, 
                isAuthenticated: false
            }

        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
                success: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                loadError: action.payload //changed 
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        
        case CLEAR_ERRORS:
            return { 
                ...state,
                error: null
            }
        
        default:
            return state
    }
}

//get list of users
export const getUsersReducer = (state = { users: [] }, action) => {
    switch(action.type){
        case ALL_USERS_REQUEST:
            return {
                loading: true,
                users: []
            }

        case ALL_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload.users
            }

        case ALL_USERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

//get single user details
export const userDetailsReducer = (state = { singleUser: {} }, action ) => {
    switch(action.type) {
        
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_USER_SUCCESS:
            return {
                loading: false,
                singleUser: action.payload
            }

        case GET_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

//create user
export const registerReducer = ( state = { }, action ) => {
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                error: null,
                loading: true,
                isCreated: false
            }

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isCreated: true,
                message: action.payload
            }

        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isCreated: false,
                error: action.payload
            }

        case REGISTER_USER_RESET:
            return {
                ...state,
                isCreated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

//forgot password
export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {

        case FORGOT_PASSWORD_REQUEST:
            return {
                loading: true,
                ...state,
                error: null
            }

        case FORGOT_PASSWORD_SUCCESS:
            return {
                loading: false,
                ...state,
                message: action.payload
            }

        case FORGOT_PASSWORD_FAIL:
            return {
                loading: false,
                ...state,
                error: action.payload
            }

        case FORGOT_PASSWORD_RESET:
            return {
                ...state,
                loading: false,
                message: null
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }

}
