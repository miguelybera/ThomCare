import {
    REQUEST_DETAILS_REQUEST,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL, 
    CLEAR_ERRORS
} from '../constants/requestConstants'


//get single user details
export const getRequestDetailsReducer = (state = { request: {} }, action ) => {
    switch(action.type) {
        
        case REQUEST_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case REQUEST_DETAILS_SUCCESS:
            return {
                loading: false,
                request: action.payload
            }

        case REQUEST_DETAILS_FAIL:
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