import {
    REQUEST_DETAILS_REQUEST,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL,
    REQUEST_DETAILS_RESET,
    SAVE_FORM_SUCCESS,
    SUBMIT_REQUEST_REQUEST,
    SUBMIT_REQUEST_SUCCESS,
    SUBMIT_REQUEST_FAIL,
    SUBMIT_REQUEST_RESET,
    GET_REQUESTS_REQUEST,
    GET_REQUESTS_SUCCESS,
    GET_REQUESTS_FAIL,
    UPDATE_REQUEST_REQUEST,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_FAIL,
    UPDATE_REQUEST_RESET,
    DELETE_REQUEST_REQUEST,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_FAIL,
    DELETE_REQUEST_RESET,
    CLEAR_ERRORS
} from '../constants/requestConstants'


//get single request details
export const getRequestDetailsReducer = (state = { request: {} }, action) => {
    switch (action.type) {
        case REQUEST_DETAILS_REQUEST:
        case SUBMIT_REQUEST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case REQUEST_DETAILS_SUCCESS:
        case SUBMIT_REQUEST_SUCCESS:
            return {
                loading: false,
                request: action.payload.request,
                success: action.payload.success
            }

        case REQUEST_DETAILS_FAIL:
        case SUBMIT_REQUEST_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case REQUEST_DETAILS_RESET:
        case SUBMIT_REQUEST_RESET:
            return {
                ...state,
                success: null
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }

        default:
            return state
    }
}

//save form details
export const saveFormDetailsReducer = (state = { formData: {} }, action) => {
    switch (action.type) {
        case SAVE_FORM_SUCCESS:
            return {
                formData: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }

        default:
            return state
    }
}

//get ALL requests
export const getRequestsReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case GET_REQUESTS_REQUEST:
            return {
                ...state,
                loading: true,
                requests: []
            }

        case GET_REQUESTS_SUCCESS:
            return {
                loading: false,
                requests: action.payload.requests,
                success: action.payload.success
            }

        case GET_REQUESTS_FAIL:
            return {
                ...state,
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

//update and delete announcement
export const requestReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REQUEST_REQUEST:
        case UPDATE_REQUEST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_REQUEST_FAIL:
        case UPDATE_REQUEST_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case DELETE_REQUEST_RESET:
            return {
                ...state,
                isDeleted: false,
                loading: false
            }

        case UPDATE_REQUEST_RESET:
            return {
                ...state,
                isUpdated: false,
                loading: false
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