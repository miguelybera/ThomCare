import {
    NEW_FORM_REQUEST,
    NEW_FORM_SUCCESS,
    NEW_FORM_FAIL,
    NEW_FORM_RESET,
    UPDATE_FORM_REQUEST,
    UPDATE_FORM_SUCCESS,
    UPDATE_FORM_FAIL,
    UPDATE_FORM_RESET,
    DELETE_FORM_REQUEST,
    DELETE_FORM_SUCCESS,
    DELETE_FORM_FAIL,
    DELETE_FORM_RESET,
    ALL_FORMS_REQUEST,
    ALL_FORMS_SUCCESS,
    ALL_FORMS_FAIL,
    FORM_DETAILS_REQUEST,
    FORM_DETAILS_SUCCESS,
    FORM_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/formConstants'

//create form
export const createFormReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_FORM_REQUEST:
            return {
                loading: true
            }

        case NEW_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }

        case NEW_FORM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            }

        case NEW_FORM_RESET:
            return {
                ...state,
                success: false
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

//get forms
export const formDetailsReducer = (state = { form: {} }, action) => {
    switch (action.type) {
        case FORM_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FORM_DETAILS_SUCCESS:
            return {
                loading: false,
                form: action.payload.form,
                success: action.payload.success
            }

        case FORM_DETAILS_FAIL:
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


//get forms
export const formsReducer = (state = { forms: [] }, action) => {
    switch (action.type) {
        case ALL_FORMS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ALL_FORMS_SUCCESS:
            return {
                loading: false,
                forms: action.payload.forms,
                success: action.payload.success
            }

        case ALL_FORMS_FAIL:
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

//update and delete form
export const formReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_FORM_REQUEST:
        case UPDATE_FORM_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_FORM_FAIL:
        case UPDATE_FORM_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case DELETE_FORM_RESET:
            return {
                ...state,
                isDeleted: false,
                loading: false
            }

        case UPDATE_FORM_RESET:
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