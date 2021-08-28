import {
    REQUEST_DETAILS_REQUEST,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL,
    REQUEST_DETAILS_RESET,
    SAVE_FORM_SUCCESS,
    CLEAR_ERRORS
} from '../constants/requestConstants'


//get single request details
export const getRequestDetailsReducer = (state = { request: {} }, action) => {
    switch (action.type) {
        case REQUEST_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case REQUEST_DETAILS_SUCCESS:
            return {
                loading: false,
                request: action.payload.request,
                success: action.payload.success
            }

        case REQUEST_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case REQUEST_DETAILS_RESET:
            return {
                ...state,
                success: null
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
                error: null
            }

        default:
            return state
    }
}